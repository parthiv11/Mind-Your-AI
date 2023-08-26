import { getPrediction } from "./mindsdb.js"


chrome.action.onClicked.addListener((tab) => {
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const selectedText = window.getSelection().toString(); // Get the selected text
            const toggleModalEvent = new CustomEvent("toggleModalEvent", { detail: selectedText });
            document.dispatchEvent(toggleModalEvent);

        },
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

});


chrome.contextMenus.create({
    id: "mind-your-ai",
    title: "Send Contex to Mind Your AI %s",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "mind-your-ai") {
      const selectedText = info.selectionText; // Get the selected text
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const toggleModalEvent = new CustomEvent("toggleModalEvent", { detail: selectedText });
            document.dispatchEvent(toggleModalEvent);
        },
      });
    }
  });
  

