import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";

const Level1 = ({ onComplete }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const [text, setText] = useState("Convert this 6 into 9");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    if (rotationAngle === 180) {
      setText("Success!");
      setTimeout(() => {
        onComplete(2);
      }, 2000);
    }
  }, [rotationAngle, onComplete]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleCommandSubmit();
    }
  };

  const handleCommandSubmit = () => {
    const match = inputValue.match(/^\/rotate (\d+)$/);
    const matchTheme = inputValue.match(/^\/theme (dark|light)$/);
    const matchHelp = inputValue.match(/^\/help$/);

    if (match) {
      const angle = parseInt(match[1], 10);
      if (!isNaN(angle)) {
        setRotationAngle((prevAngle) => (prevAngle + angle) % 360);
        setInputValue("");
      }
    } else if (matchTheme) {
      const theme = matchTheme[1];
      setTheme(theme);
      setInputValue("");
    } else if (matchHelp) {
      setHelpModalOpen(true);
      setInputValue("");
    }
  };

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-4 ">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 1
      </h1>
      <p className=" mt-8 text-xl font-semibold mb-[-1rem]">{text}</p>
      <Image
        src="/six.png"
        alt="69"
        width={500}
        height={500}
        style={{ transform: `rotate(${rotationAngle}deg)` }}
      />
      <span
        className="mx-10 mt-8 mb-8 text-center cursor-pointer"
        onClick={() => setHelpModalOpen(true)}>
        Type /help to get commands and hints
      </span>
      <div className="flex gap-1">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
          placeholder="Enter command..."
        />
        <button onClick={handleCommandSubmit}>
          <Image
            src="/runcode.png"
            alt="Run"
            height={35}
            width={35}
            className="p-1 bg-blue-600 rounded-sm "
          />
        </button>
      </div>
      {isHelpModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-4 bg-white dark:bg-[#080917] rounded-md overflow-y-scroll max-w-[60vw] max-h-[40vh] scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            <style
              jsx
              global>{`
              ::-webkit-scrollbar {
                width: 10px;
              }

              ::-webkit-scrollbar-track {
                background: transparent;
              }

              ::-webkit-scrollbar-thumb {
                background-color: #9ca3af; /* default thumb color */
                border-radius: 5px;
              }

              ::-webkit-scrollbar-thumb:hover {
                background-color: #9834ec; /* hover thumb color */
              }

              @media (max-width: 640px) {
                ::-webkit-scrollbar {
                  width: 6px;
                }
              }
            `}</style>
            <h2 className="mb-2 text-xl font-bold">Available Commands:</h2>
            <ul className="divide-y divide-gray-300">
              <li className="py-2">
                <span className="font-bold text-purple-600">/theme</span>{" "}
                <span className="text-blue-500">[dark|light]</span> -{" "}
                <em>Change the theme to dark or light.</em>
              </li>
              <li className="py-2">
                <span className="font-bold text-purple-600">/rotate</span> -{" "}
                <em>Rotate the image.</em>
              </li>
              <li className="py-2">
                <span className="font-bold text-purple-600">/text</span> -{" "}
                <em>Input text to the function.</em>
              </li>
              <li className="py-2">
                <span className="font-bold text-purple-600">/help</span> -{" "}
                <em>Show available commands and their descriptions.</em>
              </li>
            </ul>
            <div className="text-center">
              <button
                onClick={closeHelpModal}
                className="p-2 mt-4 text-white bg-blue-500 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1;
