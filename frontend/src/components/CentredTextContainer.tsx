import React from 'react';
import './CentredTextContainer.css';

interface CentredTextContainerProps {
  name: string;
}

const CentredTextContainer: React.FC<CentredTextContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
    </div>
  );
};

export default CentredTextContainer;
