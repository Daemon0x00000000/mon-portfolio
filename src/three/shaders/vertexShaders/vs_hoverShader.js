export const vs_hoverShader = 'uniform vec3 viewVector;\n' +
    'uniform float c;\n' +
    'uniform float p;\n' +
    'varying float intensity;\n' +
    'void main() \n' +
    '{\n' +
    '    vec3 vNormal = normalize( normalMatrix * normal );\n' +
    '\tvec3 vNormel = normalize( normalMatrix * viewVector );\n' +
    '\tintensity = pow( c - dot(vNormal, vNormel), p );\n' +
    '\t\n' +
    '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
    '}';
