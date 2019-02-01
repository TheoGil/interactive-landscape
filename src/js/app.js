import Rectangle from './Rectangle';

/*
class AnimatedLandscape {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.debugCamera = null;
    this.renderer = null;
    this.terrain = null;
    this.runner = null;
    this.gui = null;
    this.currentCamera = null;
    this.options = {
      yScrollSpeed: 1,
    },
    this.uniforms = {
      u_road_width: { type: "f", value: 0.4 },
      u_min_elevation_amount: { type: "f", value: 25.0 },
      u_max_noise_amount: { type: "f", value: 50.0 },
      u_noise_scale: { type: "f", value: 0.02 },
      u_y_scroll_speed: { type: "f", value: this.options.yScrollSpeed },
      u_time: { type: "f", value: 0.5 },
      u_time_frag: { type: "f", value: 1.0 }
    };

    this.init();
  }

  init(){
    this.setupScene();
    this.setupCamera();
    this.setupTerrain();
    this.setupRunner();
    this.initGUI();
    this.setupPointFactory();
    this.currentCamera = this.camera;
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
    terrainFolder.add(this.options, 'yScrollSpeed', 0, 15)
        .name('scroll speed');

    const datGUICameraFolderOptions = {
      toggleCamera: () => {
        if (this.currentCamera.uuid == this.camera.uuid) {
          this.currentCamera = this.debugCamera;
          this.cameraHelper.visible = true;
        } else {
          this.currentCamera = this.camera;
          this.cameraHelper.visible = false;
        }
      }
    };
    const cameraFolder = this.gui.addFolder('Camera');
    cameraFolder.add(datGUICameraFolderOptions, 'toggleCamera').name('toggle camera');
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
    this.camera.position.z = 250;
    this.camera.position.y = 10;
    this.camera.lookAt(0, 0, 0);

    this.debugCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.debugCamera.position.set(250, 250, 250);
    this.debugCamera.lookAt(0, 0, 0);
    new THREE.OrbitControls(this.debugCamera, this.renderer.domElement);
  }

  setupTerrain(){
    const geometry = new THREE.PlaneBufferGeometry(300, 500, 100, 200);
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

  setupRunner() {
    this.player = new Player(this.scene);
  }

  setupPointFactory() {
    this.pointFactory = new PointFactory(this.scene, this.gui);
  }

  render() {
    this.terrain.material.uniforms.u_y_scroll_speed.value += this.options.yScrollSpeed;
    this.terrain.material.uniforms.u_time.value += 0.5;

    this.pointFactory.update({ speed: this.options.yScrollSpeed });

    this.renderer.render(this.scene, this.currentCamera);
    requestAnimationFrame(this.render.bind(this));
  }
}

const terrain = new AnimatedLandscape();

*/
console.log('Aye pépito');