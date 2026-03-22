export function create(scene, THREE) {

  const root = new THREE.Group();
  scene.add(root);

  // Fullscreen plane
  const geometry = new THREE.PlaneGeometry(20, 20);

  // ShaderMaterial
  const material = new THREE.ShaderMaterial({
    fragmentShader: null, // wird gleich geladen
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
  });

  // Shader laden
  fetch("universe/scenes/darkmatter-core/darkmatter.glsl")
    .then(r => r.text())
    .then(code => {
      material.fragmentShader = code;
      material.needsUpdate = true;
    });

  const mesh = new THREE.Mesh(geometry, material);
  root.add(mesh);

  // Positionierung (Universe Loader setzt root.position später)
  mesh.position.set(0, 0, 0);

  return {
    root,
    update() {
      material.uniforms.time.value += 0.02;
    }
  };
}
