import react from 'react';

function Context({re, contextValue}){
    return (
    <div>
        <div>Your selected context is copied below:</div>
        <div>
          <textarea  
          defaultValue={contextValue}
          ref={re}         
          id='context-input'
          className='input'
          placeholder='Write Your Detailed Context Here'
          rows={1} />
        </div>
      </div>
    )
      
}

export default Context;