var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: '9ZfN87gSjvI',
    playerVars: { 'autoplay': 1, 'controls': 0 },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.seekTo(20);
    event.target.playVideo();
    event.target.setVolume(0);
    event.target.setPlaybackQuality('highres');
    event.target.setLoop(true);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(muteVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function muteVideo() {
    player.setVolume(0);
}