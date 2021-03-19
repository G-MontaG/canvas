// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");
const dat = require("dat.gui");
const gui = new dat.GUI();

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const left = 0;
  const right = 300; // default canvas size
  const top = 0;
  const bottom = 150; // default canvas size
  const near = -1;
  const far = 1;
  const camera = new THREE.OrthographicCamera(
    left,
    right,
    top,
    bottom,
    near,
    far
  );
  camera.zoom = 1;

  // Setup your scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  const loader = new THREE.TextureLoader();
  const textures = [
    loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
    ),
    loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg"
    ),
    loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg"
    ),
    loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg"
    ),
    loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg"
    ),
    loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg"
    ),
  ];
  const planeSize = 256;
  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planes = textures.map((texture) => {
    const planePivot = new THREE.Object3D();
    scene.add(planePivot);
    texture.magFilter = THREE.NearestFilter;
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    planePivot.add(mesh);
    // move plane so top left corner is origin
    mesh.position.set(planeSize / 2, planeSize / 2, 0);
    return planePivot;
  });

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.bottom = viewportHeight;
      camera.right = viewportWidth;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      const distAcross = Math.max(20, context.canvas.width - planeSize);
      const distDown = Math.max(20, context.canvas.height - planeSize);

      // total distance to move across and back
      const xRange = distAcross * 2;
      const yRange = distDown * 2;
      const speed = 180;

      planes.forEach((plane, ndx) => {
        // compute a unique time for each plane
        const t = time * speed + ndx * 300;

        // get a value between 0 and range
        const xt = t % xRange;
        const yt = t % yRange;

        // set our position going forward if 0 to half of range
        // and backward if half of range to range
        const x = xt < distAcross ? xt : xRange - xt;
        const y = yt < distDown ? yt : yRange - yt;

        plane.position.set(x, y, 0);
      });

      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
