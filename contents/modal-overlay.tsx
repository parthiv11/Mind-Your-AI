import type { PlasmoCSConfig } from "plasmo"
import Prediction from "~components/Prediction"
import Context from "~components/Context"
import Prompt from "~components/Prompt"
import cssText from "data-text:~/contents/modal.css"
import { useEffect, useRef, useState } from "react";


export const config: PlasmoCSConfig = {
  matches: ["https://*/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "mind-your-ai-modal"



const ModalOverlay = () => {

  const [output, setOutput] = useState("Type your request above and press enter")
  const [context, setContext] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const contextEl = useRef(null)
  const questionEl = useRef(null)
  //use hook to get selected text
  function toggleModalVisibility() {
    setIsVisible(!isVisible);
  }
  useEffect(() => {

    const toggleModalEventListener = (event) => {
        toggleModalVisibility();
        console.log("event Triggered", event);
        setContext(event.detail);
      
    };

    document.addEventListener("toggleModalEvent", toggleModalEventListener);

    return () => {
      document.removeEventListener("toggleModalEvent", toggleModalEventListener);
    };
  });



  async function onEnterTextareaSubmit(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault()
      const question = questionEl.current.value
      const context = contextEl.current.value
      const message = {
        type: 'get-prediction',
        question: question,
        context: context
      }
      setOutput("AI is thinking...")
      chrome.runtime.sendMessage(message, (response) => {

        if (response != null)
          setOutput(response)
        else
          setOutput('Something went Wrong !!!!!')

      });

    }
  }

  return (<>{isVisible && (
    <div id={"modal"}>
      <Prompt onEnter={onEnterTextareaSubmit} re={questionEl} />
      {context &&
        <Context re={contextEl} contextValue={context} />}
      <button onClick={toggleModalVisibility}>Toggle Modal</button>

      <Prediction output={output} />
    </div>
  )}</>)

}

export default ModalOverlay
