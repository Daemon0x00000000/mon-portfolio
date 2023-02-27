import { Vector3 } from "three";
// import { lookAtSmooth} from "../camera/lookAtSmooth.js";

export const zoomOnObject = (camera, targetObject, offsetZ, iframe, animatingCallback, zoom = true, msDuration = 1000) => {
    animatingCallback(true);
    if (zoom) {
        const targetPosition = new Vector3(targetObject.position.x, targetObject.position.y, targetObject.position.z + offsetZ);
        const startPosition = camera.position.clone();
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / msDuration, 1);

            camera.position.lerpVectors(startPosition, targetPosition, progress);
            camera.lookAt(targetObject.position);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                camera.target = targetObject.position.clone();
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen().then(() => {
                        animatingCallback(false);
                    });
                }
            }
        };

        requestAnimationFrame(animate);
    } else {
        const targetPosition = new Vector3(0.049, 1.187, 0.6);
        const startPosition = camera.position.clone();
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / msDuration, 1);

            camera.position.lerpVectors(startPosition, targetPosition, progress);
            camera.lookAt(targetObject.position);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                camera.target = targetObject.position.clone();
                animatingCallback(false);
            }
        };

        requestAnimationFrame(animate);
    }
};
