import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import Prediction from "~components/Prediction"
import Context from "~components/Context"
import Prompt from "~components/Prompt"
import cssText from "data-text:~/contents/modal.css"
import { useRef, useState } from "react";


export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "mind-your-ai-modal"



const ModalOverlay = () => {

  const [output, setOutput] = useState("Type your request above and press enter")
  const [context, setContext] = useState("")
  const contextEl= useRef(null)
  const questionEl= useRef(null)
  chrome.runtime.sendMessage({type:'get-context'}, (response) => {
    console.log("sent message")
    if (response!=null)
      setContext(response)
    // else  
    //   setContext('Something went Wrong !!!!!')
  }); 

  

  async function onEnterTextareaSubmit(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault()
      const question=questionEl.current.value
      const context = contextEl.current.value
      const message ={
        type:'get-prediction',
        question: question,
        context: context
      }
      setOutput("AI is thinking...")
      chrome.runtime.sendMessage(message, (response) => {

      if (response!=null)
        setOutput(response)
      else
        setOutput('Something went Wrong !!!!!')

      });

    }
  }
  return (
    <div id={"modal"}>
      <Prompt onEnter={onEnterTextareaSubmit} re={questionEl}/>
      <Context re={ contextEl } contextValue={context}/>
      <Prediction output={output} />
    </div>
  )

}

export default ModalOverlay
