
import React, { useEffect, useState } from 'react';

const Title = () => {
  const fullText = "  Lets Begin Our Journey";
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 300; // Typing speed in milliseconds
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;

    const type = () => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
        setTimeout(type, typingSpeed);
      } else {
        setCursorVisible(false); // Hide cursor after typing is done
      }
    };

    type();

    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Blink every 500ms

    return () => {
      clearInterval(cursorBlink); // Cleanup interval on unmount
      setDisplayedText('');
    };
  }, []);

  return (
    <div className="flex items-start justify-center pt-10">
      <h1 className="text-4xl text-white font-bold">
        {displayedText}
        {cursorVisible && <span className="text-white">|</span>} {/* Blinking cursor */}
      </h1>
    </div>
  );
}

export default Title;