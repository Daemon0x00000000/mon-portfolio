export const onSceneMouseUp = (event, isDragging, el) => {
    isDragging = false;
    el.style.pointerEvents = 'auto';
    return isDragging;
}
