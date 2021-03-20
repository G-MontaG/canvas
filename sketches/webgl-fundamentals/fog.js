// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");
const dat = require("dat.gui");
const gui = new dat.GUI();

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [4048, 2048],
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
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // Setup your scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  // We use this class to pass to dat.gui
  // so when it manipulates near or far
  // near is never > far and far is never < near
  // Also when dat.gui maniplates color we'll
  // update both the fog and background colors.
  class FogGUIHelper {
    constructor(fog, backgroundColor) {
      this.fog = fog;
      this.backgroundColor = backgroundColor;
    }
    get near() {
      return this.fog.near;
    }
    set near(v) {
      this.fog.near = v;
      this.fog.far = Math.max(this.fog.far, v);
    }
    get far() {
      return this.fog.far;
    }
    set far(v) {
      this.fog.far = v;
      this.fog.near = Math.min(this.fog.near, v);
    }
    get color() {
      return `#${this.fog.color.getHexString()}`;
    }
    set color(hexString) {
      this.fog.color.set(hexString);
      this.backgroundColor.set(hexString);
    }
  }

  {
    const near = 1;
    const far = 2;
    const color = "lightblue";
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);

    const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
    gui.add(fogGUIHelper, "near", near, far).listen();
    gui.add(fogGUIHelper, "far", near, far).listen();
    gui.addColor(fogGUIHelper, "color");
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

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
      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
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
