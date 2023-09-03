import React, {useContext} from 'react';


type CustomContextType = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultValue: React.Dispatch<React.SetStateAction<string>>;
  generate: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type ButtonProps = {
  obj: { content: string; prompt: string };
  Icon?: React.ComponentType<any>;
  context: React.Context<CustomContextType>; // Use the custom context type here
};

const Button:React.FC<ButtonProps> = ({ obj,context , Icon = null }) => {
  const { setEditMode, setDefaultValue, generate } = useContext(context);

  // Function to handle icon click
  const handleIconClick = () => {
    setDefaultValue(obj.prompt)
    setEditMode(true);
  };

  return (
    <div className="border-green-500 text-green-500 hover:border-green-600  flex max-w-[150px] items-center justify-evenly text-ellipsis whitespace-nowrap rounded-full border text-xl font-semibold transition-colors duration-300 ease-in-out">
      <button
        onClick={(e) => {generate(e)}}
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
