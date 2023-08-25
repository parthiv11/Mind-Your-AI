import react from "react";

function Prediction(props: any) {
    return (
        <div>
  <div>
    <div>
      AI Says:
      {/* <span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 14 14">
            <rect x="4" y="4" width="9" height="9" rx="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></rect>
            <path d="M10 4V2.5C10 1.67157 9.32843 1 8.5 1H2.5C1.67157 1 1 1.67157 1 2.5V8.5C1 9.32843 1.67157 10 2.5 10H4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </span>
      </span> */}
    </div>
    <div>
      <div>
        <pre>{props.output}</pre>
      </div>
    </div>
  </div>
</div>
    )
}

export default Prediction;