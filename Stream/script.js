const getSteamBtn = document.querySelector(".stream-btn");
const searchInput = document.querySelector(".search");
const APIKEY = "78tolasgvyg393501ecgi1ftql942c";
const searchURL = "https://api.twitch.tv/kraken/search/streams";
const headerAcceptValue = "application/vnd.twitchtv.v5+json";
let streamerName;

getStreamHandle = () => {
  getStreamFromAPI();
};

makeStream = (
  name = "japczan",
  width = 854,
  height = 480,
  layout = "video",
  autoplay = true
) => {
  new Twitch.Embed("twitch-embed", {
    width,
    height,
    channel: name,
    layout,
    autoplay,
    parent: ["embed.example.com", "othersite.example.com"],
  });
};

getStreamFromAPI = () => {
  const lala = searchInput.value;
  const makeQueryURL = `https://api.twitch.tv/kraken/search/streams?query=${lala}`;
  const encodedQuery = encodeURIComponent(lala);
  console.log(
    `https://api.twitch.tv/kraken/search/streams?query=${encodedQuery}`
  );
  fetch(
    `https://api.twitch.tv/kraken/search/streams?query=${encodedQuery}&limit=1`,
    {
      method: "GET",
      headers: {
        "Client-ID": `${APIKEY}`,
        Accept: `${headerAcceptValue}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      makeStream(data.streams[0].channel.name);
    })
    .catch((err) => console.log(err));
};
getStreamerNameFrom = (data) => {
  return data.streams[0].channel.name;
};
getSteamBtn.addEventListener("click", getStreamHandle);
