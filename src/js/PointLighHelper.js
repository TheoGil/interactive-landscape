import {
  PointLightHelper,
  PointLight,
} from 'three';

class SuperPointLightHelper {
  constructor(options) {
    this.gui = null;
    this.light = null;
    this.helper = null;
    this.params = {
      color: 0xffffff,
      intensity: 1,
      distance: 0,
      decay: 1,
      position: {
        x: 0,
        y: 100,
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
    this.light = new PointLight(this.params.color);
    this.light.intensity = this.params.intensity;
    this.light.distance = this.params.distance;
    this.light.decay = this.params.decay;
    this.light.position.set(this.params.position.x, this.params.position.y, this.params.position.z);
  }

  initHelper() {
    this.helper = new PointLightHelper(this.light);
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
  }

  addTo(scene) {
    scene.add(this.light);
    scene.add(this.light.target);
    scene.add(this.helper);
  }
}

export default SuperPointLightHelper;
