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
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.set(0, 10, 20);

  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  // Setup your scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }
  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  // {
  //   const color = 0xffffff;
  //   const intensity = 1;
  //   const light = new THREE.AmbientLight(color, intensity);
  //   scene.add(light);
  // }

  // {
  //   const skyColor = 0xb1e1ff; // light blue
  //   const groundColor = 0xb97a20; // brownish orange
  //   const intensity = 1;
  //   const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  //   scene.add(light);
  // }

  // {
  //   const color = 0xffffff;
  //   const intensity = 1;
  //   const light = new THREE.DirectionalLight(color, intensity);
  //   light.position.set(0, 10, 0);
  //   light.target.position.set(-5, 0, 0);
  //   scene.add(light);
  //   scene.add(light.target);
  // }

  // {
  //   const color = 0xffffff;
  //   const intensity = 1;
  //   const light = new THREE.PointLight(color, intensity);
  //   light.position.set(0, 10, 0);
  //   scene.add(light);

  //   const helper = new THREE.PointLightHelper(light);
  //   scene.add(helper);

  //   function updateLight() {
  //     helper.update();
  //   }
  // }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.SpotLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const helper = new THREE.SpotLightHelper(light);
    scene.add(helper);

    function updateLight() {
      light.target.updateMatrixWorld();
      helper.update();
    }
    updateLight();
  }

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
