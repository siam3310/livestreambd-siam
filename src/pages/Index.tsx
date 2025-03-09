import { useEffect, useState, useRef } from 'react';
import Player from '../components/Player';
import MatchCard from '../components/MatchCard';
import ChannelGrid from '../components/ChannelGrid';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import { Channel, fetchM3UChannels } from '../utils/m3uParser';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStream, setCurrentStream] = useState({
    url: 'https://hotflixbd.online/willow-cricket/tracks-v1a1/mono.m3u8',
    type: 'clappr' as 'clappr' | 'iframe'
  });
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Predefined match data
  const matches = [
/*      {
      homeTeam: { 
        name: 'Bangladesh', 
        logo: 'https://seeklogo.com/images/B/bangladesh-cricket-board-logo-8B2283D781-seeklogo.com.png' 
      },
      awayTeam: { 
        name: 'Afghanistan', 
        logo: 'https://seeklogo.com/images/A/acb-afghanistan-cricket-board-logo-CF20AE82BA-seeklogo.com.png' 
      },
      streamOptions: [
        { 
          name: 'TSports', 
          url: 'https://iptvcable.netlify.app/Altogether-007/Tsports.m3u8', 
          type: 'iframe' as const
        },
        { 
          name: 'Official', 
          url: 'https://freecatv.pages.dev/gdplayer?player=plyr&provider=rand&format=video%2Fmp4&link=https://iptvcable.netlify.app/Altogether-007/Tsports.m3u8', 
          type: 'iframe' as const
        },
        { 
          name: 'HD Stream', 
          url: 'https://hotflixbd.online/willow-cricket/tracks-v1a1/mono.m3u8', 
          type: 'clappr' as const
        }
      ]
    },  */

    {
      homeTeam: { 
        name: 'India', 
        logo: 'https://seeklogo.com/images/B/board-of-control-for-cricket-in-india-logo-7F557DA7A9-seeklogo.com.png' 
      },
      awayTeam: { 
        name: 'New Zealand', 
        logo: 'https://images.seeklogo.com/logo-png/37/1/new-zealand-cricket-logo-png_seeklogo-370601.png' 
      },
      streamOptions: [
        { 
          name: 'Star Sports', 
          url: 'https://cdn.troya.one/ch235/mono.m3u8?token=rl_aadam.UdI0zA87jcz080oIulX2iKMm9dsJ-dAThz_DhR2a0u1F-Q0mb9JeyoVH24DqhaGU', 
          type: 'clappr' as const
        },
        { 
          name: 'Sony LIV', 
          url: 'https://freecatv.pages.dev/gdplayer?player=plyr&provider=rand&format=video%2Fmp4&link=https://cdn.troya.one/ch235/mono.m3u8?token=rl_aadam.UdI0zA87jcz080oIulX2iKMm9dsJ-dAThz_DhR2a0u1F-Q0mb9JeyoVH24DqhaGU', 
          type: 'iframe' as const
        }
      ]
    }


    
  ];

  useEffect(() => {
    // Load Clappr script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js';
    script.async = true;
    script.onload = () => {
      console.log("Clappr script loaded successfully");
      loadChannels();
    };
    script.onerror = () => {
      console.error("Failed to load Clappr script");
      toast({
        title: "Error",
        description: "Failed to load video player. Some features may not work correctly.",
        variant: "destructive",
      });
      loadChannels();
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const loadChannels = async () => {
    setLoading(true);
    try {
      console.log("Fetching channels from M3U playlist");
      const channelData = await fetchM3UChannels('https://raw.githubusercontent.com/siam3310/My-personal-files/refs/heads/main/playlist.m3u');
      console.log(`Fetched ${channelData.length} channels`);
      setChannels(channelData);
    } catch (error) {
      console.error('Failed to load channels:', error);
      toast({
        title: "Error",
        description: "Failed to load TV channels. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStreamSelect = (url: string, type: 'clappr' | 'iframe') => {
    console.log("Stream selected:", { url, type });
    setCurrentStream({ url, type });
    
    // Scroll to player
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChannelSelect = (url: string) => {
    console.log("Channel selected:", url);
    setCurrentStream({ url, type: 'clappr' });
    
    // Scroll to player
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleExpandedMatch = (index: number) => {
    setExpandedMatch(expandedMatch === index ? null : index);
  };

  return (
    <main className="min-h-screen flex flex-col dark:bg-background dark:text-foreground">
      <header className="bg-primary py-4 px-4 text-primary-foreground">
        <div className="container flex justify-between items-center">
          <h1 className="font-body text-2xl">
            <a href="/" className="no-underline text-primary-foreground font-display">
              LiveStreamBD
            </a>
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-grow">
        <div ref={playerRef} className="w-full bg-background">
          <div className="container py-4 px-4">
            <Player source={currentStream.url} type={currentStream.type} />
          </div>
        </div>

        <div className="container py-6 px-4">
          <div className="space-y-6 mx-auto">
            <section className="space-y-3">
              <h2 className="font-display text-xl text-center tracking-[0.3em]">LIVE MATCHES</h2>
              {matches.map((match, index) => (
                <MatchCard 
                  key={index}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  streamOptions={match.streamOptions}
                  onStreamSelect={handleStreamSelect}
                  expanded={expandedMatch === index}
                  onToggleExpand={() => toggleExpandedMatch(index)}
                />
              ))}
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl text-center tracking-[0.3em]">TV CHANNELS</h2>
              {loading ? (
                <div className="text-center py-8">Loading channels...</div>
              ) : (
                <ChannelGrid channels={channels} onChannelSelect={handleChannelSelect} />
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Index;
