import React from 'react';

const Prediction = ({ output, isLoading }) => {
  const handleCopyClick = () => {
    // Copy the output content to the clipboard
    navigator.clipboard.writeText(output);
  };
  return (
    <div className='flex flex-col grow '>
      <div className="flex items-end justify-between font-bold text-blue-600">
        <div>AI Says:</div>
        {isLoading && (
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></span>
        )}
        <button
          className="h-6 w-15 m-[5px] border-t-2 border-blue-500 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md px-2 transition duration-200"
          onClick={handleCopyClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
            </svg>
            </button>

      </div>
      <pre className=' grow h-full whitespace-pre-wrap max-w-full border border-gray-300 p-2 bg-gray-100 dark:bg-gray-700'>{output}</pre>
    </div>
  );
};

export default Prediction;
