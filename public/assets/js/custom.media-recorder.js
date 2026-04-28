//
let stream
let mediaRecorder
let chunck = []
let recordedBlob = {}
let mimeType = ''
//
const pickSupportedMimeType = function() {
    //
    const candidates = [
        "audio/webm;codecs=opus", //Chrome/edge
        "audio/ogg;codecs=opus", //Firefox
        "audio/mp4" //Safari
    ]
    //
    for (const type of candidates) {
        if (window.MediaRecorder && MediaRecorder.isTypeSupported(type)){
            return type
        }
    }
    // return empty string to make browser decided default mimetype
    return ''
}
//
const getFilenameByMimetype = function (type) {
    if (type.includes("ogg")) return 'recording.ogg'
    if (type.includes("mp4")) return 'recording.mp4'
    //
    return "recording.webm"
}
//
const startRecording = async function () {
    // check recording process is supported
    if (! navigator.mediaDevices?.getUserMedia || ! window.MediaRecorder) {
        alert("Recording is not supported. Use The file upload field.")
        return
    }
    // access to microphone device through browser
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        })
    } catch (err) {
        alert("Microphone permission denied or not available")
        console.error(`Error Message: ${err}`)
        return
    }
    // get mimetype
    mimeType = pickSupportedMimeType()
    // audio recording using MediaRecorder API
    try {
        mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
    } catch (err) {
        alert('MediaRecorder failed to initialize in this browser.')
        console.error(`Error Message: ${err}`)
        // close microphone access
        stream.getTracks().forEach( t => t.stop() )
        return
    }
    //
    chunck = []
    recordedBlob = {}
    // mediaRecorder state
    // on data available
    mediaRecorder.ondataavailable = function (e) {
        if (e.data && e.data.size > 0) chunck.push(e.data)
    }
    // on start
    mediaRecorder.onstart = function () {
        //
        let getPlaceholderValue = $("[name=query-bot]").attr('placeholder')
        //
        $("#playback-container").attr("style", "display:none !important")
        $("#startRecording").attr("style", "display:none !important")
        $("#stopRecording").attr("style", "display:flex !important")
        $("#animateRecording").attr("style", "display:flex !important")
        //
        $("[name=query-bot]").attr("placeholder", getPlaceholderValue.includes("Recording") ? "Ask me anything..." : "Recording..." )
    }
    // on stop
    mediaRecorder.onstop = async function () {
        //
        recordedBlob = new Blob(chunck, { type: mimeType || 'audio/webm' } )
        //
        let getPlaceholderValue = $("[name=query-bot]").attr('placeholder')
        let url = URL.createObjectURL(recordedBlob)
        let fileName = getFilenameByMimetype(recordedBlob.type)
        let file = new File([recordedBlob], fileName, { type: recordedBlob.type })
        let genAiUrl = 'https://10.2.230.130:31101/v1/audio-to-text'
        let formData = new FormData()
        //
        formData.append('file', file)
        //
        let res = await fetch(genAiUrl, {
            headers: {
                Authorization: `Bearer app-wm49dsmVfr0yb4kjLlhTwWWS`
            },
            method: 'POST',
            body: formData
        })
        //
        $("#playback").attr("src", url)
        $("#playback").on("loadedmetadata", function () {
            console.log("playback duration", $("#playback").get(0).duration.toFixed())
        })
        //
        $("#playback-container").attr("style", "display:flex !important;flex-direction:column")
        $("#startRecording").attr("style", "display:flex !important")
        $("#stopRecording").attr("style", "display:none !important")
        $("#animateRecording").attr("style", "display:none !important")
        //
        $("[name=query-bot]").attr("placeholder", getPlaceholderValue.includes("Recording") ? "Ask me anything..." : "Recording..." )
        // close microphone access
        stream.getTracks().forEach( t => t.stop() )
    }
    // invoke mediaRecorder start method
    mediaRecorder.start();
}
//
const stopRecording = function () {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        // invoke mediaRecorder stop method
        mediaRecorder.stop()
    }
}
// mediaRecorder Action
$("#startRecording").on("click", () => startRecording() )
$("#stopRecording").on("click", () => stopRecording() )
// stop mediaRecorder
// mediaRecorder.stop();
// console.log('pickSupportedMimeType', pickSupportedMimeType())
// console.log('getPlaceholder', $("[name=query-bot]").attr("placeholder"))
// $("[icon-toggle-action]").on('click', function (e) {
//     let getPlaceholderValue = $("[name=query-bot]").attr('placeholder')
//      console.log('toggle', e)
//     $("#startRecording").toggle(0)
//     $("#stopRecording").toggle(0)
//      set placeholder
//     $("[name=query-bot]").attr("placeholder", getPlaceholderValue.includes("Recording") ? "Ask me anything..." : "Recording..." )
// })
