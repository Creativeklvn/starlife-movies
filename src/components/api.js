export const fetchVideos = async (query, pageToken = "", API_KEY) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&pageToken=${pageToken}&key=${API_KEY}`
  );
  const data = await res.json();
  return data;
};
