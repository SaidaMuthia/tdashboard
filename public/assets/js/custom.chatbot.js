// console.log('chatbot initialized'
const searchParams = new URLSearchParams(window.location.search)
const chatMessage = function (query, classAlign, avatarEnabled = false) {
    const dateTime = new Date();
    const format12Hour = dateTime.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    const avatarBot = `<div class="user-avatar flex-shrink-0 me-4" bis_skin_checked="1">
                            <div class="avatar avatar-sm" bis_skin_checked="1">
                            <img src="https://ictpamasuka.telkomsel.co.id/new-ictpamasuka/assets/img/avatars/avatar-pace-1.jpg" alt="Avatar" class="rounded-circle">
                            </div>
                        </div>`
    // return template
    return `
        <li class="chat-message ${classAlign.chatMessageAlign}">
            <div class="d-flex">
                ${ avatarEnabled ? avatarBot : ''}
                <div class="chat-message-wrapper flex-grow-1">
                    <div class="chat-message-text">
                        <p class="mb-0">${query}</p>
                    </div>
                    <div class="${classAlign.timeAlign} text-body-secondary mt-1">
                        <i class="icon-base bx bx-check-double icon-16px text-success me-1 ${classAlign.deliverIcon}"></i>
                        <small>${format12Hour}</small>
                    </div>
                </div>
            </div>
        </li>`
}
// prevent form submitted
$("form").submit(function (event) {
    event.preventDefault()
})
// toggle chatbot message box
$("button#chatbot-start-00").click(function () {
    // console.log(event)
    // console.log($(this))
    $(this).children('i').first().toggle(0)
    $(this).children('i').last().toggle(0)
    $(this).parent().prev().toggle('fast')
})
//
$("button[type=button]").click(function () {
    const query = $("input[name=query-bot]").val()
    const ulChatMessage = $("ul.chat-history")
    const client = axios.create({
        baseURL: 'https://genaistudio.telkomsel.co.id/studio/v1'
    })
    const userGenAi = `transformer-${searchParams.get("uname")}`
    // clear input element value
    $("input[name=query-bot]").val('')
    //
    if (query.length > 0) {
        // create chat message right
        ulChatMessage.append(chatMessage(query, {
            "chatMessageAlign" : 'chat-message-right',
            "timeAlign" : 'text-end',
            "deliverIcon" : ''
        }))
        // fetch api ways
        const genAiUrl = 'https://genaistudio.telkomsel.co.id/studio/v1/chat-messages'
        // const genAiUrl = 'https://10.2.230.130:31101/v1/chat-messages'
        const getAiFetchApi = async function () {
            const responseGenAi = await fetch(genAiUrl, {
                method: 'POST',
                ...config,
                body: JSON.stringify({
                    "inputs": {},
                    "query": query,
                    "response_mode": "streaming",
                    "conversation_id": "",
                    "user": userGenAi,
                })
            })
            //
            if (! responseGenAi.body) {
                throw new Error('No Response Body')
            }
            //
            const reader = responseGenAi.body.getReader()
            let decoder = new TextDecoder()
            let rawHtml = ''
            let sanitizeRawHtml = ''
            let responseAnswer = ''
            // create a placeholder for streaming content
            $streamingMessage = $(chatMessage(`<span class="spinner-grow me-3" role="status" aria-hidden="true" style="width:1rem;height:1rem;"></span>Thinking...`, {
                "chatMessageAlign" : '',
                "timeAlign" : 'text-start',
                "deliverIcon" : 'd-none'
            }, true))
            // scroll to bottom
            $("#chat-history-body-1").animate({
                scrollTop: ulChatMessage.height()
            }, 600)
            // remove the loading spinner before streaming starts
            // ulChatMessage.children('li').last().remove()
            // append to lists chat message
            ulChatMessage.append($streamingMessage)
            // loop to read streaming
            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                // append chunk to rawHtml
                rawHtml += decoder.decode(value, {
                    stream: true
                })
                // split by event stream default separator
                const events = rawHtml.split("\n\n")
                let answer = ""
                //
                for (let event of events) {
                    // console.log("event all", event)
                    if (event.startsWith('data: {"event":"message"')) {
                        //
                        // console.log('get here')
                        let eventObject = JSON.parse(event.replace('data: ', ''))
                        // console.log("event object answer", eventObject.answer)
                        answer += eventObject.answer
                    }
                }
                //
                if (answer) {
                    // Optionally, parse and sanitize as you go
                    let partialHtml = marked.parse(answer);
                    partialHtml = partialHtml.replace('<table>', '<table class="table table-bordered table-sm">');
                    sanitizeRawHtml = DOMPurify.sanitize(partialHtml);
                    sanitizeRawHtml = sanitizeRawHtml.replace('<a', '<a target="__blank"');
                    // answer with sanitized html
                    responseAnswer = sanitizeRawHtml.replace('h1', 'p');
                    // update streaming message content
                    $streamingMessage.find('.chat-message-text p').html(responseAnswer)
                    // set element's scroll position
                    $("#chat-history-body-1").animate({
                        scrollTop: ulChatMessage.height()
                    }, 200)
                }
            }
            // update time
            $streamingMessage.find("small").html(
                (new Date()).toLocaleString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
            )
            // add double tick icon
            $streamingMessage.find("small").prepend(`<i class="icon-base bx bx-check-double icon-16px text-success me-1 "></i>`)
        }
        // axios ways
        const getAiFetch = async function() {
            const responseGenAi = await client.post('chat-messages', {
                "inputs": {},
                "query": query,
                "response_mode": "blocking",
                "conversation_id": "",
                "user": userGenAi,
                // "files": [
                //   {
                //     "type": "image",
                //     "transfer_method": "remote_url",
                //     "url": "https://cloud.dify.ai/logo/logo-site.png"
                //   }
                // ]
            }, { ...config })
            // create options object
            const options = {
                highlight: function(code, lang) {
                    if (lang && window.hljs) {
                        return hljs.highlight(lang, code).value
                    }
                    return code
                },
                breaks: true,
                gfm: true
            }
            // set marked options
            marked.setOptions(options)
            // convert markdown to raw html with marked lib
            rawHtml = marked.parse(responseGenAi.data.answer)
            // additional table class value in rawHtml
            rawHtml = rawHtml.replace('<table>', '<table class="table table-bordered table-sm">')
            // rawHtml = rawHtml.replace('h1', 'div')
            // sanitize string raw html
            sanitizeRawHtml = DOMPurify.sanitize(rawHtml)
            // additional anchor target to new tab
            sanitizeRawHtml = sanitizeRawHtml.replace('<a', '<a target="__blank"')
            responseAnswer = sanitizeRawHtml.replace('h1', 'p')
            // console.log('responseGenAI', responseAnswer)
            // select last list item and then remove
            ulChatMessage.children('li').last().remove()
            // append to lists
            ulChatMessage.append(chatMessage(responseAnswer, {
                "chatMessageAlign" : '',
                "timeAlign" : 'text-start',
                "deliverIcon" : 'd-none'
            }, true))
            // set element's scroll position
            $("#chat-history-body-1").animate({
                scrollTop: ulChatMessage.height()
            }, 600)
        }
        if (searchParams.get("uname")) {
            // invoke
            // getAiFetch();
            getAiFetchApi()

            return 1
            // console.log('uname is no')
        }
        // show alert when user is null
        alert("Can't process chatbot because user not authenticated. Try using chatbot throught trans4mers, pinisy and cycloop")
    }
})
//
$("input[name=query-bot]").on("keyup", function (event) {
    // check if keyup is enter
    if (event.keyCode === 13)
    {
        // invoke click event on element
        $("button[type=button]").triggerHandler('click');
    }
})
