import {
  SpotLightHelper,
  SpotLight,
} from 'three';

class LightHelper {
  constructor(options) {
    this.gui = null;
    this.light = null;
    this.helper = null;
    this.params = {
      color: 0xffffff,
      intensity: 1,
      distance: 500,
      angle: 1,
      penumbra: 1,
      decay: 2,
      position: {
        x: 0,
        y: 100,
        z: 250,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      'toggle helper': () => {
        this.helper.visible = !this.helper.visible;
      },
    };

    this.initLight();
    this.initHelper();
    this.initGUI(options.gui, options.name);
  }

  initLight() {
    this.light = new SpotLight(this.params.color);
    this.light.intensity = this.params.intensity;
    this.light.distance = this.params.distance;
    this.light.angle = this.params.angle;
    this.light.penumbra = this.params.penumbra;
    this.light.decay = this.params.decay;
    this.light.position.set(this.params.position.x, this.params.position.y, this.params.position.z);
  }

  initHelper() {
    this.helper = new SpotLightHelper(this.light);
  }

  initGUI(gui, name) {
    this.gui = gui.addFolder(name);

    this.gui.addColor(this.params, 'color').onChange((val) => {
      this.light.color.setHex(val);
    });
    this.gui.add(this.params, 'intensity', 0, 2).onChange((val) => {
      this.light.intensity = val;
    });
    this.gui.add(this.params, 'distance', 50, 1000).onChange((val) => {
      this.light.distance = val;
      this.helper.update();
    });
    this.gui.add(this.params, 'angle', 0, Math.PI / 3).onChange((val) => {
      this.light.angle = val;
      this.helper.update();
    });
    this.gui.add(this.params, 'penumbra', 0, 1).onChange((val) => {
      this.light.penumbra = val;
    });
    this.gui.add(this.params, 'decay', 1, 2).onChange((val) => {
      this.light.decay = val;
    });

    this.gui.add(this.params, 'toggle helper');

    const positionSubFolder = this.gui.addFolder('position');
    positionSubFolder.add(this.params.position, 'x', -500, 500).onChange((val) => {
      this.light.position.x = val;
    });
    positionSubFolder.add(this.params.position, 'y', -500, 500).onChange((val) => {
      this.light.position.y = val;
    });
    positionSubFolder.add(this.params.position, 'z', -500, 500).onChange((val) => {
      this.light.position.z = val;
    });

    const rotationSubFolder = this.gui.addFolder('target\'s position');
    rotationSubFolder.add(this.params.rotation, 'x', -500, 500).onChange((val) => {
      this.light.target.position.x = val;
      this.helper.update();
    });
    rotationSubFolder.add(this.params.rotation, 'y', -500, 500).onChange((val) => {
      this.light.target.position.y = val;
      this.helper.update();
    });
    rotationSubFolder.add(this.params.rotation, 'z', -500, 500).onChange((val) => {
      this.light.target.position.z = val;
      this.helper.update();
    });
  }

  addTo(scene) {
    scene.add(this.light);
    scene.add(this.light.target);
    scene.add(this.helper);
  }
}

export default LightHelper;
