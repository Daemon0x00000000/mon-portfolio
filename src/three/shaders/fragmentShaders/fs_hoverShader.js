export const fs_hoverShader = 'uniform vec3 glowColor;\n' +
    'varying float intensity;\n' +
    'void main() \n' +
    '{\n' +
    '\tvec3 glow = glowColor * intensity;\n' +
    '    gl_FragColor = vec4( glow, 1.0 );\n' +
    '}';
