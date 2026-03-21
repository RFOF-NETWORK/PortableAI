#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;

  float r = length(uv);
  float angle = atan(uv.y, uv.x);

  float t = time * 0.25;
  float n = noise(uv * 4.0 + t);

  float ring = smoothstep(0.9, 0.3, r + n * 0.2);
  float core = smoothstep(0.3, 0.0, r - n * 0.1);

  vec3 col = vec3(0.02, 0.0, 0.05);
  col += core * vec3(0.5, 0.1, 0.9);
  col += ring * vec3(0.2, 0.0, 0.4);

  gl_FragColor = vec4(col, 1.0);
}
