
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface PlayerProps {
  source: string;
  type: 'clappr' | 'iframe';
}

declare global {
  interface Window {
    Clappr: any;
  }
}

const Player = ({ source, type }: PlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const clapprInstanceRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Player useEffect triggered with:", { source, type });
    
    // Clean up previous player instance if it exists
    if (clapprInstanceRef.current) {
      console.log("Destroying previous Clappr instance");
      clapprInstanceRef.current.destroy();
      clapprInstanceRef.current = null;
    }

    setError(null);

    if (type === 'clappr' && playerRef.current && window.Clappr) {
      try {
        console.log("Initializing new Clappr player with source:", source);
        // Initialize Clappr player with the correct selector
        clapprInstanceRef.current = new window.Clappr.Player({
          parentId: `#${playerRef.current.id}`,
          source: source,
          width: '100%',
          height: '100%',
          autoPlay: true,
        });
      } catch (err) {
        console.error("Error initializing Clappr player:", err);
        setError("Failed to load video player. Please try another stream.");
        toast({
          title: "Player Error",
          description: "Could not load the stream. Please try another source.",
          variant: "destructive",
        });
      }
    }

    return () => {
      if (clapprInstanceRef.current) {
        console.log("Cleanup: Destroying Clappr instance");
        clapprInstanceRef.current.destroy();
        clapprInstanceRef.current = null;
      }
    };
  }, [source, type]);

  return (
    <div className="player-container w-full aspect-video mb-6 overflow-hidden bg-background border border-border rounded-b-lg">
      {type === 'clappr' ? (
        <div 
          ref={playerRef} 
          id="clappr-player-container" 
          className="w-full h-full"
        >
          {error && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-destructive">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <iframe 
          src={source} 
          className="w-full h-full border-0" 
          allowFullScreen 
          title="Live Stream"
        />
      )}
    </div>
  );
};

export default Player;
