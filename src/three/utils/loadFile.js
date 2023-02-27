import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
export const loadFile = (scene,fileName, position, scale, rotation) => {
    loader.load(fileName, function (gltf) {
        gltf.scene.position.set(position[0], position[1], position[2]);
        gltf.scene.scale.set(scale[0], scale[1], scale[2]);
        gltf.scene.rotation.set(rotation[0], rotation[1], rotation[2]);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}