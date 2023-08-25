import react from 'react';

import React from 'react';

const Prompt = ({re, onEnter}) => {

  return (
      <div id={"prompt-container"}>
        <textarea
          id="prompt-input"
          className="input"
          onKeyDown={onEnter}
          ref={re}
          placeholder={"Ask AI. Ex: Write an email reply in formal style"}
          rows={1}
          
        ></textarea>
      </div>
  );
};

export default Prompt;
