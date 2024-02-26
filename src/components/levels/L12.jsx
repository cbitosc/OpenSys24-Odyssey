"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level12 = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [text, setText] = useState("Match the pattern 101010");

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const [digit1, setDigit1] = useState(0);
  const [digit2, setDigit2] = useState(0);
  const [digit3, setDigit3] = useState(1);
  const [digit4, setDigit4] = useState(1);
  const [digit5, setDigit5] = useState(0);
  const [digit6, setDigit6] = useState(0);

  const [flipDigitCount, setFlipDigitCount] = useState(0);
  const [shiftLeftCount, setShiftLeftCount] = useState(0);
  const [shiftRightCount, setShiftRightCount] = useState(0);
  const [invertCount, setInvertCount] = useState(0);

  const targetNumber = [1, 0, 1, 0, 1, 0];

  const isLevelComplete = () => {
    return (
      digit1 === targetNumber[0] &&
      digit2 === targetNumber[1] &&
      digit3 === targetNumber[2] &&
      digit4 === targetNumber[3] &&
      digit5 === targetNumber[4] &&
      digit6 === targetNumber[5]
    );
  };

  useEffect(() => {
    if (isLevelComplete()) {
      setText("Success!");
      setTimeout(() => {
        onComplete(4);
      }, 2000);
    }
  }, [digit1, digit2, digit3, digit4, digit5, digit6, onComplete]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const shiftDigitsLeft = (amount) => {
    if (amount == 1) {
      setDigit1(digit2);
      setDigit2(digit3);
      setDigit3(digit4);
      setDigit4(digit5);
      setDigit5(digit6);
      setDigit6(0);
    } else {
      setDigit1(digit3);
      setDigit2(digit4);
      setDigit3(digit5);
      setDigit4(digit6);
      setDigit5(0);
      setDigit6(0);
    }
  };

  const shiftDigitsRight = (amount) => {
    if (amount == 1) {
      setDigit6(digit5);
      setDigit5(digit4);
      setDigit4(digit3);
      setDigit3(digit2);
      setDigit2(digit1);
      setDigit1(0);
    } else {
      setDigit6(digit4);
      setDigit5(digit3);
      setDigit4(digit2);
      setDigit3(digit1);
      setDigit2(0);
      setDigit1(0);
    }
  };

  const invertDigits = () => {
    setDigit1((prevDigit) => (prevDigit === 0 ? 1 : 0));
    setDigit2((prevDigit) => (prevDigit === 0 ? 1 : 0));
    setDigit3((prevDigit) => (prevDigit === 0 ? 1 : 0));
    setDigit4((prevDigit) => (prevDigit === 0 ? 1 : 0));
    setDigit5((prevDigit) => (prevDigit === 0 ? 1 : 0));
    setDigit6((prevDigit) => (prevDigit === 0 ? 1 : 0));
  };

  const handleCommandSubmit = () => {
    const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

    const match = inputValue.match(
      /^\/(flipdigit|shiftleft|shiftright|invert|help)\s*(\d*)$/
    );

    if (match) {
      const [, operation, position] = match;

      switch (operation) {
        case "flipdigit":
          if (position >= 1 && position <= 6) {
            if (flipDigitCount < 2) {
              const digitState = `Digit${position}`;
              const newDigit = (prevDigit) => (prevDigit === 0 ? 1 : 0);
              eval(`set${digitState}(newDigit)`);
              setFlipDigitCount((count) => count + 1);
              setInputValue("");
            } else {
              console.log(2);
              {
                toast({
                  description: "You have run out of moves",
                });
              }
            }
          }
          break;
        case "shiftleft":
          if (position === "1" || position === "2") {
            if (shiftLeftCount < 2) {
              setShiftLeftCount((count) => count + 1);
              shiftDigitsLeft(position);
              setInputValue("");
            } else {
              toast({
                description: "You have run out of moves",
              });
            }
          }
          break;
        case "shiftright":
          if (position === "1" || position === "2") {
            if (shiftRightCount < 2) {
              setShiftRightCount((count) => count + 1);
              shiftDigitsRight(position);
              setInputValue("");
            } else {
              toast({
                description: "You have run out of moves",
              });
            }
          }
          break;
        case "invert":
          if (invertCount < 2) {
            setInvertCount((count) => count + 1);
            invertDigits();
            setInputValue("");
          }

          break;
        case "help":
          setHelpModalOpen(true);
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
        Level 12
      </h1>
      <p className="mt-8 text-xl font-semibold ">{text}</p>
      <div className="flex items-center px-3 py-2 my-5 text-xl border-2 border-gray-900 rounded-sm">
        <div className="px-1 border border-gray-900 rounded-sm h-7">
          {digit1}
        </div>
        <div className="px-1 border border-gray-900 rounded-sm h-7">
          {digit2}
        </div>
        <div className="px-1 border border-gray-900 rounded-sm h-7">
          {digit3}
        </div>
        <div className="px-1 border border-gray-900 rounded-sm h-7">
          {digit4}
        </div>
        <div className="px-1 border border-gray-900 rounded-sm h-7">
          {digit5}
        </div>
        <div className="px-1 border border-gray-900 rounded-sm h-7">
          {digit6}
        </div>
      </div>

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
                <span className="font-bold text-purple-600">/flipdigit</span>{" "}
                <span className="text-blue-500">[position]</span> -{" "}
                <em>Flip the digit at the specified position.</em>
              </li>
              <li className="py-2">
                <span className="font-bold text-purple-600">/shiftleft</span>{" "}
                <span className="text-blue-500">[amount]</span> -{" "}
                <em>Shift digit to the left by the specified amount.</em>
              </li>
              <li className="py-2">
                <span className="font-bold text-purple-600">/shiftright</span>{" "}
                <span className="text-blue-500">[amount]</span> -{" "}
                <em>Shift digit to the right by the specified amount.</em>
              </li>
              <li className="py-2">
                <span className="font-bold text-purple-600">/invert</span> -{" "}
                <em>Invert the digit.</em>
              </li>
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

export default Level12;
