
export const onIframeLoad = (acceptFullscreen) => {
    document.querySelector('#loaderCircle').style.display = 'none';
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
        acceptFullscreen.style.display = 'block';
    } else {
        acceptFullscreen.style.display = 'none';
    }
}
