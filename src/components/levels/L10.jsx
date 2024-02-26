"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import Image from "next/image";
import { toast, useToast } from "@/components/ui/use-toast";

const Level10 = ({ onComplete }) => {
  const [towers, setTowers] = useState({
    1: [3, 2, 1],
    2: [],
    3: [],
  });

  const [text, setText] = useState("Shift the discs from Tower 1 to Tower 3.");
  const [inputValue, setInputValue] = useState("");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const { setTheme } = useTheme();

  const moveDisc = (source, destination) => {
    const sourceTower = towers[source];
    const destinationTower = towers[destination];

    if (sourceTower.length === 0) {
      toast({
        description: "Source tower is empty. Try again.",
      });
    } else if (
      destinationTower.length === 0 ||
      sourceTower[sourceTower.length - 1] <
        destinationTower[destinationTower.length - 1]
    ) {
      destinationTower.push(sourceTower.pop());
      console.log(towers);
    } else {
      toast({
        description:
          "Invalid move. Larger disc cannot be placed on a smaller one. Try again.",
      });
    }
  };

  useEffect(() => {
    // Check for completion condition and call onComplete if needed
    const isCompleted =
      towers[3].length === 3 &&
      towers[3][0] === 3 &&
      towers[3][1] === 2 &&
      towers[3][2] === 1;

    if (isCompleted) {
      setText("Success!");
      setTimeout(() => {
        onComplete(16);
      }, 2000);
    }
  }, [towers, onComplete, moveDisc]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const match = inputValue.match(/^\/shifttop (\d) to (\d)$/);

    if (match) {
      const [, source, destination] = match.map(Number);
      moveDisc(source, destination);
      setInputValue("");
    } else if (inputValue === "/help") {
      setHelpModalOpen(true);
    } else if (inputValue.startsWith("/theme ")) {
      const theme = inputValue.split(" ")[1];
      setTheme(theme);
      setInputValue("");
    } else {
      toast({
        description:
          "Invalid command. Use /help to see available commands. Try again.",
      });
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
    <div className="flex flex-col items-center mt-4">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 10
      </h1>
      <p className="mx-10 my-8 text-xl font-semibold ">{text}</p>

      <div className="flex justify-between mt-4 w-80 md:w-96">
        {Object.keys(towers).map((tower) => (
          <div
            key={tower}
            className="flex flex-col items-center">
            <div className="flex flex-col-reverse items-center justify-start h-20">
              {towers[tower].map((disc) => (
                <div
                  key={disc}
                  className={`bg-blue-500 h-4 ${
                    disc === 1 ? "w-8" : disc === 2 ? "w-12" : "w-16"
                  }
                   rounded-md m-1  text-center`}></div>
              ))}
            </div>
            <p>Tower {tower}</p>
          </div>
        ))}
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
          <span className="font-bold text-purple-600">/shifttop</span> <span className="text-blue-500">[source] to [destination] </span> - <em>Change positions of components from one pole to another.</em>
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
          <span className="font-bold text-purple-600">/zoom</span> <span className="text-blue-500">[in|out]</span> - <em>Zoom in/out on a component.</em>
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

export default Level10;
