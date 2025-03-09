
import { useState } from 'react';
import { Channel } from '../utils/m3uParser';

interface ChannelGridProps {
  channels: Channel[];
  onChannelSelect: (url: string) => void;
}

const ChannelGrid = ({ channels, onChannelSelect }: ChannelGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredChannels = channels.filter(channel => 
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search channels..."
          className="w-full px-4 py-2 rounded-lg border border-border bg-background shadow-sm"
        />
      </div>
      
      <div className="bg-primary rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto">
          {filteredChannels.map((channel, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-3 flex flex-col items-center cursor-pointer shadow-sm"
              onClick={() => onChannelSelect(channel.url)}
            >
              <img 
                src={channel.logo} 
                alt={channel.name}
                className="w-12 h-12 object-contain mb-2 rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=TV';
                }}
              />
              <span className="text-xs text-center line-clamp-2">{channel.name}</span>
            </div>
          ))}
          
          {filteredChannels.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No channels found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelGrid;
