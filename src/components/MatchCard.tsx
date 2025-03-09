
import { useState } from 'react';

interface MatchCardProps {
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  streamOptions: {
    name: string;
    url: string;
    type: 'clappr' | 'iframe';
  }[];
  onStreamSelect: (url: string, type: 'clappr' | 'iframe') => void;
  expanded: boolean;
  onToggleExpand: () => void;
}

const MatchCard = ({ 
  homeTeam, 
  awayTeam, 
  streamOptions, 
  onStreamSelect, 
  expanded, 
  onToggleExpand 
}: MatchCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    const option = streamOptions[index];
    onStreamSelect(option.url, option.type);
  };

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden mb-4">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center">
          <img 
            src={homeTeam.logo} 
            alt={homeTeam.name} 
            className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-md"
          />
          <span className="font-display text-lg mx-2">{homeTeam.name}</span>
        </div>
        
        <span className="font-display text-xl px-3">VS</span>
        
        <div className="flex items-center">
          <span className="font-display text-lg mx-2">{awayTeam.name}</span>
          <img 
            src={awayTeam.logo} 
            alt={awayTeam.name} 
            className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-md"
          />
        </div>
      </div>
      
      {expanded && streamOptions.length > 0 && (
        <div className="bg-secondary/50 p-3 flex flex-wrap gap-2">
          {streamOptions.map((option, index) => (
            <button
              key={index}
              className={`link-option ${selectedOption === index ? 'link-option-active' : ''}`}
              onClick={() => handleOptionClick(index)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchCard;
