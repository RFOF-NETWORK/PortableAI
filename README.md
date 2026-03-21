
📘 README.md — PortableAI Neural Universe

🌌 Überblick

Dieses Repository enthält das PortableAI Neural Universe – ein monolithisches, selbst‑erweiterndes, science‑fiction‑artiges 3D‑Universum, das vollständig im Browser läuft.

Die Datei index.html ist der finale, unveränderliche Kern.  
Sie enthält:

- die unendliche 3D‑Sphäre (Universum)  
- den Validator‑Core (2D‑Herz)  
- die Portal‑ und Knotenpunkt‑Infrastruktur  
- den Universe‑Loader  

Ab jetzt wird alles Weitere automatisch geladen, ohne dass die index.html jemals wieder verändert werden muss.

---

🧠 Architektur

```
/portableai/
│
├── index.html                ← final, unveränderlich
│
└── universe/
    ├── loader.js             ← lädt automatisch alle Szenen
    ├── config.json           ← optional (für manuelle Szenensteuerung)
    └── scenes/               ← hier wächst das Universum
        ├── scene01/
        ├── scene02/
        ├── ...
```

---

🚀 Wie das System funktioniert

1. index.html rendert:

- eine 100% fullscreen 3D‑Sphäre  
- ein Validator‑Herz (pulsierende 2D‑Dark‑Matter‑Kugel)  
- ein HUD  
- und lädt universe/loader.js

2. loader.js scannt automatisch:

```
/universe/scenes/
```

Jeder Ordner dort ist eine Szene.

3. Jede Szene hat eine scene.json, die definiert:

- den Typ  
- die Logik  
- die Quelle (z. B. externe Website, Shader, 3D‑Code)

4. Der Loader erzeugt automatisch:

- Portale  
- 3D‑Knoten  
- Shader‑Layer  
- Partikel‑Felder  
- Mini‑Welten  
- Cluster‑Netzwerke  

Alles erscheint automatisch in der Sphäre, ohne Änderungen an der index.html.

---

🧩 Szene‑Typen

Du kannst folgende Szene‑Typen erstellen:

| Typ | Beschreibung |
|-----|--------------|
| portal | Externe Websites, Repositories, Dashboards als holografisches Fenster |
| 3d | Eigene Three.js‑Objekte, Knoten, Artefakte |
| shader | GLSL‑Shader für Dark‑Matter‑Effekte |
| particles | Partikel‑Synapsen, Energie‑Funken |
| world | Mini‑Planeten, Orbit‑Welten, Sci‑Fi‑Umgebungen |
| cluster | Neuronale Netzwerke, Knoten‑Verbindungen |
| api | Visualisierung von API‑Daten als Energie‑Impulse |

---

🛠 Neue Szene hinzufügen

Schritt 1: Ordner erstellen

```
/universe/scenes/meineSzene/
```

Schritt 2: scene.json hinzufügen

Beispiel (3D‑Szene):

```json
{
  "type": "3d",
  "entry": "scene.js"
}
```

Schritt 3: Szene‑Code hinzufügen

scene.js:

```js
export function create(scene, THREE) {
  const geo = new THREE.TorusKnotGeometry(2, 0.6, 200, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff00ff });
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
```

Fertig.

Die Szene erscheint automatisch im Universum.

---

🔥 Fertige Sci‑Fi‑Szenen (Beispiele)

Dieses Repository enthält bereits folgende fertige Szenen:

- darkmatter-core – organischer Shader  
- knoten-torus – rotierender Energie‑Knoten  
- synapse-particles – Partikel‑Synapsen  
- portal-github – Portal‑Fenster zu externen Websites  
- mini-world-orbit – Mini‑Planetensystem  
- neuron-cluster – neuronales Netzwerk  

Du kannst beliebig viele weitere hinzufügen.

---

🧬 Philosophie

PortableAI ist ein lebendes Universum:

- Jede Szene ist ein Gedanke  
- Jeder Ordner ist ein neuronaler Knoten  
- Jede Datei ist ein Impuls  
- Die Sphäre ist das Bewusstsein  
- Der Validator‑Core ist der Herzschlag  

Das System wächst mit dir – ohne Grenzen.

---

📦 Deployment

Da alles statisch ist:

- GitHub Pages  
- Netlify  
- Vercel  
- jeder Webserver  

funktioniert sofort.

---

🧩 Lizenz

Dieses Projekt ist Teil des PortableAI‑Ökosystems.  
Du bestimmst die Lizenz.
