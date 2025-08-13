import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
            {icon ? (
              <img src={icon} className="w-12 h-12 object-contain" alt="Icon" />
            ) : (
              <LuImage />
            )}
          </div>
          <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
        </div>

        {isOpen && (
          <div className="relative z-10 w-fit">
            <button
              className="absolute top-2 right-0 bg-white border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center shadow-md z-20"
              onClick={() => setIsOpen(false)}
            >
              <LuX />
            </button>

            <div className="mt-4 ml-auto">
              <EmojiPicker
                open={isOpen}
                onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || '')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerPopup;

