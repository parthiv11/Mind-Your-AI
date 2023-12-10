import cssTailwindText from "data-text:~/contents/style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"
import { createContext, useState } from "react"
import { LuArrowLeft, LuEdit3 } from "react-icons/lu"

import Button from "~components/Button"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/mail/u/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  const arrOfEl = document.querySelectorAll("div.gA.gt.acV")
  return arrOfEl[arrOfEl.length - 1]
}
export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor,
  mountState
}) => {
  anchor.element.prepend(shadowHost)
  mountState.observer.disconnect() // OPTIONAL DEMO: stop the observer as needed
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTailwindText
  return style
}

export const getShadowHostId = () => "mind-your-ai-gmail"

const buttonsArray = [
  {
    content: "Yess!",
    prompt: "Write yes positively in formal."
  },
  {
    content: "No..",
    prompt: "Say no for work."
  }
]

export const GmailContext = createContext(null)

function GmailReply() {
  const [isEditMode, setEditMode] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [defaultValue, setDefaultValue] = useState(
    "Reply formal in postive tone..."
  )

  const writeEmail = (parent, reply) => {

    const lines = reply.split("\n")
    const htmlLines = lines.map((line) => `<p>${line}</p>`)
    const htmlReply = htmlLines.join("\n")
    parent.querySelector('div[aria-label="Message Body"]').innerHTML = htmlReply
  }

  const generateEmail = (e) => {
    setLoading(true)
    const repltArr = document.querySelectorAll("div.ii.gt")
    const lastReply = repltArr[0].textContent
    const refinedReply = lastReply.replace(/\n\s+/g, "\n")
    try {
      const replyBtn = document.querySelector(".amn").firstChild
      replyBtn.click()
    } catch (err) {
      console.log(err)
    }

    const message = {
      query_type: "gmail",
      inputs: {
        last_reply: refinedReply,
        prompt: defaultValue
      }
    }

    chrome.runtime.sendMessage(message, (response) => {
      setLoading(false)
        const parent = e.nativeEvent.target.parentNode
      if (response != null) {
        writeEmail(parent, response)
      } else {
        writeEmail(parent, "Something went Wrong !!!! ")
      }
      setEditMode(false)
    })
  }

  return (
    <GmailContext.Provider
      value={{ setEditMode, setDefaultValue, generate: generateEmail }}>
      {!isLoading ? (
        <>
          {!isEditMode ? (
            <div className="ml-[48px] mx-[5px] flex  justify-start items-center overflow-hidden">
              <span className="flex gap-1 py-1">
                {buttonsArray.map((obj, index) => (
                  <Button
                    key={index}
                    context={GmailContext}
                    obj={obj}
                    Icon={LuEdit3}
                  />
                ))}
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
            <div className="flex justify-between">
              <button className="hover:bg-black-100 focus-visible:ring-black-400 h-full rounded-r-full p-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring">
                <LuArrowLeft onClick={() => setEditMode(false)} />
              </button>
              <textarea
                defaultValue={defaultValue}
                placeholder="Enter custom prompt"
                className="border-green-500 text-green-500 rounded-md border text-xl mx-5 font-semibold resize-none grow px-1"
              />
              <button
                onClick={generateEmail}
                className="border-green-600 bg-green-300 hover:border-green-800 hover:bg-green-200 focus-visible:ring-green-400 active:border-green-700 px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300 rounded-lg m-9px ">
                Generate
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-fit mx-auto my-auto">
          <p>Loading...</p>
          {/* You can add a loading animation or spinner here */}
        </div>
      )}
    </GmailContext.Provider>
  )
}

export default GmailReply
