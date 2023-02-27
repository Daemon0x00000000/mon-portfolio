import {Euler, MathUtils, Quaternion, Vector2} from "three";

const rotateSpeed = 0.002;
const dampingFactor = 0.5;

let targetRotation = new Vector2(0, 0);
let currentRotation = new Vector2(0, 0);
let deltaRotation = new Vector2(0, 0);

export const onSceneMouseMove = (
                                    event,
                                    scene,
                                    highlightedObject,
                                    setHighlightedObject,
                                    isDragging,
                                    IS_ANIMATING,
                                    camera,
                                    itemActions,
                                    shaderMaterial,
                                    handleCallback,
) => {
    if (isDragging && !IS_ANIMATING) {
        deltaRotation.set(
            event.movementX || event.mozMovementX || event.webkitMovementX || 0,
            event.movementY || event.mozMovementY || event.webkitMovementY || 0
        );

        // Mettre à jour la rotation cible en fonction du mouvement de la souris
        targetRotation.add(deltaRotation.multiplyScalar(rotateSpeed));

        // Atténuer la rotation pour la rendre plus lisse
        currentRotation.lerp(targetRotation, dampingFactor);

        // Limiter la rotation verticale pour éviter un retournement de la caméra
        currentRotation.y = MathUtils.clamp(
            currentRotation.y,
            -Math.PI / 2,
            Math.PI / 2
        );

        // Calculer le quaternion représentant la rotation actuelle
        const currentQuaternion = new Quaternion().setFromEuler(
            new Euler(currentRotation.y, currentRotation.x, 0, "YXZ")
        );

        // Définir la rotation de la caméra en fonction du quaternion actuel
        camera.quaternion.slerp(currentQuaternion, 0.1);

    } else {
        handleCallback(event);
    }
}

