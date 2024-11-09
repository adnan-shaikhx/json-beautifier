"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "tailwindcss/tailwind.css";

// Dynamically import react-json-view as it is a client-side only component
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

type Itheme = 'monokai' | 'solarized' | 'ocean' | 'rjv-default' | 'apathy';

const Home = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [formattedJson, setFormattedJson] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Itheme>("solarized");
  const [leftWidth, setLeftWidth] = useState<number>(50); // Initial width percentage for left div
  const resizerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) { // limits to prevent extreme resizing
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormattedJson(parsedJson);
      setError(null);
    } catch (err) {
      setFormattedJson(null);
      console.error(err)
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as Itheme);
  };

  return (
    <div className="h-screen bg-gray-100 flex items-start justify-center p-4">
      <div className="flex w-full h-full">
        {/* Left Column for JSON Input */}
        <div
          className="bg-white border border-gray-300 rounded shadow-sm flex flex-col"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="p-2">
            <button
              onClick={handleFormatJson}
              className="float-end px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 focus:outline-none focus:ring"
            >
              Format
            </button>
          </div>
          <textarea
            placeholder="Paste unformatted JSON here..."
            className="flex-grow p-2 resize-none focus:outline-none overflow-auto"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        {/* Resizer Divider */}
        <div
          ref={resizerRef}
          title="resizer"
          onMouseDown={handleMouseDown}
          className="cursor-col-resize bg-gray-200 w-3"
        ></div>

        {/* Right Column for Formatted JSON Output */}
        <div
          className="h-full bg-white border border-gray-300 rounded shadow-sm overflow-auto"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className="flex justify-end items-center p-2 border-b border-gray-200 sticky top-0 bg-white z-10">
            <label className="flex items-center space-x-2">
              <span className="text-gray-600">Theme:</span>
              <select
                onChange={handleThemeChange}
                value={theme}
                className="p-1 bg-gray-200 border border-gray-300 rounded focus:outline-none"
              >
                <option value="monokai">Monokai</option>
                <option value="solarized">Solarized</option>
                <option value="ocean">Ocean</option>
                <option value="rjv-default">Default</option>
                <option value="apathy">Apathy</option>
              </select>
            </label>
          </div>
          <div className="p-2">
            {formattedJson ? (
              <ReactJson
                src={formattedJson}
                theme={theme}
                iconStyle="triangle"
                enableClipboard={false}
                displayDataTypes={false}
                collapsed={2}
                name={false}
              />
            ) : (
              <p className="text-gray-500">Formatted JSON output will appear here...</p>
            )}
          </div>
          {error && <p className="text-red-500 mt-2 p-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
