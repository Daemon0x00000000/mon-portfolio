
export const onDocumentFullscreenChange = (zoomCallback) => {
    if (!document.fullscreenElement) {
        zoomCallback(false)
    }
}
