import {
    getGmailPrediction,
    getLinkedinPrediction,
    getPrediction,
    getGmailComposePrediction
} from "./mindsdb.js"

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting
        .executeScript({
            target: { tabId: tab.id },
            func: () => {
                const selectedText = window.getSelection().toString() // Get the selected text
                const toggleModalEvent = new CustomEvent("toggleModalEvent", {
                    detail: {
                        type: "toggleModal",
                        context: selectedText
                    }
                })
                document.dispatchEvent(toggleModalEvent)
            }
        })
        .then(() => console.log("Mind AI clicked"))
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "get-prediction") {
        try {
            const pred = await getPrediction(message.question, message.context)
            sendResponse(pred)
        } catch (error) {
            console.error("Error in prediction:", error)
            sendResponse(null) // Handle the error response
        }
    } else if (message.type === "generate-linkedin-comment") {
        try {
            const pred = await getLinkedinPrediction(message.post, message.prompt)
            console.log(pred)
            sendResponse(pred)
        } catch (error) {
            console.error("Error in prediction:", error)
            sendResponse(null) // Handle the error response
        }
    } else if (message.type === "generate-gmail-reply") {
        try {
            const pred = await getGmailPrediction(message.lastMail, message.prompt)
            console.log(pred)
            sendResponse(pred)
        } catch (error) {
            console.error("Error in prediction:", error)
            sendResponse(null) // Handle the error response
        }
    }
     else if (message.type === "generate-gmail-compose") {
        try {
            const pred = await getGmailComposePrediction(message.prompt)
            console.log(pred)
            sendResponse(pred)
        } catch (error) {
            console.error("Error in prediction:", error)
            sendResponse(null) // Handle the error response
        }
    }
})

chrome.contextMenus.create({
    id: "mind-your-ai",
    title: "Send Context to Mind Your AI",
    contexts: ["selection"]
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "mind-your-ai") {
        const selectedText = info.selectionText // Get the selected text
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (selectedText) => {
                const toggleModalEvent = new CustomEvent("toggleModalEvent", {
                    detail: {
                        type: "toggleModal",
                        context: selectedText
                    }
                })
                document.dispatchEvent(toggleModalEvent)
            },
            args: [selectedText]
        })
    }
})
