"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level11 = ({ onComplete }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [text, setText] = useState("Solve the equations");
  const [atext, setAtext] = useState(" __ ");
  const [isanimatingleft, setisanimatingleft] = useState(true);
  const [isanimatingright, setisanimatingright] = useState(true);
  const [isanimatingtop, setisanimatingtop] = useState(true);
  const leftRef = useRef();
  const rightRef = useRef();
  const topRef = useRef();

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const isAnimationStopped = (side) => {
    if (side === "left") return !isanimatingleft;
    else if (side === "right") return !isanimatingright;
    else if (side === "top") return !isanimatingtop;
    return false;
  };

  // Function to check if an element is in the specified range
  const isElementInRange = (elementRef, angleRange) => {
    if (elementRef.current) {
      const currentRotation = window.getComputedStyle(
        elementRef.current
      ).transform;
      const transformValues = currentRotation
        .split("(")[1]
        .split(")")[0]
        .split(",");
      const angle = Math.round(
        Math.atan2(transformValues[1], transformValues[0]) * (180 / Math.PI)
      );
      return angle >= angleRange[0] && angle <= angleRange[1];
    }
    return false;
  };

  useEffect(() => {
    const isLeftInRange =
      isElementInRange(leftRef, [-45, 45]) && isAnimationStopped("left");
    const isRightInRange =
      isElementInRange(rightRef, [-45, 45]) && isAnimationStopped("right");
    const isTopInRange =
      isElementInRange(topRef, [-45, 45]) && isAnimationStopped("top");

    if (isLeftInRange && isRightInRange && isTopInRange && atext === "3") {
      setText("Success!");
      setTimeout(() => {
        onComplete(8);
      }, 2000);
    }
  }, [atext, isanimatingleft, isanimatingright, isanimatingtop, onComplete]);

  const stopAnimation = (side) => {
    let currentRotation;
    const elementRef =
      side === "left" ? leftRef : side === "right" ? rightRef : topRef;

    if (elementRef.current) {
      currentRotation = window.getComputedStyle(elementRef.current).transform;
      const transformValues = currentRotation
        .split("(")[1]
        .split(")")[0]
        .split(",");
      const angle = Math.round(
        Math.atan2(transformValues[1], transformValues[0]) * (180 / Math.PI)
      );
      elementRef.current.style.transform = `rotate(${angle}deg)`;
    }

    // Remove the animation property
    if (side === "left") {
      setisanimatingleft(false);
    } else if (side === "right") {
      setisanimatingright(false);
    } else {
      setisanimatingtop(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

    const match = inputValue.match(/^\/(text|help)\s*(.*)$/);

    if (match) {
      const [, command, text] = match;

      switch (command) {
        case "rotate":
          if (!isNaN(text)) {
            setRotationAngle((prevAngle) => (prevAngle + parseInt(text)) % 360);
            setInputValue("");
          }
        case "text":
          setAtext(text.toLowerCase());

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

    const stopLeftMatch = inputValue.match(/^\/stop left$/);
    const stopRightMatch = inputValue.match(/^\/stop right$/);

    if (stopLeftMatch) {
      stopAnimation("left");
      setInputValue("");
    } else if (stopRightMatch) {
      stopAnimation("right");
      setInputValue("");
    }

    const startLeftMatch = inputValue.match(/^\/start left$/);
    const startRightMatch = inputValue.match(/^\/start right$/);

    if (startLeftMatch) {
      setisanimatingleft(true);
      setInputValue("");
    } else if (startRightMatch) {
      setisanimatingright(true);
      setInputValue("");
    }

    const stopTopMatch = inputValue.match(/^\/stop top$/);
    const startTopMatch = inputValue.match(/^\/start top$/);

    if (stopTopMatch) {
      stopAnimation("top");
      setInputValue("");
    } else if (startTopMatch) {
      setisanimatingtop(true);
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
        Level 11
      </h1>
      <p className="mx-10 mt-8 text-xl font-semibold ">{text}</p>
      <div className="flex flex-col items-center">
        <Image
          ref={topRef}
          className={`rounded-full bg-none ${
            isanimatingtop ? "animate-spin" : ""
          }`}
          src="/Ellipse2.png"
          alt="E1"
          width={100}
          height={100}
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        />
        <span>-4</span>
        <span className="rotate-90"> =</span>
        <div className="flex items-center justify-between w-80 md:w-96">
          <Image
            ref={leftRef}
            className={`rounded-full bg-none ${
              isanimatingleft ? "animate-spin" : ""
            }`}
            src="/Ellipse1.png"
            alt="E1"
            width={100}
            height={100}
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
          <span>*1.5 = </span>
          <span>{atext}</span>
          <span> = /2</span>
          <Image
            ref={rightRef}
            className={`rounded-full bg-none ${
              isanimatingright ? "animate-spin" : ""
            }`}
            src="/Ellipse3.png"
            alt="E1"
            width={100}
            height={100}
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
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
          <span className="font-bold text-purple-600">/start</span> <span className="text-blue-500">[left|right|top]</span> - <em>Start animation.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/stop</span> <span className="text-blue-500">[left|right|top]</span> - <em>Stop animation.</em>
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
        <li className="py-2">
          <span className="font-bold text-purple-600">/multiply</span> <span className="text-blue-500">[row|col][1-3] [number]</span> - <em>Multiply a specified row or column by a number.</em>
        </li>
        <li className="py-2">
          <span className="font-bold text-purple-600">/add</span> <span className="text-blue-500">[row|col] [multiplication factor]*[row/col number] to [multiplication factor]*[row/col number]</span> - <em>Adds the specified multiplication factor of one row or column to another row or column.</em><span className="font-bold text-purple-600"><br/>Example:</span> <code>/add row 2*1 to 3*2</code> (adds 2 times of row 1 to 3 times of row 2).
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

export default Level11;
