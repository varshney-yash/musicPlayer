const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressBar = document.getElementById('progress-container');
const progess = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const songs = [
    {
        name: 'fightBack',
        displayName: 'Fight Back',
        artistName: 'NEFFEX',
    },
    {
        name: 'onAndOn',
        displayName: 'On & On',
        artistName: 'Cartoon',
    },
    {
        name: 'orochi',
        displayName: 'Orochi',
        artistName: 'Soulker',
    }
];

// Check is song playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play/Pause
playBtn.addEventListener('click', () => {
    (isPlaying ? pauseSong() : playSong())
});


//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artistName;
    music.src = `songs/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// // Next Song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Prev Songu
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // change bar width
        const progressPercent = (currentTime / duration) * 100;
        progess.style.width = `${progressPercent}%`;
        // calc diplay for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSecs = Math.floor(duration % 60);
        if (durationSecs < 10) {
            durationSecs = `0${durationSecs}`;
        }
        // avoid NaN
        if (durationSecs) {
            durationEl.textContent = `${durationMinutes}:${durationSecs}`;
        }
        // display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSecs = Math.floor(currentTime % 60);
        if (currentSecs < 10) {
            currentSecs = `0${currentSecs}`;
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSecs}`;
    }
}

function setProgressBar(e){
    const width=this.clientWidth;  
    const clickX=e.offsetX;
    const{duration}=music;
    music.currentTime=(clickX/width)*duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click',setProgressBar);
