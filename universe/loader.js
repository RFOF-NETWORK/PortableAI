(async function () {
  console.log("PortableAI Loader gestartet.");

  // 1. config.json laden
  let config;
  try {
    config = await fetch("universe/config.json").then(r => r.json());
  } catch (e) {
    console.error("config.json fehlt oder ist kaputt – Universe startet trotzdem.");
    config = { scenes: [] };
  }

  window.__PAI_UPDATES__ = window.__PAI_UPDATES__ || [];

  let index = 0;
  const total = config.scenes.length || 1;

  // Hilfsfunktionen
  const dummyCreate = () => ({
    root: new THREE.Group(),
    update: () => {}
  });

  const safeImport = async (path) => {
    try {
      return await import(path);
    } catch (e) {
      console.warn("Import fehlgeschlagen, ersetze durch Dummy:", path);
      return { create: dummyCreate };
    }
  };

  const safeScene = (inst) => {
    if (!inst) inst = {};
    if (!inst.root) inst.root = new THREE.Group();
    if (!inst.update) inst.update = () => {};
    return inst;
  };

  // 2. Jede Szene laden
  for (const name of config.scenes) {
    const folder = `universe/scenes/${name}/`;
    let sceneConfig;

    try {
      sceneConfig = await fetch(folder + "scene.json").then(r => r.json());
    } catch (e) {
      console.warn("scene.json fehlt – ersetze durch Dummy:", name);
      sceneConfig = { type: "3d", entry: "scene.js" };
    }

    console.log("Lade Szene:", name, sceneConfig);

    try {
      let inst;

      switch (sceneConfig.type) {

        case "3d": {
          const mod = await safeImport(`./scenes/${name}/${sceneConfig.entry}`);
          inst = safeScene(mod.create(window.__PAI_SCENE__, window.THREE));
          break;
        }

        case "particles": {
          const mod = await safeImport(`./scenes/${name}/${sceneConfig.entry}`);
          inst = safeScene(mod.create(window.__PAI_SCENE__, window.THREE));
          break;
        }

        case "cluster": {
          const mod = await safeImport(`./scenes/${name}/${sceneConfig.entry}`);
          inst = safeScene(mod.create(window.__PAI_SCENE__, window.THREE));
          break;
        }

        case "shader": {
          const shaderPath = sceneConfig.entry || "core.js";
          const mod = await safeImport(`./scenes/${name}/${shaderPath}`);
          inst = safeScene(mod.create(window.__PAI_SCENE__, window.THREE));
          break;
        }

        case "portal": {
          const mod = await safeImport(`./scenes/${name}/${sceneConfig.entry}`);
          inst = safeScene(mod.create(window.__PAI_SCENE__, window.THREE));
          break;
        }

        default:
          console.warn("Unbekannter Szenentyp – Dummy wird verwendet:", sceneConfig.type);
          inst = dummyCreate();
      }

      // Auto‑Positionierung
      const angle = (index / total) * Math.PI * 2;
      const radius = 25;

      inst.root.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );

      window.__PAI_SCENE__.add(inst.root);
      window.__PAI_UPDATES__.push(inst.update);

    } catch (err) {
      console.error("Fehler beim Laden der Szene:", name, err);
    }

    index++;
  }

  // 3. Animation starten
  function animate() {
    requestAnimationFrame(animate);
    for (const update of window.__PAI_UPDATES__) {
      try { update(); } catch (e) { /* Fehler ignorieren */ }
    }
  }

  animate();
})();
