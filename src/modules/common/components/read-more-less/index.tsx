import React from "react";
import useToggleState from "@lib/hooks/use-toggle-state";

interface ExpandableTextProps {
  text: string;
  maxLength?: number; 
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 150 }) => {
  const [isExpanded, open, close, toggle] = useToggleState(false);

  if (text.length <= maxLength) {
    return <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">{text}</p>;
  }

  return (
    <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <button onClick={toggle} className="text-orange-600 ml-2 text-sm underline">
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </p>
  );
};

export default ExpandableText;
