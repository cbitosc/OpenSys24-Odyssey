"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level16 = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [text, setText] = useState(
    "Transform given matrix into identity matrix using elementary row operations"
  );

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const [digit1, setDigit1] = useState(2);
  const [digit2, setDigit2] = useState(3);
  const [digit3, setDigit3] = useState(1);
  const [digit4, setDigit4] = useState(1);
  const [digit5, setDigit5] = useState(2);
  const [digit6, setDigit6] = useState(0);
  const [digit7, setDigit7] = useState(3);
  const [digit8, setDigit8] = useState(1);
  const [digit9, setDigit9] = useState(2);

  const isLevelComplete = () => {
    return (
      digit1 === 1 &&
      digit2 === 0 &&
      digit3 === 0 &&
      digit4 === 0 &&
      digit5 === 1 &&
      digit6 === 0 &&
      digit7 === 0 &&
      digit8 === 0 &&
      digit9 === 1
    );
  };

  useEffect(() => {
    if (isLevelComplete()) {
      setText("Success!");
      setTimeout(() => {
        onComplete(11);
      }, 2000);
    }
  }, [
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    digit6,
    digit7,
    digit8,
    digit9,
    onComplete,
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

    const match = inputValue.match(/^\/(invert|help|multiply|divide|add)\s*(.*)$/);

    if (match) {
      const [, operation, parameters] = match;

      switch (operation) {
        case "help":
          setHelpModalOpen(true);
          break;
        case "multiply":
          const multiplyMatch = parameters.match(/^(row|col)([1-3])\s+(\S+)$/);
          if (multiplyMatch) {
            const [, type, number, factor] = multiplyMatch;
            const updatedMatrix = [
              digit1,
              digit2,
              digit3,
              digit4,
              digit5,
              digit6,
              digit7,
              digit8,
              digit9,
            ];
            if (type === "row") {
              const startIndex = (number - 1) * 3;
              const endIndex = startIndex + 3;
              for (let i = startIndex; i < endIndex; i++) {
                updatedMatrix[i] *= parseFloat(factor);
              }
            } else if (type === "col") {
              const colNumber = parseInt(number);
              for (let i = colNumber - 1; i < 9; i += 3) {
                updatedMatrix[i] *= parseFloat(factor);
              }
            }
            setDigit1(updatedMatrix[0]);
            setDigit2(updatedMatrix[1]);
            setDigit3(updatedMatrix[2]);
            setDigit4(updatedMatrix[3]);
            setDigit5(updatedMatrix[4]);
            setDigit6(updatedMatrix[5]);
            setDigit7(updatedMatrix[6]);
            setDigit8(updatedMatrix[7]);
            setDigit9(updatedMatrix[8]);
            setInputValue("");
          }
          break;
          case "divide":
            const divideMatch = parameters.match(/^(row|col)([1-3])\s+(\S+)$/);
            if (divideMatch) {
              const [, type, number, factor] = divideMatch;
              const updatedMatrix = [
                digit1,
                digit2,
                digit3,
                digit4,
                digit5,
                digit6,
                digit7,
                digit8,
                digit9,
              ];
              if (type === "row") {
                const startIndex = (number - 1) * 3;
                const endIndex = startIndex + 3;
                for (let i = startIndex; i < endIndex; i++) {
                  updatedMatrix[i] /= parseFloat(factor);
                }
              } else if (type === "col") {
                const colNumber = parseInt(number);
                for (let i = colNumber - 1; i < 9; i += 3) {
                  updatedMatrix[i] /= parseFloat(factor);
                }
              }
              setDigit1(updatedMatrix[0]);
              setDigit2(updatedMatrix[1]);
              setDigit3(updatedMatrix[2]);
              setDigit4(updatedMatrix[3]);
              setDigit5(updatedMatrix[4]);
              setDigit6(updatedMatrix[5]);
              setDigit7(updatedMatrix[6]);
              setDigit8(updatedMatrix[7]);
              setDigit9(updatedMatrix[8]);
              setInputValue("");
            }
            break;
        case "add":
          const addMatch = parameters.match(
            // /^(row|col)\s+(\d+)\*(\d+)\s+(\d+)\*(\d+)$/
            /^(row|col)\s+(\S+)\*(\d+)\s+to\s+(\S+)\*(\d+)$/
          );
          if (addMatch) {
            const [, type, factor1, source1, factor2, source2] = addMatch;
            const updatedMatrix = [
              digit1,
              digit2,
              digit3,
              digit4,
              digit5,
              digit6,
              digit7,
              digit8,
              digit9,
            ];
            if (type === "row") {
              const source1Index = (source1 - 1) * 3;
              const source2Index = (source2 - 1) * 3;
              const temp = [0, 0, 0];
              for (let i = 0; i < 3; i++) {
                temp[i] +=
                  parseFloat(factor1) * updatedMatrix[source1Index + i];
                temp[i] +=
                  parseFloat(factor2) * updatedMatrix[source2Index + i];
              }
              console.log(temp);
              for (let i = 0; i < 3; i++) {
                updatedMatrix[i + source2Index] = temp[i];
              }
            }
            if (type === "col") {
              const source1Index = source1 - 1;
              const source2Index = source2 - 1;
              const temp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (let i = 0; i < 9; i += 3) {
                temp[i] +=
                  parseFloat(factor1) * updatedMatrix[i + source1Index];
                temp[i] +=
                  parseFloat(factor2) * updatedMatrix[i + source2Index];
              }
              for (let i = 0; i < 9; i += 3) {
                updatedMatrix[i + source2Index] = temp[i];
              }
            }

            setDigit1(updatedMatrix[0]);
            setDigit2(updatedMatrix[1]);
            setDigit3(updatedMatrix[2]);
            setDigit4(updatedMatrix[3]);
            setDigit5(updatedMatrix[4]);
            setDigit6(updatedMatrix[5]);
            setDigit7(updatedMatrix[6]);
            setDigit8(updatedMatrix[7]);
            setDigit9(updatedMatrix[8]);
            setInputValue("");
          }
          break;
        default:
          break;
      }
    } else if (matchTheme) {
      const theme = matchTheme[1];
      setTheme(theme);
      setInputValue("");
    }
  };

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleCommandSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center mt-4 ">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 16
      </h1>
      <p className="mx-10 mt-8 font-semibold text ">{text}</p>
      <div className="flex flex-col items-center px-3 py-2 my-5 text-xl border-2 border-gray-900 rounded-sm">
        <div className="flex">
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit1}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit2}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit3}
          </div>
        </div>
        <div className="flex">
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit4}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit5}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit6}
          </div>
        </div>
        <div className="flex">
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit7}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit8}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit9}
          </div>
        </div>
      </div>

      <span
        className="mx-10 mt-8 mb-8 text-center cursor-pointer"
        onClick={() => setHelpModalOpen(true)}>
        Type /help to get commands and hints</span>

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
      <style jsx global>{`
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
          <span className="font-bold text-purple-600">/multiply</span> <span className="text-blue-500">[row|col][1-3] [number]</span> - <em>Multiply a specified row or column by a number.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/divide</span> <span className="text-blue-500">[row|col][1-3] [number]</span> - <em>Divide a specified row or column by a number.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/add</span> <span className="text-blue-500">[row|col] [multiplication factor]*[row/col number] to [multiplication factor]*[row/col number]</span> - <em>Adds the specified multiplication factor of one row or column to another row or column.</em><span className="font-bold text-purple-600"><br/>Example:</span> <code>/add row 2*1 to 3*2</code> (adds 2 times of row 1 to 3 times of row 2).
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/start</span> <span className="text-blue-500">[left|right]</span> - <em>Start animation.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/stop</span> <span className="text-blue-500">[left|right]</span> - <em>Stop animation.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/flipdigit</span> <span className="text-blue-500">[position]</span> - <em>Flip the digit at the specified position.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/shiftleft</span> <span className="text-blue-500">[amount]</span> - <em>Shift the image to the left by the specified amount.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/shiftright</span> <span className="text-blue-500">[amount]</span> - <em>Shift the image to the right by the specified amount.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/move</span> <span className="text-blue-500">[amount]</span> - <em>Move the component on the linear plane by a specified amount.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/invert</span> - <em>Invert the image.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/theme</span> <span className="text-blue-500">[dark|light]</span> - <em>Change the theme to dark or light.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/rotate</span> - <em>Rotate the image.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/text</span> - <em>Input text to the function.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/help</span> - <em>Show available commands and their descriptions.</em>
        </li>
      </ul>
      <div className="text-center">
        <button
          onClick={closeHelpModal}
          className="p-2 mt-4 text-white bg-blue-500 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Level16;
