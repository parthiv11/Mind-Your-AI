import React from "react"
import { IoCopy } from "react-icons/io5"

const Prediction = ({ output, isLoading }) => {
  const handleCopyClick = () => {
    // Copy the output content to the clipboard
    navigator.clipboard.writeText(output)
  }
  return (
    <div className="flex flex-col grow ">
      <div className="flex items-end justify-between font-bold text-blue-600">
        <div>AI Says:</div>
        {isLoading && (
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></span>
        )}
        <button
          className="h-6 w-15 m-[5px] border-t-2 border-blue-500 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md px-2 transition duration-200"
          onClick={handleCopyClick}>
          <IoCopy />
        </button>
      </div>
      <>
      <pre className=" text-black grow h-full whitespace-pre-wrap max-w-full border border-gray-300 p-2 bg-gray-100 dark:bg-gray-700">
        {output}
      </pre>
      </>
    </div>
  )
}

export default Prediction
