(async function () {
  console.log("PortableAI Loader gestartet.");

  // 1. config.json laden
  const config = await fetch("universe/config.json").then(r => r.json());
  window.__PAI_UPDATES__ = window.__PAI_UPDATES__ || [];

  let index = 0;
  const total = config.scenes.length;

  // 2. Jede Szene laden
  for (const name of config.scenes) {
    const folder = `universe/scenes/${name}/`;
    const sceneConfig = await fetch(folder + "scene.json").then(r => r.json());

    console.log("Lade Szene:", name, sceneConfig);

    try {
      switch (sceneConfig.type) {

        case "3d": {
          const mod = await import(`./scenes/${name}/${sceneConfig.entry}`);
          const inst = mod.create(window.__PAI_SCENE__, window.THREE);

          // Auto‑Positionierung
          const angle = (index / total) * Math.PI * 2;
          const radius = 25;
          inst.root.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          );

          window.__PAI_UPDATES__.push(inst.update);
          break;
        }

        case "particles": {
          const mod = await import(`./scenes/${name}/${sceneConfig.entry}`);
          const inst = mod.create(window.__PAI_SCENE__, window.THREE);
          window.__PAI_UPDATES__.push(inst.update);
          break;
        }

        case "cluster": {
          const mod = await import(`./scenes/${name}/${sceneConfig.entry}`);
          const inst = mod.create(window.__PAI_SCENE__, window.THREE);
          window.__PAI_UPDATES__.push(inst.update);
          break;
        }

        case "shader":
          console.warn("Shader‑Loader noch nicht implementiert.");
          break;

        case "portal":
          console.warn("Portal‑Loader noch nicht implementiert.");
          break;
      }
    } catch (err) {
      console.error("Fehler beim Laden der Szene:", name, err);
    }

    index++;
  }

  // 3. Animation starten
  function animate() {
    requestAnimationFrame(animate);
    for (const update of window.__PAI_UPDATES__) update();
  }

  animate();
})();
