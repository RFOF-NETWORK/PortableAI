export function create(scene, THREE) {
  const group = new THREE.Group();
  scene.add(group);

  const nodes = [];
  const links = [];

  const nodeGeo = new THREE.SphereGeometry(0.4, 16, 16);
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x88ccff,
    emissive: 0x224466,
    emissiveIntensity: 0.8,
    metalness: 0.6,
    roughness: 0.3
  });

  const linkMat = new THREE.LineBasicMaterial({
    color: 0x446688,
    transparent: true,
    opacity: 0.7
  });

  const nodeCount = 18;
  for (let i = 0; i < nodeCount; i++) {
    const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 6 + Math.random() * 2;
    mesh.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 4,
      Math.sin(angle) * radius - 30
    );
    group.add(mesh);
    nodes.push(mesh);
  }

  for (let i = 0; i < nodeCount; i++) {
    const j = (i + Math.floor(1 + Math.random() * 4)) % nodeCount;
    const geo = new THREE.BufferGeometry().setFromPoints([
      nodes[i].position,
      nodes[j].position
    ]);
    const line = new THREE.Line(geo, linkMat);
    group.add(line);
    links.push(line);
  }

  return {
    update() {
      group.rotation.y += 0.003;
      const t = Date.now() * 0.002;
      nodes.forEach((n, idx) => {
        n.material.emissiveIntensity = 0.6 + 0.4 * Math.sin(t + idx);
      });
    }
  };
}
