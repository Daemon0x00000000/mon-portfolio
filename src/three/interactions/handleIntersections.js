import {Raycaster, Vector2} from "three";

const raycaster = new Raycaster();
const mouse = new Vector2();

export const handleIntersections = (event, scene, camera, highlightedObject, setHighlightedObject, shaderMaterial, itemActions) => {
    // Mettre à jour les coordonnées de la souris
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Lancer un rayon à partir de la position de la souris
    raycaster.setFromCamera(mouse, camera);

    // Vérifier si le rayon intersecte l'objet
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && itemActions[intersects[0].object.name]) {

        // Surligner l'objet intersecté
        const intersectedObject = intersects[0].object;
        if (intersectedObject !== highlightedObject) {
            if (highlightedObject) {
                highlightedObject.material = highlightedObject.userData.originalMaterial;
            }
            highlightedObject = intersectedObject;
            highlightedObject.userData.originalMaterial = highlightedObject.material;
            highlightedObject.material = shaderMaterial;
            setHighlightedObject(highlightedObject)
            shaderMaterial.startPulsating();
            document.body.style.cursor = 'pointer';
        }
    } else {

        // Remettre l'objet surligné à son état normal
        if (highlightedObject) {
            highlightedObject.material = highlightedObject.userData.originalMaterial;
            setHighlightedObject(null)

            document.body.style.cursor = 'default';
        }
    }
}
