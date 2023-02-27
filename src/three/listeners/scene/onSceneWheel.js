let WINDOW_BLURRED = false;
window.addEventListener('blur', () => {
    WINDOW_BLURRED = true;
});
window.addEventListener('click', () => {
    WINDOW_BLURRED = false;
});
export const onSceneWheel = (event, IS_ANIMATING, zoomCallback) => {
    if (IS_ANIMATING) return;
    if (event.deltaY > 0) {
        // Exit fullscreen
        zoomCallback(false);
    } else {
        // Check if blured
        if (WINDOW_BLURRED) return;
        zoomCallback(true);
    }
};
