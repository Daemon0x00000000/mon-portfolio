import {Quaternion, Vector3} from "three";

export const lookAtSmooth = (camera, target, duration) => {
    const startPosition = new Vector3().copy(camera.position);
    const startRotation = new Quaternion().copy(camera.quaternion);

    const targetPosition = new Vector3().copy(target.position);
    const targetRotation = new Quaternion().copy(target.quaternion);

    const startTime = performance.now();

    function animate() {
        const time = performance.now() - startTime;
        const t = Math.min(time / duration, 1);

        camera.position.lerpVectors(startPosition, targetPosition, t);
        camera.quaternion.slerpQuaternions(startRotation, targetRotation, t);

        if (t < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}
