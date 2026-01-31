
const songs = [
    {
        title: "Killa Klassic",
        artist: "Naam Sujal",
        src: "Songs/kill-Klassic.mp3"
    },
    {
        title: "Don",
        artist: "99Side",
        src: "Songs/Main Hun Don.mp3"
    },
    {
        title: "Dua",
        artist: "Hardbone",
        src: "Songs/Dua.mp3"
    }
];

const albumArt = document.getElementById("album-art");


const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    updatePlaylistUI();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = "▶";
        albumArt.classList.remove("playing");
    } else {
        audio.play();
        playBtn.textContent = "⏸";
        albumArt.classList.add("playing");
    }
    isPlaying = !isPlaying;
}


function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "⏸";
    albumArt.classList.add("playing");
    isPlaying = true;
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "⏸";
    albumArt.classList.add("playing");
    isPlaying = true;
}

audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function createPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            audio.play();
            playBtn.textContent = "⏸";
            isPlaying = true;
        });
        playlistEl.appendChild(li);
    });
}

function updatePlaylistUI() {
    const items = playlistEl.querySelectorAll("li");
    items.forEach((item, index) => {
        item.classList.toggle("active", index === songIndex);
    });
}

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

createPlaylist();
loadSong(songIndex);


