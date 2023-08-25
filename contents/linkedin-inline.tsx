import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React, { useEffect } from 'react';

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`[href="/#pricing"]`)

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

function CommentEditor() {
  const handleEngageClick = (event, parentForm) => {
    // Define your processButtonClicked function logic here
    // processButtonClicked(event, "engage", parentForm);
    console.log('Engage button clicked');
  };

  useEffect(() => {
    const handleFocusIn = (event) => {
      if (event.target.classList.contains("ql-editor")) {
        const parentForm = event.target.closest(".comments-comment-texteditor");

        if (parentForm && !parentForm.classList.contains("buttons-appended")) {
          // add appended class to add buttons only on the first event trigger
          parentForm.classList.add("buttons-appended");

          // create and append engage button
          const engageBtn = document.createElement("button");
          engageBtn.classList.add("rounded-button");
          engageBtn.innerText = "🤝 Engage";

          parentForm.appendChild(engageBtn);

          engageBtn.addEventListener("click", (event) => {
            handleEngageClick(event, parentForm);
          });
        } else {
          console.log("No parent with the class 'comments-comment-texteditor' found for the focused element.");
        }
      }
    };

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return (
    // Your component's JSX code here
    <div className="comments-comment-texteditor">
      <div className="ql-editor">Editor content here</div>
    </div>
  );
}

export default CommentEditor;

