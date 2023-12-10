const BACKEND_URL = "https://m-y-ai-server.onrender.com"

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: "options.html"
    })
  }
})
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
    .then(() => console.log("Mind Your AI clicked"))
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "login-attempt") {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message.input)
    }

    fetch(`${BACKEND_URL}/login`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response["token"]) {
          chrome.storage.local
            .set({ m_y_ai_key: response["token"] })
            .then(() => {
              sendResponse("success")
            })
        } else {
          sendResponse(response)
        }
      })
      .catch((err) => {
        console.error("Error in login:", err)
        sendResponse({ error: `Error in login:, ${err}` })
      })
  } else {
    chrome.storage.local.get(["m_y_ai_key"]).then((result) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: result.m_y_ai_key
        },
        body: JSON.stringify(message)
      }

      fetch(`${BACKEND_URL}/getPrediction`, options)
        .then((response) => response.json())
        .then((response) => {
          if(response["prediction"])
          {sendResponse(response["prediction"])}
          else{
            sendResponse(`Error Occured: ${response["error"]}`)
          }
        })
        .catch((err) => {
          console.error("Error in Predictions:", err)
          sendResponse(`Error in Predictions: ${err}`)
        })
    })
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
