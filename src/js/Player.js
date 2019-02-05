import {
  BoxGeometry,
  CylinderGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

class Player {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.position = 0;
    this.zPos = 230;

    this.init();
  }

  init() {
    this.setupMesh();
    this.setupEventListeners();
  }

  setupMesh() {
    const geometry = new CylinderGeometry(2, 2, 20, 32);
    const material = new MeshBasicMaterial({
      color: 0x9c27b0,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.z = this.zPos;
    this.scene.add(this.mesh);

    // Display a line on the ground for debugging purposes
    const geometry1 = new BoxGeometry(300, 1, 1);
    const material1 = new MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });

    const debugLine = new Mesh(geometry1, material1);
    debugLine.position.z = this.zPos;
    this.scene.add(debugLine);
  }

  setupEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 37:
        this.moveLeft();
        break;
      case 39:
        this.moveRight();
        break;
      default:
        // Do nothing
        break;
    }
  }

  moveLeft() {
    if (this.mesh.position.x > -10) {
      this.mesh.position.x -= 10;
    }
  }

  moveRight() {
    if (this.mesh.position.x < 10) {
      this.mesh.position.x += 10;
    }
  }
}

export default Player;
