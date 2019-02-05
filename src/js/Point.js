import {
  CylinderGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';


const initialZposition = -250;

class Point {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;

    this.init();
  }

  init() {
    this.setupMesh();
  }

  setupMesh() {
    const geometry = new CylinderGeometry(2, 2, 20, 32);
    const material = new MeshBasicMaterial({
      color: 0xff0000,
      visible: true,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.z = initialZposition;
    this.mesh.position.y = -50;
  }

  /**
   * Returns true if point should still move towards player
   * Returns false if it has reached player's Z position
   * @returns {boolean}
   */
  hasReachedPlayer(z) {
    return this.mesh.position.z >= z;
  }

  update(options) {
    this.mesh.position.z += options.speed;
  }

  spawn(x) {
    this.mesh.visible = true;
    this.mesh.position.y = 0;
    this.mesh.position.x = x;
    this.mesh.position.z = initialZposition;
  }

  kill() {
    this.mesh.visible = false;
  }
}

export default Point;
