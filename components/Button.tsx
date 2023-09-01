import React, {useContext} from 'react';
import { LinkedinContext } from '../contents/linkedin-inline';

const Button = ({ obj, Icon = null }) => {
  const { setEditMode, setDefaultValue, generateComment } = useContext(LinkedinContext);

  // Function to handle icon click
  const handleIconClick = () => {
    setDefaultValue(obj.prompt)
    setEditMode(true);
  };

  return (
    <div className="border-green-500 text-green-500 hover:border-green-600 active:border-green-700 disabled:border-green-200 flex max-w-[150px] items-center justify-evenly text-ellipsis whitespace-nowrap rounded-full border text-xl mx-5 font-semibold transition-colors duration-300 ease-in-out">
      <button
        onClick={(e) => {generateComment(e)}}
        type="button"
        className="border-green-500 hover:border-green-600 hover:bg-green-100 focus-visible:ring-green-400 active:border-green-700 truncate  px-2 py-1 ring-0 transition-[background-color,box-shadow] duration-300 border-r rounded-l-full">
        {obj.content}
      </button>
      {Icon && (
        <button
          type="button"
          className="hover:bg-green-100 focus-visible:ring-green-400 h-full rounded-r-full p-1 ring-0 transition-[background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring"
          onClick={handleIconClick}
        >
          <Icon />
        </button>
      )}
    </div>
  );
};


export default Button;
