import cssTailwindText from "data-text:~/contents/style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchorList,
  PlasmoGetShadowHostId,
  PlasmoMountShadowHost
} from "plasmo"
import Logo from "react:~/assets/logo.svg"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/mail/u/0/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll(".gU.a0z")

export const getShadowHostId: PlasmoGetShadowHostId = () =>
  `mindYourAi-gmail-icon`



export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTailwindText
  return style
}

function GmailIcon() {
  const toggleBar = (e) => {

    const rootOfBar = e.nativeEvent.target
      .getRootNode()
      .host.closest(".aDg")
      .querySelector('[id^="mindYourAi-gmail-:"]')

    if (rootOfBar.style.display == "none") {
      rootOfBar.style.display = "block"
    } else {
      rootOfBar.style.display = "none"
    }
  }

  return (
    <>
      <button
        type="button"
        className="relative h-5 w-5 cursor-pointer"
        onClick={(e) => toggleBar(e)}>
        <div className="center-with-flex merlin-gmail-close-notify absolute -right-1 -top-1 hidden">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full scale-125 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
        </div>
        <Logo />
      </button>
    </>
  )
}

export default GmailIcon
