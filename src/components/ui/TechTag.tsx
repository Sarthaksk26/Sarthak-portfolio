import React from 'react';

interface TechTagProps {
  tag: string;
}

const TechTag: React.FC<TechTagProps> = ({ tag }) => {
  return (
    <span className="text-[10px] px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-accent font-mono tracking-tighter uppercase hover:bg-accent hover:text-white transition-all duration-300 cursor-default">
      {tag}
    </span>
  );
};

export default TechTag;
