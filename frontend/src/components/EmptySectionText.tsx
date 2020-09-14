import React from 'react';
import './EmptySectionText.css'

interface EmptySectionTextProps {
  mainText: string,
  subText: string,
  className?: string
}

const EmptySectionText: React.FC<EmptySectionTextProps> = ({mainText, subText, className=""}) => {
  return (
    <div className={`textContainer ${className}`}>
      <strong>{mainText}</strong>
      <p>{subText}</p>
    </div>
  );
}

export default EmptySectionText;
