// https://codequs.com/p/SyiiRE65s/creating-a-fullscreen-html5-video-background-with-css/
const video = document.querySelector('video');
const container = document.querySelector('#container');

const setVideoDimensions = () => {
  // Video's intrinsic dimensions
  const w = video.videoWidth;
  const h = video.videoHeight;

  // Intrinsic Ratio
  // Will be more than 1 if W > H and less if W < H
  const videoRatio = (w / h).toFixed(2);

  // Get the container's computed styles
  //
  // Also calculate the min dimensions required (this will be
  // the container dimentions)
  const containerStyles = window.getComputedStyle(container);
  const minW = parseInt(containerStyles.getPropertyValue('width'), 10);
  const minH = parseInt(containerStyles.getPropertyValue('height'), 10);

  // What's the min:intrinsic dimensions
  //
  // The idea is to get which of the container dimension
  // has a higher value when compared with the equivalents
  // of the video. Imagine a 1200x700 container and
  // 1000x500 video. Then in order to find the right balance
  // and do minimum scaling, we have to find the dimension
  // with higher ratio.
  //
  // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
  // scale 500 to 700 and then calculate what should be the
  // right width. If we scale 1000 to 1200 then the height
  // will become 600 proportionately.
  const widthRatio = minW / w;
  const heightRatio = minH / h;
  let newWidth;
  let newHeight;

  // Whichever ratio is more, the scaling
  // has to be done over that dimension
  if (widthRatio > heightRatio) {
    newWidth = minW;
    newHeight = Math.ceil(newWidth / videoRatio);
  } else {
    newHeight = minH;
    newWidth = Math.ceil(newHeight * videoRatio);
  }

  video.style.width = `${newWidth}px`;
  video.style.height = `${newHeight}px`;
};

video.addEventListener('loadedmetadata', setVideoDimensions, false);
window.addEventListener('resize', setVideoDimensions, false);
