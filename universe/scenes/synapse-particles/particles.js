export function create(scene, THREE) {
  const count = 800;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = (Math.random() - 0.5) * 40;
    positions[i3 + 1] = (Math.random() - 0.5) * 40;
    positions[i3 + 2] = (Math.random() - 0.5) * 40 - 20;
    speeds[i] = 0.01 + Math.random() * 0.03;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x66ccff,
    size: 0.15,
    transparent: true,
    opacity: 0.9
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  return {
    update() {
      const pos = geo.getAttribute("position");
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos.array[i3 + 1] += speeds[i];
        if (pos.array[i3 + 1] > 20) {
          pos.array[i3 + 1] = -20;
        }
      }
      pos.needsUpdate = true;
    }
  };
}
