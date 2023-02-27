export const onSceneMouseDown = (event, isDragging, previousMousePosition, el, highlightedObject, itemActions, IS_ANIMATING) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    // Désactiver les événements de pointeur sur l'iframe
    el.style.pointerEvents = 'none';
    if (highlightedObject) {
        itemActions[highlightedObject.name](highlightedObject,IS_ANIMATING);
    }
    return [isDragging, previousMousePosition];
}
