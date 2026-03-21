export function create(scene, THREE) {
  const group = new THREE.Group();
  scene.add(group);

  const starGeo = new THREE.SphereGeometry(2, 32, 32);
  const starMat = new THREE.MeshStandardMaterial({
    emissive: 0xffaa33,
    emissiveIntensity: 2,
    color: 0x222222
  });
  const star = new THREE.Mesh(starGeo, starMat);
  group.add(star);

  const planetGeo = new THREE.SphereGeometry(0.7, 32, 32);
  const planetMat = new THREE.MeshStandardMaterial({
    color: 0x3399ff,
    metalness: 0.4,
    roughness: 0.4
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  planet.position.set(5, 0, 0);
  group.add(planet);

  const light = new THREE.PointLight(0xffaa33, 3, 50);
  light.position.set(0, 0, 0);
  group.add(light);

  group.position.set(0, 0, -35);

  return {
    update() {
      group.rotation.y += 0.004;
      planet.rotation.y += 0.02;
    }
  };
}
