const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const songs=[
    {
        name:'fightBack',
        displayName:'Fight Back',
        artistName:'NEFFEX',
    },
    {
        name:'onAndOn',
        displayName:'On & On',
        artistName:'Cartoon',
    },
    {
        name:'orochi',
        displayName:'Japanese Type Beat',
        artistName:'Soulker',
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
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artistName;
    music.src=`songs/${song.name}.mp3`;
    image.src=`images/${song.name}.jpg`;
}

// current song
let songIndex=0;

// // Next Song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// // Prev Song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);