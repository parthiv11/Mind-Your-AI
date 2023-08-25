import { getPrediction } from "./mindsdb.js"


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleModal,
    }).then(() => console.log("button clicked"));
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'get-prediction') {
        try {
            const pred = await getPrediction(message.question, message.context);
            sendResponse(pred);
        } catch (error) {
            console.error("Error in prediction:", error);
            sendResponse(null); // Handle the error response
        }
    }

    else if (message.type === 'get-context') {
        console.log(getSelection())
        try {
            const selectedText = window.getSelection().toString();
            sendResponse(selectedText);
            
        } catch (error) {
            console.error("Error in prediction:", error);
            sendResponse(null); // Handle the error response
        }
    }
});



chrome.contextMenus.create({
    id: "mind-your-ai",
    title: "Send Contex to Mind Your AI",
    contexts: ["selection"],
});








function toggleModal() {
    document.getElementById("mind-your-ai-modal").classList.toggle("hidden");

}



