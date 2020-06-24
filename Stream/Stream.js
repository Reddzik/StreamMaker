class Stream {
  constructor() {
    this.searchInput = document.querySelector(".search");
    this.streamDiv = document.querySelector("#twitch-embed");
    document
      .querySelector(".stream-btn")
      .addEventListener("click", this.getStreamHandle.bind(this));
    document
      .querySelector(".stream-btn--off")
      .addEventListener("click", this.turnOffStream.bind(this));

    this.streamWidth = 854;
    this.streamHeight = 480;
    this.streamLayout = "video";
    this.streamAutoplay = true;

    this.APIKEY = "78tolasgvyg393501ecgi1ftql942c";
    this.headerAcceptValue = "application/vnd.twitchtv.v5+json";
    this.options = {
      method: "GET",
      headers: {
        "Client-ID": `${this.APIKEY}`,
        Accept: `${this.headerAcceptValue}`,
      },
    };
  }

  turnOffStream() {
    this.streamDiv.innerHTML = "";
  }

  getStreamHandle() {
    if (this.streamDiv.childNodes.length != 0) this.streamDiv.innerHTML = "";
    this.getStreamFromAPI();
  }

  getStreamFromAPI() {
    const queryURI = this.prepareQueryURI();
    fetch(queryURI, this.options)
      .then((res) =>
        res.status != 200 ? console.log(`Błąd, ${res.status}`) : res.json()
      )
      .then((data) => {
        const channelName = this.getStreamerNameFrom(data);
        this.makeStream(channelName);
      })
      .catch((err) => console.log(err));
  }

  prepareQueryURI() {
    const query = `${this.searchInput.value}`;
    const encodedQuery = encodeURIComponent(query);
    return `https://api.twitch.tv/kraken/search/streams?query=${encodedQuery}&limit=1`;
  }

  getStreamerNameFrom(data) {
    return data.streams[0].channel.name;
  }

  makeStream(
    name,
    width = this.streamWidth,
    height = this.streamHeight,
    layout = this.streamLayout,
    autoplay = this.streamAutoplay
  ) {
    new Twitch.Embed("twitch-embed", {
      width,
      height,
      channel: name,
      layout,
      autoplay,
      parent: ["embed.example.com", "othersite.example.com"],
    });
  }
}

new Stream();
