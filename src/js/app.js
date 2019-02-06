import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three';
import OrbitControls from 'orbit-controls-es6';
import * as dat from 'dat.gui';
import Terrain from './Terrain';

class AnimatedLandscape {
  constructor() {
    this.scene = null;
    this.terrain = null;
    this.camera = null;
    this.debugCamera = null;
    this.renderer = null;
    this.gui = null;
    this.currentCamera = null;
    this.options = {
      yScrollSpeed: 1,
    };
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupTerrain();
    this.initGUI();
    this.currentCamera = this.debugCamera;
    this.render();
  }

  initGUI() {
    this.gui = new dat.GUI();

    const terrainFolder = this.gui.addFolder('Terrain');
    terrainFolder.add(this.terrain.mesh.material.uniforms.u_road_width, 'value', 0, 1)
      .name('road width');
    terrainFolder.add(this.terrain.mesh.material.uniforms.u_min_elevation_amount, 'value', 0, 50)
      .name('min elevation');
    terrainFolder.add(this.terrain.mesh.material.uniforms.u_noise_scale, 'value', 0, 0.1)
      .name('noise scale');
    terrainFolder.add(this.terrain.mesh.material.uniforms.u_max_noise_amount, 'value', 0, 100)
      .name('max noise');
    terrainFolder.add(this.options, 'yScrollSpeed', 0, 15)
      .name('scroll speed');

    const datGUICameraFolderOptions = {
      toggleCamera: () => {
        if (this.currentCamera.uuid === this.camera.uuid) {
          this.currentCamera = this.debugCamera;
          this.cameraHelper.visible = true;
        } else {
          this.currentCamera = this.camera;
          this.cameraHelper.visible = false;
        }
      },
    };
    const cameraFolder = this.gui.addFolder('Camera');
    cameraFolder.add(datGUICameraFolderOptions, 'toggleCamera').name('toggle camera');
  }

  setupScene() {
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: document.getElementById('js-canvas'),
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('white', 1);
  }

  setupTerrain() {
    this.terrain = new Terrain({
      scene: this.scene,
      yScrollSpeed: this.options.yScrollSpeed,
    });
  }

  setupCamera() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 250;
    this.camera.position.y = 10;
    this.camera.lookAt(0, 0, 0);

    this.debugCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.debugCamera.position.set(250, 250, 250);
    this.debugCamera.lookAt(0, 0, 0);
    new OrbitControls(this.debugCamera, this.renderer.domElement);
  }

  render() {
    this.terrain.mesh.material.uniforms.u_y_scroll_speed.value += this.options.yScrollSpeed;
    this.terrain.mesh.material.uniforms.u_time.value += 0.5;

    this.renderer.render(this.scene, this.currentCamera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const lava = new AnimatedLandscape();
lava.init();
