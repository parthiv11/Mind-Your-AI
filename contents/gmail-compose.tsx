import cssTailwindText from "data-text:~/contents/style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchorList,
  PlasmoGetShadowHostId,
  PlasmoMountShadowHost
} from "plasmo"
import { createContext, useState } from "react"
import { GiSplitCross } from "react-icons/gi"
import { LuArrowLeft, LuEdit3 } from "react-icons/lu"

import Button from "~components/Button"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/mail/u/0/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll("div.aDj")

export const getShadowHostId: PlasmoGetShadowHostId = ({ element }) =>
  `mindYourAi-gmail-` + element.getAttribute("id")

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor
}) => {
  anchor.element.prepend(shadowHost)
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTailwindText
  return style
}

const buttonsArray = [
  {
    content: "Intro",
    prompt: "Compose a professional introduction email."
  },
  {
    content: "Job Apply",
    prompt: "Draft a job application email."
  },
  {
    content: "Meeting",
    prompt: "Compose an email to request a meeting with a busy executive."
  },
  {
    content: "Feedback",
    prompt:
      "Create an email to ask for feedback from your customers about a recent product or service."
  },
  {
    content: "Thank You",
    prompt:
      "Write a thank-you email to a mentor or someone who has helped you in your career."
  },
  {
    content: "Newsletter",
    prompt:
      "Create an email newsletter to update subscribers about the latest news and developments in your industry or organization."
  },
  {
    content: "Apology",
    prompt:
      "Write an email apologizing to a customer for a mistake made by your company."
  },
  {
    content: "Sales",
    prompt:
      "Create an email to promote a new product or service to your customer base."
  },
  {
    content: "Invite",
    prompt:
      "Compose an email invitation for an upcoming event, such as a birthday party or a business conference."
  },
  {
    content: "Resign",
    prompt:
      "Write a resignation email to your employer, expressing your intention to leave the company."
  }
]

export const GmailContext = createContext(null)

function GmailReply() {
  const [isEditMode, setEditMode] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [defaultValue, setDefaultValue] = useState(
    "Draft a formal mail for job application at [COMAPNY NAME] for [POSITION]"
  )

  const getRandomUniqueButtons = (array, count = 2) => {
    const shuffledArray = array.slice().sort(() => 0.5 - Math.random()) // Shuffle the array
    return (
      <>
        {shuffledArray.slice(0, count).map((obj, index) => (
          <Button key={index} obj={obj} context={GmailContext} Icon={LuEdit3} />
        ))}
      </>
    )
  }
  const toggle = (e) => {
    const root = e.nativeEvent.target.getRootNode().host
    if (root.style.display == "none") {
      root.style.display = "block"
    } else {
      root.style.display = "none"
    }
  }

  const writeEmail = (parent, mail) => {
    const lines = mail.split("\n")
    const htmlLines = lines.map((line) => `<p>${line}</p>`)
    const htmlReply = htmlLines.join("\n")
    parent.querySelector('div[aria-label="Message Body"]').innerHTML = htmlReply
  }

  const generateEmail = (e) => {
    setLoading(true)
    const parent = e.nativeEvent.target.getRootNode().host.closest(".I5")

    const message = {
      query_type: "gmail_compose",
      inputs: {prompt: defaultValue}
    }

    chrome.runtime.sendMessage(message, (response) => {
      setLoading(false)
      if (response != null) {
        writeEmail(parent, response)
      } else {
        writeEmail(parent, "Something went Wrong !!!! ")
      }
      setEditMode(false)
    })
  }

  return (
    <>
      <GmailContext.Provider
        value={{ setEditMode, setDefaultValue, generate: generateEmail }}>
        <div className="flex grow bg-white  ">
          {!isLoading ? (
            <>
              {!isEditMode ? (
                <div className="flex grow bg-white pl-2  justify-start items-center overflow-hidden">
                  <span className="flex gap-4 py-1">
                    {getRandomUniqueButtons(buttonsArray)}
                  </span>
                  <div className="center-with-flex ml-auto">
                    <div className="border-green-500 text-green-500 hover:border-green-600 active:border-green-700 disabled:border-green-200 flex max-w-[150px] items-center justify-evenly text-ellipsis whitespace-nowrap rounded-full border text-xl mx-2 font-semibold transition-colors duration-300 ease-in-out">
                      <button
                        onClick={() => setEditMode(true)}
                        type="button"
                        className="border-green-500 hover:border-green-600 hover:bg-green-100 focus-visible:ring-green-400 active:border-green-700 truncate px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring grow rounded-full">
                        Create
                      </button>
                    </div>
                  </div>
                  <div className="center-with-flex ml-auto">
                    <div className="border-green-500 text-green-500 hover:border-green-600 active:border-green-700 disabled:border-green-200 flex max-w-[150px] items-center justify-evenly text-ellipsis whitespace-nowrap rounded-full border text-xl mx-2 font-semibold transition-colors duration-300 ease-in-out">
                      <button
                        onClick={(e) => toggle(e)}
                        type="button"
                        className="border-green-500 hover:border-green-600 hover:bg-green-100 focus-visible:ring-green-400 active:border-green-700 truncate px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring grow rounded-full">
                        <GiSplitCross />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex grow justify-between mb-1">
                  <button className="hover:bg-black-100 focus-visible:ring-black-400 h-full rounded-r-full p-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring">
                    <LuArrowLeft onClick={() => setEditMode(false)} />
                  </button>
                  <textarea
                    defaultValue={defaultValue}
                    placeholder="Enter custom prompt"
                    className="border-green-500 text-green-500 rounded-md border text-xl mx-5 font-semibold resize-none grow px-1"
                  />
                  <button
                    onClick={(e) => generateEmail(e)}
                    className="border-green-600 bg-green-300 hover:border-green-800 hover:bg-green-200 focus-visible:ring-green-400 active:border-green-700 px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300 rounded-lg m-9px ">
                    Generate
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-fit mx-auto my-auto">
              <p>Generating....</p>
              {/* You can add a loading animation or spinner here */}
            </div>
          )}
        </div>
      </GmailContext.Provider>
    </>
  )
}

export default GmailReply
