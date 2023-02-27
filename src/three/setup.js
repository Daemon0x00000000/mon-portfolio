

import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PointLight,
} from 'three';
import {CSS3DObject, CSS3DRenderer} from "three/addons/renderers/CSS3DRenderer.js";
import { onDocumentFullscreenChange} from "./listeners/dom/onDocumentFullscreenChange.js";
import { onSceneMouseMove} from "./listeners/scene/onSceneMouseMove.js";
import { onSceneMouseDown } from "./listeners/scene/onSceneMouseDown.js";
import {onSceneMouseUp} from "./listeners/scene/onSceneMouseUp.js";
import {onSceneWheel} from "./listeners/scene/onSceneWheel.js";
import {onWindowResize} from "./listeners/window/onWindowResize.js";
import {onIframeLoad} from "./listeners/dom/onIframeLoad.js";
import {loadFile} from "./utils/loadFile.js";
import GlowShaderMaterial from "./shaders/GlowShaderMaterial.js";
import {handleIntersections} from "./interactions/handleIntersections.js";
import {zoomOnObject} from "./camera/zoomOnObject.js";
export default class MyPortfolio {
    constructor() {
        this.IS_ANIMATING = false;
        this.app = document.getElementById('app');
        this.initWebGlRenderer();
        this.initCSS3DRenderer();
        this.initScene();
        this.loadFiles();
        this.initScreen();
        this.itemActions = {
            'mouse_mouse_0': () => {
                if (this.IS_ANIMATING) {
                    return;
                }
                zoomOnObject(this.camera, this.pObject, 0.1122, this.iframe,this.setIS_ANIMATING.bind(this));
            },
            'Material2027': (highlightedObject) => {
                if (this.IS_ANIMATING) {
                    return;
                }
                this.setIS_ANIMATING(true);
                let targetPosition;
                if (highlightedObject.parent.position.y >= 0) {
                    targetPosition = -10;
                } else {
                    targetPosition = 0;
                }

// Calculez la direction de déplacement du tiroir
                const stepDirection = highlightedObject.parent.position.y < targetPosition ? 0.2 : -0.2;

// Démarrez l'animation
                const animate = () => {
                    highlightedObject.parent.position.y += stepDirection;
                    if ((stepDirection > 0 && highlightedObject.parent.position.y >= targetPosition) || (stepDirection < 0 && highlightedObject.parent.position.y <= targetPosition)) {
                        this.setIS_ANIMATING(false);
                    } else {
                        requestAnimationFrame(animate);
                    }
                }
                requestAnimationFrame(animate);
            }
        };
        this.glowMaterial = new GlowShaderMaterial(this.camera.position)
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.initListeners();
        this.camera.lookAt(this.pObject.position);
        this.animate();




    }

    initWebGlRenderer(antialias=true) {
        this.renderer = new WebGLRenderer({ antialias: antialias });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.app.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x000000, 1);
    }

    initCSS3DRenderer() {
        this.DRenderer = new CSS3DRenderer();
        this.DRenderer.setSize(window.innerWidth, window.innerHeight);
        this.DRenderer.domElement.style.position = 'absolute';
        this.DRenderer.domElement.style.top = '0px';
        this.DRenderer.domElement.style.width = '100%';
        this.app.appendChild(this.DRenderer.domElement);
    }

    initScene(){
        this.scene = new Scene();
        // Camera
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0.049, 1.187, 0.6);
        this.camera.rotation.set(0, 0, 0);
        // Pointlight
        this.pointLight = new PointLight(0xffffff, 1.5);
        this.pointLight.position.set(0, 2.8, 1.5);
        this.scene.add(this.pointLight);
    }

    initScreen() {
        const div = document.createElement('div');
        div.innerHTML = `<iframe width='1916px' height='966px' src="portfolio.html" frameborder="0" allowfullscreen></iframe>`;
        this.iframe = div.querySelector('iframe');
        this.pObject = new CSS3DObject(div);
        this.pObject.position.set(0.0494, 1.176, 0.4);
        this.pObject.scale.set(0.000178,0.000178,0.000178);
        this.scene.add(this.pObject);
    }

    initListeners() {
        this.app.addEventListener('mousemove', event => onSceneMouseMove(event, this.scene, this.highlightedObject, this.setHighlightedObject.bind(this), this.isDragging, this.IS_ANIMATING, this.camera, this.itemActions, this.glowMaterial, (event) => handleIntersections(event,this.scene,this.camera,this.highlightedObject,this.setHighlightedObject.bind(this),this.glowMaterial,this.itemActions)));
        this.app.addEventListener('mousedown', event => [this.isDragging,this.previousMousePosition] = onSceneMouseDown(event, this.isDragging, this.previousMousePosition, this.iframe, this.highlightedObject, this.itemActions, this.IS_ANIMATING)
        );
        this.app.addEventListener('mouseup', event => this.isDragging = onSceneMouseUp(event, this.isDragging, this.iframe));
        this.app.addEventListener('wheel', event => onSceneWheel(event,this.IS_ANIMATING, (zoom) => zoomOnObject(this.camera, this.pObject, 0.1122, this.iframe, this.setIS_ANIMATING.bind(this), zoom)));
        window.addEventListener('resize', () => onWindowResize(this.renderer, this.DRenderer, this.camera));
        document.getElementById('acceptFullScreen').querySelector('p').addEventListener('click', () => {
            document.getElementById('loader').style.display = 'none';
            zoomOnObject(this.camera, this.pObject, 0.1122, this.iframe, this.setIS_ANIMATING.bind(this));
        });
        this.acceptFullscreen = document.querySelector('#acceptFullScreen');
        this.iframe.addEventListener("load", () => onIframeLoad(this.acceptFullscreen));

        document.addEventListener('fullscreenchange', () => onDocumentFullscreenChange((zoom) => zoomOnObject(this.camera, this.pObject, 0.1122, this.iframe, this.setIS_ANIMATING.bind(this), zoom)));

    }

    loadFiles(){
        loadFile(this.scene,'src/three/models/bedroom.glb', [-0.2, 1.432, 1.255], [0.4, 0.4, 0.4], [0, 1.56, 0]);
        loadFile(this.scene,'src/three/models/desk.glb', [-0.75, 0.75, 0.5], [0.01, 0.01, 0.01], [0, 0, 0]);
        loadFile(this.scene,'src/three/models/monitor.glb', [0.05, 1.176, 0.4], [0.035, 0.035, 0.035], [0, 0, 0]);
        loadFile(this.scene,'src/three/models/keyboard.glb', [-0.15, 1.038, 0.515], [0.016, 0.016, 0.016], [0, 0, 0]);
        loadFile(this.scene,'src/three/models/mouse.glb', [0.25, 1.04, 0.44], [0.06, 0.06, 0.06], [0, 0, 0]);
    }

    setHighlightedObject(object) {
        this.highlightedObject = object;
    }

    setIS_ANIMATING(bool) {
        this.IS_ANIMATING = bool;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.DRenderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera);
    }


}
