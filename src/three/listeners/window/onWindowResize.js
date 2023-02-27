export const onWindowResize = (renderer, DRenderer, camera) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    DRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
