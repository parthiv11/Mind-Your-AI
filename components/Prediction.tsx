import react from "react";

function Prediction({ output, isLoading }) {
  return (
    <div>
      <div className="flex justify-between">
        AI Says:
        {isLoading && (
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></span>
        )}
        </div>
        <div>
          <div>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
  )
}

export default Prediction;