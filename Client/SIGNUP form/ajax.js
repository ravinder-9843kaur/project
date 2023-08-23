document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchQuery = document.getElementById("searchQuery");
    const resultsDiv = document.getElementById("results");

    searchButton.addEventListener("click", () => {
        const query = searchQuery.value;
        searchAlbums(query);
    });

    function searchAlbums(query) {
        resultsDiv.innerHTML = "";

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                const response = JSON.parse(this.responseText);
                const albums = response.albums.items;

                albums.forEach(album => {
                    const albumData = album.data;

                    const albumDiv = document.createElement("div");
                    albumDiv.classList.add("album");

                    const coverArt = document.createElement("img");
                    coverArt.src = albumData.coverArt.sources[0].url;
                    coverArt.alt = albumData.name + " Cover Art";
                    albumDiv.appendChild(coverArt);

                    const albumInfoDiv = document.createElement("div");
                    albumInfoDiv.classList.add("album-info");

                    const albumName = document.createElement("h2");
                    albumName.textContent = albumData.name;
                    albumInfoDiv.appendChild(albumName);

                    const artists = document.createElement("p");
                    artists.textContent = "Artists: " + albumData.artists.items.map(artist => artist.profile.name).join(", ");
                    albumInfoDiv.appendChild(artists);

                    const releaseYear = document.createElement("p");
                    releaseYear.textContent = "Release Year: " + albumData.date.year;
                    albumInfoDiv.appendChild(releaseYear);

                    const albumDuration = document.createElement("p");
                    albumDuration.textContent = "Duration: " + getRandomDuration(); // Replace with actual duration if available
                    albumInfoDiv.appendChild(albumDuration);

                    const numberOfTracks = document.createElement("p");
                    numberOfTracks.textContent = "Number of Tracks: " + getRandomTrackCount(); // Replace with actual track count if available
                    albumInfoDiv.appendChild(numberOfTracks);

                    const albumDescription = document.createElement("p");
                    albumDescription.textContent = getArtistDescription(albumData.artists.items);
                    albumDescription.classList.add("album-description");
                    albumInfoDiv.appendChild(albumDescription);

                    const albumLink = document.createElement("a");
                    albumLink.href = albumData.uri;
                    albumLink.target = "_blank";
                    albumLink.textContent = "Listen on Spotify";
                    albumLink.classList.add("album-link");
                    albumInfoDiv.appendChild(albumLink);

                    albumDiv.appendChild(albumInfoDiv);
                    resultsDiv.appendChild(albumDiv);
                });
            }
        });

        xhr.open('GET', `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=50&numberOfTopResults=5`);
        xhr.setRequestHeader('X-RapidAPI-Key', '210e16b5c9msha94201f49a80e2cp101a33jsna5b37d148676');
        xhr.setRequestHeader('X-RapidAPI-Host', 'spotify23.p.rapidapi.com');

        xhr.send();
    }

    function getRandomDuration() {
        // Replace with actual duration calculation
        return Math.floor(Math.random() * 200) + 120 + " min";
    }

    function getRandomTrackCount() {
        // Replace with actual track count calculation
        return Math.floor(Math.random() * 10) + 5;
    }

    function getArtistDescription(artists) {
        // Combine artist names for a description
        return "Featuring " + artists.map(artist => artist.profile.name).join(", ");
    }
});