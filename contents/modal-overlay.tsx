// Import necessary dependencies
import type { PlasmoCSConfig } from "plasmo";
import Prediction from "~components/Prediction";
import Context from "~components/Context";
import Prompt from "~components/Prompt";
import cssText from "data-text:~/contents/modal.css";
import { useEffect, useRef, useState } from "react";
import cssTailwindText from "data-text:~/contents/style.css"



// Define the PlasmoCSConfig
export const config: PlasmoCSConfig = {
  matches: ["https://*/*"],
};

// Function to create a <style> element with the CSS text
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssTailwindText + cssText;
  return style;
};

// Function to get the shadow host ID
export const getShadowHostId = () => "mind-your-ai-modal";

// Define the ModalOverlay component
const ModalOverlay = () => {
  // State for output, context, and modal visibility
  const [output, setOutput] = useState(
    "Type your request above and press enter"
  );
  const [context, setContext] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for DOM elements
  const contextEl = useRef(null);
  const questionEl = useRef(null);
  const modalRef = useRef(null);


  // Function to toggle modal visibility
  function toggleModalVisibility() {
    setIsVisible(!isVisible);
  }

  // Effect to listen for the custom event
  useEffect(() => {
    const toggleModalEventListener = (event) => {
      toggleModalVisibility();
      console.log("event Triggered", event);
      if (event.detail.context != null && event.detail.context != "")
        setContext(event.detail.context);
    };
    const handleClickOutside = (event) => {
      console.log("event Triggered", event);
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // toggleModalVisibility();
      }
    };

    document.addEventListener("click", handleClickOutside);

    document.addEventListener("toggleModalEvent", toggleModalEventListener);

    return () => {
      document.removeEventListener(
        "toggleModalEvent",
        toggleModalEventListener
      );
      document.removeEventListener("click", handleClickOutside);

    };
  });

  // Function to handle textarea submission
  async function onEnterTextareaSubmit(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      setIsLoading(true);
      const question = questionEl.current.value;
      const context = contextEl.current.value;
      const message = {
        type: "get-prediction",
        question: question,
        context: context,
      };
      setOutput("AI is thinking...");

      // Send message to the runtime
      chrome.runtime.sendMessage(message, (response) => {
        setIsLoading(false);
        if (response != null) {
          setOutput(response);
        } else {
          setOutput("Something went Wrong !!!!");
        }
      });
    }
  }

  return (
    <>
      {isVisible && (
        <div ref={modalRef} id={"modal"} >
          {/* Button to Close modal visibility */}
          <button onClick={toggleModalVisibility}>Close Modal</button>
          {/* Prompt for entering question */}
          <Prompt onEnter={onEnterTextareaSubmit} re={questionEl} />

          {/* Display context if available */}
          {context && <Context re={contextEl} contextValue={context} />}
          

          {/* Display prediction output */}
          <Prediction output={output} isLoading={isLoading}/>
        </div>
      )}
    </>
  );
};

export default ModalOverlay;
