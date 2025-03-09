
export interface Channel {
  name: string;
  logo: string;
  url: string;
}

export const parseM3U = (data: string): Channel[] => {
  const lines = data.split('\n');
  const channels: Channel[] = [];
  let channel: Partial<Channel> = {};

  lines.forEach(line => {
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.split(',');
      const name = nameMatch.length > 1 ? nameMatch[1] : 'Unknown Channel';
      
      const logoMatch = line.match(/tvg-logo="(.+?)"/);
      const logo = logoMatch ? logoMatch[1] : 'https://via.placeholder.com/100?text=No+Logo';
      
      channel = { name, logo };
    } else if (line.startsWith('http')) {
      channel.url = line.trim();
      if (channel.name && channel.url) {
        channels.push(channel as Channel);
      }
      channel = {};
    }
  });

  return channels;
};

export const fetchM3UChannels = async (url: string): Promise<Channel[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }
    const data = await response.text();
    return parseM3U(data);
  } catch (error) {
    console.error('Error fetching the playlist:', error);
    return [];
  }
};
