function map (value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function lerp (start, end, amt){
  return (1 - amt) * start + amt * end;
}

class AnimatedLandscape {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.terrain = null;
    this.gui = null;
    this.uniforms = {
      u_road_width: { type: "f", value: 0.5 },
      u_max_noise_amount: { type: "f", value: 50.0 },
      u_noise_scale: { type: "f", value: 0.04 },
      u_min_elevation_amount: { type: "f", value: 0.0 },
      u_time: { type: "f", value: 1.0 },
      u_time_frag: { type: "f", value: 1.0 }
    };

    this.init();
  }

  init(){
    this.setupScene();
    this.setupCamera();
    this.setupTerrain();
    this.initGUI();
    this.render();
  }

  initGUI() {
    this.gui = new dat.GUI();
    const terrainFolder = this.gui.addFolder('Terrain');
    terrainFolder.add(this.terrain.material.uniforms.u_road_width, 'value', 0, 1)
        .name('road width');
    terrainFolder.add(this.terrain.material.uniforms.u_min_elevation_amount, 'value', 0, 50)
        .name('min elevation');
    terrainFolder.add(this.terrain.material.uniforms.u_noise_scale, 'value', 0, 0.1)
        .name('noise scale');
    terrainFolder.add(this.terrain.material.uniforms.u_max_noise_amount, 'value', 0, 100)
        .name('max noise');
    terrainFolder.open();
  }

  setupScene(){
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('js-canvas'),
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('white', 1);
  }

  setupCamera(){
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.z = 100;
    this.camera.position.y = 50;
    this.camera.lookAt(0, 0, 0);
    new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  setupTerrain(){
    const geometry = new THREE.PlaneBufferGeometry(150, 500, 50, 50);
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([ THREE.ShaderLib.basic.uniforms, this.uniforms ]),
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      wireframe: false,
      transparent: true,
      side: THREE.DoubleSide
    });
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.rotation.x = -Math.PI / 2;
    this.scene.add(this.terrain);
  }

  render() {
    /**
    // damping mouse for smoother interaction
    const damplingFactor = 0.2; // The lower, the smoother
    this.mouse.xDamped = lerp(this.mouse.xDamped, this.mouse.x, damplingFactor);
    this.mouse.yDamped = lerp(this.mouse.yDamped, this.mouse.y, damplingFactor);
    */

    // this.terrain.material.uniforms.roadWidth.value = map(this.mouse.x, 0, window.innerWidth, 1, 0);
    // this.terrain.material.uniforms.intensity.value = map(this.mouse.y, 0, window.innerHeight, 1, 0);
    this.terrain.material.uniforms.u_time.value += 0.05;
    this.terrain.material.uniforms.u_time_frag.value += 0.01;

    // const terrainSpeed = 0.1;
    // this.terrain.position.z += terrainSpeed;
    // console.log(this.terrain.position.z < this.camera.position.z)
    // if (this.terrain.position.z > this.camera.position.z) {
    //   this.terrain.position.z = 0;
    // }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

const terrain = new AnimatedLandscape();