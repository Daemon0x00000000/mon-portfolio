import { ShaderMaterial, FrontSide, AdditiveBlending, Color } from 'three';
import { vs_hoverShader } from './vertexShaders/vs_hoverShader.js';
import { fs_hoverShader } from './fragmentShaders/fs_hoverShader.js';

export default class GlowShaderMaterial extends ShaderMaterial {
    constructor(position) {
        super({
            uniforms: {
                c: { type: 'f', value: 3 },
                p: { type: 'f', value: 1.5 },
                glowColor: { type: 'c', value: new Color(0xffff00) },
                viewVector: { type: 'v3', value: position },
            },
            vertexShader: vs_hoverShader,
            fragmentShader: fs_hoverShader,
            side: FrontSide,
            blending: AdditiveBlending,
            transparent: false,
        });
    }

    startPulsating() {
        let isPulsating = true;
        let startTime = null;

        const animatePulsating = (currentTime) => {
            if (!isPulsating) return;

            if (!startTime) {
                startTime = currentTime;
            }

            const timeDelta = (currentTime - startTime) / 1000;
            const frequency = 1.5;
            const amplitude = 0.3;

            this.uniforms.c.value = 1 + amplitude * Math.cos(2 * Math.PI * frequency * timeDelta);
            this.uniforms.p.value = 1 + amplitude * Math.sin(2 * Math.PI * frequency * timeDelta);
            requestAnimationFrame(animatePulsating);
        };

        animatePulsating();

        return () => {
            isPulsating = false;
        };
    }
}

