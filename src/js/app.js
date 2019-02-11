import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  PointLightHelper,
  DirectionalLightHelper,
  DirectionalLight,
  SpotLightHelper,
  SpotLight,
} from 'three';
import OrbitControls from 'orbit-controls-es6';
import * as dat from 'dat.gui';
import Terrain from './Terrain';
import LightHelper from './LighHelper';
import SuperPointLightHelper from "./PointLighHelper";

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
      yScrollSpeed: 0.25,
    };
  }

  init() {
    this.initGUI();
    this.setupScene();
    this.setupCamera();
    this.setupTerrain();
    this.currentCamera = this.debugCamera;
    this.render();

    // Add ambient light
    this.scene.add(new AmbientLight( 0x404040 ));


    const light = new LightHelper({
      type: 'SpotLight',
      gui: this.gui,
      name: 'Lumière',
    });
    // light.addTo(this.scene);

    const pointlight = new SuperPointLightHelper({
      gui: this.gui,
      name: 'pointlight',
    });
    pointlight.addTo(this.scene);
  }

  initGUI() {
    this.gui = new dat.GUI();
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
      // background: new Color(0xEEEEEE),
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor('white', 1);
  }

  setupTerrain() {
    this.terrain = new Terrain({
      scene: this.scene,
      yScrollSpeed: this.options.yScrollSpeed,
      gui: this.gui,
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
