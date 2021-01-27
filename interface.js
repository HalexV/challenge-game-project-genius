function playAudio(element) {
  let audioElement = element.getElementsByTagName("audio")[0];

  audioElement.currentTime = 0;
  audioElement.play();
}
