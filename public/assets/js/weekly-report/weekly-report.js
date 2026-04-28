//
const tBodyContentGenerator = function (data, elementId) {
    //
    const tbodyElement = document.getElementById(elementId)
    //
    tbodyElement.replaceChildren("")
    //
    data.forEach(function (element, idx) {
        const tRow = document.createElement("tr")
        const regexPattern = /wow|mom|yoy|ytd/
        //
        Object.keys(element).forEach(function (columnName) {
            if (columnName !== 'date') {
                const tCellRow = document.createElement("td")
                //
                tCellRow.textContent = element[columnName]
                //
                if(regexPattern.test(columnName)) {
                    tCellRow.style.color = element[columnName] < 0 ? 'red' : 'green'
                }
                //
                tRow.appendChild(tCellRow)
            }
        })
        //
        tbodyElement.appendChild(tRow)
    })
}
//
const initialLoad = async function () {
    //
    const { data: { data: responsePTRNational }} = await client.get("/weekly-report/productivity-nar", { ...config, params: { "level": "national" } })
    const { data: { data: responsePTRBranch }} = await client.get("/weekly-report/productivity-nar", { ...config, params: { "level": "branch" } })
    const { data: { data: responsePTRCity }} = await client.get("/weekly-report/productivity-nar", { ...config, params: { "level": "city" } })
    const { data: { data: responseRevenueRegion }} = await client.get("/weekly-report/revenue-nar", { ...config, params: { "level": "region" } })
    const { data: { data: responseRevenueBranch }} = await client.get("/weekly-report/revenue-nar", { ...config, params: { "level": "branch" } })
    const { data: { data: responseRevenueCity }} = await client.get("/weekly-report/revenue-nar", { ...config, params: { "level": "city" } })
    //
    const date = new Date(responsePTRNational[0]["date"])
    const getFullMonth = date.toLocaleString('en-US', { month: 'long' })
    const getMonth = (date.getMonth()+1).toString().padStart(2, "0")
    const getDay = date.getDate()
    const getCurrentYear = date.getFullYear()
    const getLastYear = date.getFullYear() - 1
    //
    $("input[type=date]").attr({
        max: `${getCurrentYear}-${getMonth}-${getDay}`,
        value: `${getCurrentYear}-${getMonth}-${getDay}`
    })
    //
    $(`
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(3),
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(10),
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(17),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(4),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(11),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(18),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(3),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(10),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(17)
    `).text(`mtd ${getMonth}-${getLastYear}`)
    //
    $(`
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(4),
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(11),
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(18),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(5),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(12),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(19),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(4),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(11),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(18)
    `).text(`mtd ${getMonth}-${getCurrentYear}`)
    //
    $(`
        table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(2),
        table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(7),
        table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(12),
        table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(17),
        table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(22),
        table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(4),
        table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(9),
        table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(14),
        table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(19),
        table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(24)
    `).text(`mtd ${getDay}-${getFullMonth}`)
    //
    $(`
        table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(1) > th:nth-child(1),
        table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(1) > th:nth-child(1),
        table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(1) > th:nth-child(1),
        table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(1) > th:nth-child(1),
        table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(1) > th:nth-child(1)
    `).text(`${getCurrentYear}-${getMonth}-${getDay}`)
    //
    tBodyContentGenerator(responsePTRNational, "ptr-national-rows-1")
    tBodyContentGenerator(responsePTRBranch, "ptr-branch-rows-1")
    tBodyContentGenerator(responsePTRCity, "ptr-city-rows-1")
    tBodyContentGenerator(responseRevenueRegion, "revenue-region-rows-1")
    tBodyContentGenerator(responseRevenueBranch, "revenue-branch-rows-1")
    tBodyContentGenerator(responseRevenueCity, "revenue-city-rows-1")
}
// invoke
initialLoad()
//
const ptrFetch = async function (eleId, date = null) {
    //
    const dateObj = new Date(date)
    const getFullMonth = dateObj.toLocaleString('en-US', { month: 'long' })
    const getMonth = (dateObj.getMonth()+1).toString().padStart(2, "0")
    const getDay = dateObj.getDate().toString().padStart("2", "0")
    const getCurrentYear = dateObj.getFullYear()
    const getLastYear = dateObj.getFullYear() - 1
    // var response = "";
    if (eleId == "ptr-national-rows-1") {
        const { data: { data: response } } = await client.get("weekly-report/productivity-nar", { ...config, params: { date, "level": "national" } })
        //
        tBodyContentGenerator(response, "ptr-national-rows-1")
        //
        $(`
            table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(3),
            table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(10),
            table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(17)
        `).text(`mtd ${getMonth}-${getLastYear}`)
        //
        $(`
            table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(4),
            table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(11),
            table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(2) > th:nth-child(18)
        `).text(`mtd ${getMonth}-${getCurrentYear}`)
        //
        $(`table[aria-labelledby=ptr-national-row-1] > thead > tr:nth-child(1) > th:nth-child(1)`).text(`${getCurrentYear}-${getMonth}-${getDay}`)
    } else if (eleId == "ptr-branch-rows-1") {
        const { data: { data: response } } = await client.get("weekly-report/productivity-nar", { ...config, params: { date, "level": "branch" } })
        //
        tBodyContentGenerator(response, "ptr-branch-rows-1")
        //
        $(`
            table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(4),
            table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(11),
            table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(18)
        `).text(`mtd ${getMonth}-${getLastYear}`)
        //
        $(`
            table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(5),
            table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(12),
            table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(2) > th:nth-child(19)
        `).text(`mtd ${getMonth}-${getCurrentYear}`)
        //
        $(` table[aria-labelledby=ptr-branch-rows-1] > thead > tr:nth-child(1) > th:nth-child(1)`).text(`${getCurrentYear}-${getMonth}-${getDay}`)
    } else if (eleId == "ptr-city-rows-1") {
        const { data: { data: response }} = await client.get("/weekly-report/productivity-nar", { ...config, params: { date, "level": "city" } })
        //
        tBodyContentGenerator(response, "ptr-city-rows-1")
        //
        $(`
            table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(3),
            table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(10),
            table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(17)
        `).text(`mtd ${getMonth}-${getLastYear}`)
        //
        $(`
            table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(4),
            table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(11),
            table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(18)
        `).text(`mtd ${getMonth}-${getCurrentYear}`)
        //
        $(`table[aria-labelledby=ptr-city-rows-1] > thead > tr:nth-child(1) > th:nth-child(1)`).text(`${getCurrentYear}-${getMonth}-${getDay}`)
    } else if (eleId == "revenue-region-rows-1") {
        const { data: { data: response }} = await client.get("/weekly-report/revenue-nar", { ...config, params: { date, "level": "region" } })
        const { data: { data: responseRevenueBranch }} = await client.get("/weekly-report/revenue-nar", { ...config, params: { date, "level": "branch" } })
        //
        tBodyContentGenerator(response, "revenue-region-rows-1")
        tBodyContentGenerator(responseRevenueBranch, "revenue-branch-rows-1")
        //
        $(`
            table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(2),
            table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(7),
            table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(12),
            table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(17),
            table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(2) > th:nth-child(22)
        `).text(`mtd ${getDay}-${getFullMonth}`)
        //
        $(`table[aria-labelledby=revenue-region-rows-1] > thead > tr:nth-child(1) > th:nth-child(1)`).text(`${getCurrentYear}-${getMonth}-${getDay}`)
    } else {
        const { data: { data: response }} = await client.get("/weekly-report/revenue-nar", { ...config, params: { date, "level": "city" } })
        //
        tBodyContentGenerator(response, "revenue-city-rows-1")
        //
        $(`
            table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(4),
            table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(9),
            table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(14),
            table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(19),
            table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(2) > th:nth-child(24)
        `).text(`mtd ${getDay}-${getFullMonth}`)
        //
        $(`table[aria-labelledby=revenue-city-rows-1] > thead > tr:nth-child(1) > th:nth-child(1)`).text(`${getCurrentYear}-${getMonth}-${getDay}`)
    }
}
// invoke
// ptrFetch()
//
$("input[type=date]").on("change", function () {
    //
    const eleId = $(this).parents("h5.card-header").next().find("table").children("tbody").attr("id")
    console.log('element id', eleId)
    const currDate = $(this).val()
    //
    ptrFetch(eleId, currDate)
})
/**
 * Modern HTML Copy Solution with Inline Styles
 *
 * This approach extracts computed styles and applies them as inline styles,
 * ensuring the copied content retains its appearance when pasted into:
 * - Code editors (VS Code, Sublime, etc.)
 * - Excel/Google Sheets
 * - Word processors
 * - Email clients
 */

// Helper function to extract relevant computed styles from an element
const getRelevantStyles = (element, stylesToCapture = []) => {
    const computedStyles = window.getComputedStyle(element)
    const relevantStyles = {}

    // Default styles to capture for table elements
    const defaultStyles = [
        'font-family', 'font-size', 'font-weight', 'font-style',
        'color', 'background-color', 'background',
        'text-align', 'vertical-align', 'text-decoration',
        'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
        'border-collapse', 'border-spacing',
        'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'margin', 'width', 'height', 'min-width', 'max-width',
        'white-space', 'word-wrap', 'overflow'
    ]

    const styles = stylesToCapture.length > 0 ? stylesToCapture : defaultStyles

    styles.forEach(prop => {
        const value = computedStyles.getPropertyValue(prop)
        if (value && value !== '' && value !== 'none' && value !== 'initial' && value !== 'inherit') {
            relevantStyles[prop] = value
        }
    })

    return relevantStyles
}

// Convert style object to inline style string
const styleObjectToString = (styleObj) => {
    return Object.entries(styleObj)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join('; ')
}

// Deep clone element with computed styles applied as inline styles
const cloneWithInlineStyles = (element) => {
    const clone = element.cloneNode(false) // Shallow clone first

    // Apply computed styles as inline styles
    const styles = getRelevantStyles(element)
    const existingStyle = clone.getAttribute('style') || ''
    const newStyle = styleObjectToString(styles)
    clone.setAttribute('style', existingStyle ? `${existingStyle}; ${newStyle}` : newStyle)

    // Recursively process child elements
    Array.from(element.childNodes).forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            clone.appendChild(cloneWithInlineStyles(child))
        } else if (child.nodeType === Node.TEXT_NODE) {
            clone.appendChild(child.cloneNode(true))
        }
    })

    return clone
}

// Generate complete HTML document wrapper for better compatibility
const wrapInHTMLDocument = (tableElement) => {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
table { border-collapse: collapse; font-family: Arial, sans-serif; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f4f4f4; font-weight: bold; }
</style>
</head>
<body>
${tableElement.outerHTML}
</body>
</html>`
}

// Generate plain text representation with tab separators (Excel-friendly)
const generatePlainTextTable = (tableElement) => {
    const rows = tableElement.querySelectorAll('tr')
    const textRows = []

    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td')
        const cellTexts = Array.from(cells).map(cell => {
            // Clean up text: trim whitespace and normalize
            return cell.textContent.trim().replace(/\s+/g, ' ')
        })
        textRows.push(cellTexts.join('\t'))
    })

    return textRows.join('\n')
}

// Main copy function with modern Clipboard API and multiple formats
const copyTableWithInlineStyles = async (tableElement, options = {}) => {
    const {
        includeWrapper = true,
        showNotification = true,
        notificationDuration = 2000
    } = options

    try {
        // Clone table with inline styles
        const styledClone = cloneWithInlineStyles(tableElement)

        // Generate HTML content
        const htmlContent = includeWrapper
            ? wrapInHTMLDocument(styledClone)
            : styledClone.outerHTML

        // Generate plain text content (tab-separated for Excel)
        const plainTextContent = generatePlainTextTable(tableElement)

        // Create blobs for different formats
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' })
        const textBlob = new Blob([plainTextContent], { type: 'text/plain' })

        // Use modern ClipboardItem with multiple formats
        const clipboardItem = new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
        })

        await navigator.clipboard.write([clipboardItem])

        if (showNotification) {
            showCopyNotification('✅ Table copied with styles! Ready to paste in Excel, Word, or Code Editor.', 'success', notificationDuration)
        }

        return { success: true, format: 'html+text' }

    } catch (err) {
        console.error('Clipboard write failed:', err)

        // Fallback: Try execCommand for older browsers
        try {
            const fallbackResult = await fallbackCopyMethod(tableElement)
            return fallbackResult
        } catch (fallbackErr) {
            console.error('Fallback copy also failed:', fallbackErr)

            if (showNotification) {
                showCopyNotification('❌ Copy failed. Please try selecting and copying manually.', 'error')
            }

            return { success: false, error: fallbackErr.message }
        }
    }
}

// Fallback copy method using execCommand (for older browsers)
const fallbackCopyMethod = async (tableElement) => {
    return new Promise((resolve, reject) => {
        try {
            // Create a temporary container
            const container = document.createElement('div')
            container.style.position = 'fixed'
            container.style.left = '-9999px'
            container.style.top = '0'
            container.setAttribute('contenteditable', 'true')

            // Clone with inline styles
            const styledClone = cloneWithInlineStyles(tableElement)
            container.appendChild(styledClone)

            document.body.appendChild(container)

            // Select the content
            const range = document.createRange()
            range.selectNodeContents(container)

            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)

            // Execute copy command
            const success = document.execCommand('copy')

            // Cleanup
            selection.removeAllRanges()
            document.body.removeChild(container)

            if (success) {
                showCopyNotification('✅ Table copied (fallback method)', 'success')
                resolve({ success: true, format: 'fallback' })
            } else {
                reject(new Error('execCommand copy returned false'))
            }
        } catch (err) {
            reject(err)
        }
    })
}

// Visual notification helper
const showCopyNotification = (message, type = 'success', duration = 2500) => {
    // Remove any existing notification
    const existingNotification = document.getElementById('copy-notification')
    if (existingNotification) {
        existingNotification.remove()
    }

    // Create notification element
    const notification = document.createElement('div')
    notification.id = 'copy-notification'
    notification.textContent = message

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease-in-out',
        transform: 'translateX(120%)',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: '#ffffff'
    })

    document.body.appendChild(notification)

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)'
    })

    // Auto remove after duration
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)'
        setTimeout(() => notification.remove(), 300)
    }, duration)
}

// Enhanced copy button handler using the new modern approach
$("button[data-action=copy]").click(async function (eventObj) {
    eventObj.preventDefault()

    const tableElement = $(this).parents("h5.card-header").next().find("table")[0]

    if (!tableElement) {
        showCopyNotification('❌ Table not found!', 'error')
        return
    }

    await copyTableWithInlineStyles(tableElement, {
        includeWrapper: true,
        showNotification: true,
        notificationDuration: 2500
    })
})

/**
 * Modern Excel Download Solution (XLSX Compatible)
 *
 * This function generates and downloads an Excel file from the active table element.
 * Uses HTML table format with proper encoding for maximum compatibility with
 * modern Excel versions (2007+, 2010, 2013, 2016, 2019, 2021, 365).
 *
 * Features:
 * - Preserves cell colors (text color for positive/negative values)
 * - Handles merged cells (colspan/rowspan)
 * - Full compatibility with Excel 2007+ and LibreOffice
 * - No external library dependencies
 * - Supports custom filename based on table context
 */

// Generate Excel-compatible HTML content from table element
const generateExcelHTML = (tableElement) => {
    const rows = tableElement.querySelectorAll('tr')
    let tableContent = ''

    rows.forEach(row => {
        let cells = ''
        const cellElements = row.querySelectorAll('th, td')

        cellElements.forEach(cell => {
            const computedStyle = window.getComputedStyle(cell)
            const textContent = cell.textContent.trim().replace(/\s+/g, ' ')
            const colspan = cell.getAttribute('colspan')
            const rowspan = cell.getAttribute('rowspan')
            const tagName = cell.tagName.toLowerCase()

            // Build inline styles for Excel compatibility
            let inlineStyles = []

            // Extract and apply font color (red for negative, green for positive)
            const color = computedStyle.color
            if (color.includes('255, 0, 0') || color.includes('rgb(255, 0, 0)') || color === 'red') {
                inlineStyles.push('color: #FF0000')
            } else if (color.includes('0, 128, 0') || color.includes('rgb(0, 128, 0)') || color === 'green') {
                inlineStyles.push('color: #008000')
            }

            // Apply header styles
            const isHeader = tagName === 'th'
            if (isHeader) {
                inlineStyles.push('background-color: #F4F4F4')
                inlineStyles.push('font-weight: bold')
                inlineStyles.push('text-align: center')
            }

            // Apply font weight for bold cells
            if (computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 600) {
                if (!isHeader) inlineStyles.push('font-weight: bold')
            }

            // Build cell attributes
            let attrs = ''
            if (colspan) attrs += ` colspan="${colspan}"`
            if (rowspan) attrs += ` rowspan="${rowspan}"`
            if (inlineStyles.length > 0) attrs += ` style="${inlineStyles.join('; ')}"`

            // Use mso-number-format for numeric data handling
            const cleanValue = textContent.replace(/[,%]/g, '').trim()
            const isNumeric = !isNaN(parseFloat(cleanValue)) && cleanValue !== ''

            let cellValue = escapeHTMLForExcel(textContent)
            if (isNumeric && textContent.includes('%')) {
                // Keep percentage as text to preserve formatting
                cellValue = escapeHTMLForExcel(textContent)
            }

            cells += `<${tagName}${attrs}>${cellValue}</${tagName}>`
        })

        tableContent += `<tr>${cells}</tr>\n`
    })

    // Excel-compatible HTML with proper headers and encoding
    // Using XML declaration and proper namespaces for Excel recognition
    const excelHTML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<!--[if gte mso 9]>
<xml>
<x:ExcelWorkbook>
<x:ExcelWorksheets>
<x:ExcelWorksheet>
<x:Name>Sheet1</x:Name>
<x:WorksheetOptions>
<x:DisplayGridlines/>
</x:WorksheetOptions>
</x:ExcelWorksheet>
</x:ExcelWorksheets>
</x:ExcelWorkbook>
</xml>
<![endif]-->
<style type="text/css">
table {
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    font-size: 10pt;
    mso-displayed-decimal-separator: ".";
    mso-displayed-thousand-separator: ",";
}
th, td {
    border: 1px solid #DDDDDD;
    padding: 6px 8px;
    text-align: left;
    vertical-align: middle;
    mso-number-format: General;
}
th {
    background-color: #F4F4F4;
    font-weight: bold;
    text-align: center;
}
.number {
    mso-number-format: "0.00";
    text-align: right;
}
.text {
    mso-number-format: "\\@";
}
</style>
</head>
<body>
<table>
${tableContent}
</table>
</body>
</html>`

    return excelHTML
}

// Helper function to escape HTML special characters for Excel
const escapeHTMLForExcel = (str) => {
    if (typeof str !== 'string') return String(str)
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// Generate filename based on table context
const generateExcelFilename = (tableElement) => {
    // Try to get table identifier from aria-labelledby or parent context
    const ariaLabel = tableElement.getAttribute('aria-labelledby') || ''
    const parentHeader = tableElement.closest('.card')?.querySelector('.card-header')?.textContent?.trim() || ''

    // Generate date string for filename
    const now = new Date()
    const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`

    // Clean up and format filename
    let baseName = ariaLabel || parentHeader || 'weekly-report'
    baseName = baseName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50) // Limit length

    // Use .xls extension for HTML-based Excel format
    return `${baseName}-${dateStr}.xls`
}

// Main download function
const downloadTableAsExcel = async (tableElement, options = {}) => {
    const {
        filename = null,
        showNotification = true,
        notificationDuration = 2500
    } = options

    try {
        if (!tableElement) {
            throw new Error('Table element not found')
        }

        // Generate Excel-compatible HTML content
        const excelContent = generateExcelHTML(tableElement)

        // Generate filename with .xls extension
        const finalFilename = filename || generateExcelFilename(tableElement)

        // Create Blob with proper MIME type for Excel HTML format
        // Using Uint8Array with BOM for proper UTF-8 encoding in Excel
        const BOM = new Uint8Array([0xEF, 0xBB, 0xBF])
        const blob = new Blob([BOM, excelContent], {
            type: 'application/vnd.ms-excel;charset=utf-8'
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = finalFilename
        link.style.display = 'none'

        document.body.appendChild(link)
        link.click()

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }, 100)

        if (showNotification) {
            showCopyNotification(`✅ Excel file "${finalFilename}" downloaded successfully!`, 'success', notificationDuration)
        }

        return { success: true, filename: finalFilename }

    } catch (err) {
        console.error('Excel download failed:', err)

        if (showNotification) {
            showCopyNotification('❌ Excel download failed. Please try again.', 'error')
        }

        return { success: false, error: err.message }
    }
}

// Download button handler using the same pattern as copy button
$("button[data-action=download-excel]").click(async function (eventObj) {
    eventObj.preventDefault()

    const tableElement = $(this).parents("h5.card-header").next().find("table")[0]

    if (!tableElement) {
        showCopyNotification('❌ Table not found!', 'error')
        return
    }

    await downloadTableAsExcel(tableElement, {
        showNotification: true,
        notificationDuration: 2500
    })
})
