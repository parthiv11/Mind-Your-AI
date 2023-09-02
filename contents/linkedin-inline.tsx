import cssTailwindText from "data-text:~/contents/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React, { createContext, useState } from "react"
import { LuArrowLeft, LuEdit3 } from "react-icons/lu"

import Button from "~components/Button"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".display-flex .flex-wrap")
// document.querySelector('.comments-comment-texteditor')

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTailwindText
  return style
}

export const getShadowHostId = () => "mind-linkedin"
const buttonsArray = [
  {
    content: "Impressive!",
    prompt:
      "Write an impressive LinkedIn post reply. Make it stand out and go viral on LinkedIn."
  },
  {
    content: "Thoughtful Reply",
    prompt:
      "Craft a thoughtful response to this LinkedIn post. Make it engaging and shareable."
  },
  {
    content: "Superb",
    prompt:
      "Acknowledge their outstanding performance in this LinkedIn post. Create a response that can resonate with others."
  },
  {
    content: "Remarkable!",
    prompt:
      "Express amazement at their remarkable achievement in this LinkedIn post. Make your response attention-grabbing."
  },
  {
    content: "Congratulations!",
    prompt:
      "Offer warm congratulations on their achievement in this LinkedIn post. Craft a congratulatory message that can make waves on LinkedIn."
  },
  {
    content: "Kudos!",
    prompt:
      "Give them a round of applause for their success in this LinkedIn post. Create a response that can inspire and engage."
  },
  {
    content: "You did it!",
    prompt:
      "Celebrate their success with enthusiasm in this LinkedIn post. Make your response shareable and positive."
  },
  {
    content: "Bravo!",
    prompt:
      "Show appreciation for their outstanding performance in this LinkedIn post. Craft a response that can grab people's attention."
  },
  {
    content: "Well done!",
    prompt:
      "Acknowledge their excellent work in this LinkedIn post. Make your response engaging and worthy of sharing."
  },
  {
    content: "Fantastic!",
    prompt:
      "Express your excitement for their achievement in this LinkedIn post. Create a response that can go viral on LinkedIn."
  },
  {
    content: "Inspirational!",
    prompt:
      "Share how their post inspired you on LinkedIn. Craft an inspirational response that can resonate with others."
  },
  {
    content: "Impressive!",
    prompt:
      "Highlight the impressive aspect of their post on LinkedIn. Make your response attention-grabbing and shareable."
  }
]

export const LinkedinContext = createContext(null)

function LinkedinSuggestion() {
  const [isEditMode, setEditMode] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [defaultValue, setDefaultValue] = useState(
    "Generate viral LinkedIn post"
  )

  // Function to get a random button object from buttonsArray
  const  getRandomUniqueButtons = (array, count=3) => {
  
    const shuffledArray = array.slice().sort(() => 0.5 - Math.random()); // Shuffle the array
    return (
      <>
        {shuffledArray.slice(0, count).map((obj, index) => (
          <Button key={index} obj={obj} Icon={LuEdit3} />
        ))}
      </>
    );
  }

  const writeComment = (parentElement, text) => {
    let input = parentElement.querySelector(".ql-editor.ql-blank p")
    input.textContent = text
  }

  const generateComment = (e) => {
    setLoading(true)
    const host = e.nativeEvent.target
      .getRootNode()
      .host.closest(".feed-shared-update-v2")
    const el = host.querySelector(".feed-shared-update-v2__description-wrapper")
    let text = el.textContent
    const postText = text.replace(/…see more/g, "")
    const message = {
      type: "generate-linkedin-comment",
      post: postText,
      prompt: defaultValue
    }

    chrome.runtime.sendMessage(message, (response) => {
      setLoading(false) 
      if (response != null) {
        console.log(response)
        writeComment(host, response)
      } else {
        writeComment(host, "Something went Wrong !!!! ")
      }
      setEditMode(false)
    })
  }

  return (
    <LinkedinContext.Provider
      value={{ setEditMode, setDefaultValue, generateComment }}>
      {!isLoading ? (
        <>
          {!isEditMode ? (
            <div
              style={{}}
              className="my-[6px] mx-[5px] flex flex-1 justify-start items-center overflow-hidden">
              <span className="flex py-1">
                {getRandomUniqueButtons(buttonsArray)}
              </span>
              <div className="center-with-flex ml-auto">
                <div className="border-green-500 text-green-500 hover:border-green-600 active:border-green-700 disabled:border-green-200 flex max-w-[150px] items-center justify-evenly text-ellipsis whitespace-nowrap rounded-full border text-xl mx-5 font-semibold transition-colors duration-300 ease-in-out">
                  <button
                    onClick={() => setEditMode(true)}
                    type="button"
                    className="border-green-500 hover:border-green-600 hover:bg-green-100 focus-visible:ring-green-400 active:border-green-700 truncate px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring grow rounded-full">
                    Create
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 justify-between">
              <button className="hover:bg-black-100 focus-visible:ring-black-400 h-full rounded-r-full p-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring">
                <LuArrowLeft onClick={() => setEditMode(false)} />
              </button>
              <textarea
                defaultValue={defaultValue}
                placeholder="Enter custom prompt"
                className="border-green-500 text-green-500 rounded-md border text-xl mx-5 font-semibold resize-none grow px-1"
              />
              <button
                onClick={(e) => generateComment(e)}
                className="border-green-600 bg-green-300	 hover:border-green-800 hover:bg-green-200 focus-visible:ring-green-400 active:border-green-700 px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300">
                Generate
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto my-auto">
          <p>Loading...</p>
          {/* You can add a loading animation or spinner here */}
        </div>
      )}
    </LinkedinContext.Provider>
  )
}

export default LinkedinSuggestion
