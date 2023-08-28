import React from 'react';

const Context = ({ re, contextValue }) => {
  return (
    <div>
      <div className='font-bold text-blue-600'>Your selected context is copied below:</div>
      <div>
        <textarea
          defaultValue={contextValue}
          ref={re}
          id="context-input"
          className="border-2 border-blue-500 max-h-[100px] min-h-[60px] bg-blue-100 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:ring-offset-0
          rounded-lg p-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-gray-200 w-full h-full"
          placeholder="Write Your Detailed Context Here"
          rows={1}
        />
      </div>
    </div>
  );
};

export default Context;
