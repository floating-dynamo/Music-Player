let playSong = document.querySelector(".song-play");
let songImg = document.querySelector(".song-img");
let songName = document.querySelector(".song-name");
let songNum = document.querySelector(".song-num");
let artistName = document.querySelector(".song-artist");
let soundIcon = document.querySelector(".volume-bar .fa-volume-up");
let myAudio = document.querySelector(".audioTag");
let volumeBar = document.querySelector(".volume-bar .volume")
let volumeNum = document.querySelector(".volume-bar .volume-num")
let durationofSong = document.querySelector(".song-duration-bar")
let mute = false;
let songPlaying = false;
var index = 0;
var timer = 0;
let track = document.createElement('audio');
var songList = [
  {
    name: "Castle On The Hill",
    audioPath: "songs/CastleOnTheHill.mp3",
    img: 'images/img1.jpg',
    artist: "Ed Sheeran",
  },
  {
    name: "When Im Gone",
    audioPath: "songs/WhenImGone.mp3",
    img: "images/img2.jpg",
    artist: "Eminem",
  },
  {
    name: "Khairiyat",
    audioPath: "songs/Khairiyat.mp3",
    img: "images/img3.jpg",
    artist: "Arijit Singh",
  },
  {
    name: "Rude",
    audioPath: "songs/Rude.mp3",
    img: "images/img4.jpg",
    artist: "Magic",
  },
  {
    name: "Chlorine",
    audioPath: "songs/Chlorine.mp3",
    img: "images/img5.jpg",
    artist: "Twenty One Pilots",
  },
  {
    name: "Lego House",
    audioPath: "songs/LegoHouse.mp3",
    img: "images/img6.jpg",
    artist: "Ed Sheeran",
  },
];
updateSongNum();
function LoadSong(index) {
  songName.innerHTML = "<h2>" + songList[index].name + "</h2>";
  artistName.innerHTML = "<h4>" + songList[index].artist + "</h4>";
  songImg.src = songList[index].img;
  track.src = songList[index].audioPath;
  track.load();
  timer = setInterval(rangeSlider, 1000);
}
LoadSong(index);

function checkSong() {
  //check if Song is playing
  if (songPlaying == false) {
    songPlay();
  }
  else {
    track.pause();
    songPlaying = false;
    songImg.classList.remove("run-animation");
    playSong.innerHTML = '<i class="fas fa-play"></i>';
  }

}
//Play song:
function songPlay() {
  track.play();
  songImg.classList.add("run-animation");
  playSong.innerHTML = '<i class="fas fa-pause"></i>';
  songPlaying = true;
}
//Update the song number
function updateSongNum() {
  songNum.innerHTML = "<p>" + (index + 1) + "/" + (songList.length) + "</p>";
}

//Play next song
function nextSong() {
  if (index < songList.length - 1) {
    index++;
    LoadSong(index);
    songPlay();
    updateSongNum();
  }
  else {
    index = 0;
    LoadSong(index);
    songPlay();
    updateSongNum();
  }
}
//Play prev song
function prevSong() {
  if (index > 0) {
    index--;
    LoadSong(index);
    songPlay();
    updateSongNum();
  }
  else {
    index = songList.length - 1;
    LoadSong(index);
    songPlay();
    updateSongNum();
  }

}
// To mute the song
function muteSong() {
  if (mute == false) {
    soundIcon.classList.remove("fa-volume-up");
    soundIcon.classList.add("fa-volume-mute");
    track.volume = 0;
    mute = true;
  }
  else {
    soundIcon.classList.remove("fa-volume-mute");
    soundIcon.classList.add("fa-volume-up");
    track.volume = 1;
    mute = false;
  }
}
//Volume Change
function volumeAdjust() {
  track.volume = ((volumeBar.value) / 100);
  volumeNum.innerHTML = volumeBar.value;
  if (track.volume == 0) {
    soundIcon.classList.remove("fa-volume-up");
    soundIcon.classList.add("fa-volume-mute");
  }
  else {
    soundIcon.classList.remove("fa-volume-mute");
    soundIcon.classList.add("fa-volume-up");
  }
}
if (track.currentTime > track.duration) {
  nextSong();
}

//Change duration slider
function changeDuration() {
  sliderPosition = track.duration * (durationofSong.value / 100);
  track.currentTime = sliderPosition;
}

function rangeSlider() {
  let position = 0;
  //update slider
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    durationofSong.value = position;
  }
}
