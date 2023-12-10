// Import necessary dependencies
import cssText from "data-text:~/contents/modal.css"
import cssTailwindText from "data-text:~/contents/style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import Context from "~components/Context"
import Prediction from "~components/Prediction"
import Prompt from "~components/Prompt"

// Define the PlasmoCSConfig
export const config: PlasmoCSConfig = {
  matches: ["https://*/*"]
}

// Function to create a <style> element with the CSS text
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTailwindText + cssText
  return style
}

// Function to get the shadow host ID
export const getShadowHostId = () => "mind-your-ai-modal"

// Define the ModalOverlay component

const ModalOverlay = () => {
  const [output, setOutput] = useState(
    "Type your request above and press enter"
  )
  const [context, setContext] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const contextEl = useRef(null)
  const questionEl = useRef(null)

  function toggleModalVisibility() {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    const toggleModalEventListener = (event) => {
      toggleModalVisibility()
      if (event.detail.context != null && event.detail.context !== "") {
        setContext(event.detail.context)
      } else {
        setContext(null)
      }
    }

    document.addEventListener("toggleModalEvent", toggleModalEventListener)

    return () => {
      document.removeEventListener("toggleModalEvent", toggleModalEventListener)
    }
  })

  async function onEnterTextareaSubmit(e) {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault()
      setIsLoading(true)

      let context = null
      const question = questionEl.current.value
      if (contextEl.current != null) {
        context = contextEl.current.value
      }
      const message = {
        query_type: "default",
        inputs: {
          question: question,
          context: context
        }
      }
      setOutput("AI is thinking...")

      // Send message to the runtime
      chrome.runtime.sendMessage(message, (response) => {
        setIsLoading(false)
        if (response != null) {
          console.log(response)
          setOutput(response)
        } else {
          console.log('not recevied')

          setOutput(response)
        }
      })
    }
  }

  return (
    <>
      {isVisible && (
        <div
          id="modal"
          className="flex flex-col fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] max-w-2xl h-auto max-h-[80vh] overflow-y-auto min-w-[300px] min-h-[500px]
          bg-white shadow-md p-5 w-[75%] border rounded-lg dark:bg-gray-800">
          <button
            onClick={toggleModalVisibility}
            className="fixed right-10 top-3 w-[50px] h-[50px] flex justify-end text-xl font-bold text-indigo-700	  hover:text-pink-600">
            X
          </button>
          <Prompt onEnter={onEnterTextareaSubmit} re={questionEl} />
          {context && <Context re={contextEl} contextValue={context} />}
          <Prediction output={output} isLoading={isLoading} />
        </div>
      )}
    </>
  )
}

export default ModalOverlay
