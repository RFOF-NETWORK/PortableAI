export function create(scene, THREE) {
  const geo = new THREE.TorusKnotGeometry(2, 0.6, 200, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    metalness: 0.8,
    roughness: 0.2
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, -30);
  scene.add(mesh);

  return {
    update() {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.013;
    }
  };
}
