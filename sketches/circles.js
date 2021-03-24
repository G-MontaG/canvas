// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const palette = {
  "SW Ripe Olive 6209": "#44483d",
  "SW Naval 6244": "#2f3d4c",
  "SW Sleepy Blue 6225": "#bccbce",
  "SW Tassel 6369": "#c6884a",
  "SW Endless Sea 9150": "#32586e",
  "SW Cavern Clay 7701": "#ac6b53",
  "SW Touch of Sand 9085": "#d5c7ba",
  "SW Sandbank 6052": "#c3a497",
  "SW Canyon Clay 6054": "#85594f",
};

const settings = {
  dimensions: "A4",
  // pixelsPerInch: 300,
  // units: "in",
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // bleed: 100,
};

const createCircle = (radius, segments = 64, materialSettings) => {
  const geometry = new THREE.CircleGeometry(radius, segments);
  const material = new THREE.MeshBasicMaterial(materialSettings);
  const mesh = new THREE.Mesh(geometry, material);

  return [mesh, geometry, material];
};

const sketch = ({ context, width, height }) => {
  console.log(width);
  console.log(height);
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
    // antialias: true,
  });

  // WebGL background color
  renderer.setClearColor("white", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    0,
    1
  );

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  {
    const [mesh] = createCircle(width / 2, 128, {
      color: palette["SW Naval 6244"],
    });
    mesh.position.set(-200, -200, 0);
    scene.add(mesh);
  }
  {
    const [mesh] = createCircle(width / 2, 128, {
      color: palette["SW Ripe Olive 6209"],
    });
    mesh.position.set(200, 200, 0);
    scene.add(mesh);
  }
  {
    const [mesh] = createCircle(width / 3, 128, {
      color: palette["SW Sleepy Blue 6225"],
    });
    mesh.position.set(100, 200, 0);
    scene.add(mesh);
  }
  {
    const [mesh] = createCircle(width / 3, 128, {
      color: palette["SW Touch of Sand 9085"],
    });
    mesh.position.set(-100, -200, 0);
    scene.add(mesh);
  }
  {
    const [mesh] = createCircle(width / 4, 128, {
      color: palette["SW Canyon Clay 6054"],
    });
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
  }
  {
    const [mesh] = createCircle(width / 8, 128, {
      color: palette["SW Tassel 6369"],
    });
    mesh.position.set(53, 53, 0);
    scene.add(mesh);
  }
  {
    const [mesh] = createCircle(width / 8, 128, {
      color: palette["SW Endless Sea 9150"],
    });
    mesh.position.set(-53, -53, 0);
    scene.add(mesh);
  }
  // {
  //   const [mesh] = createCircle(width / 4, 128, {
  //     color: palette["SW Cavern Clay 7701"],
  //   });
  //   mesh.position.set(400, 400, 0);
  //   scene.add(mesh);
  // }

  // {
  //   const [mesh] = createCircle(width / 4, 128, {
  //     color: palette["SW Sandbank 6052"],
  //   });
  //   mesh.position.set(-200, -200, 0);
  //   scene.add(mesh);
  // }

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
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
