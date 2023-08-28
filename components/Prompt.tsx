import React from 'react';

const Prompt = ({ re, onEnter }) => {
  return (
    <div id="prompt-container" className='mb-5 w-[100%] h-[60px]'>
      <div className='font-bold text-blue-600'>Prompt: </div>
      <textarea
        id="prompt-input"
        className="bg-blue-100 resize-none border-2 border-blue-500 focus:ring-1 focus:ring-violet-600 focus:ring-offset-0 rounded-lg p-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-gray-200 w-full h-full"
        onKeyDown={onEnter}
        ref={re}
        placeholder="Ask AI. Ex: Write an email reply in formal style"
        rows={1}
      ></textarea>
    </div>
  );
};

export default Prompt;
