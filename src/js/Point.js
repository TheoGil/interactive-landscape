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
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.z = initialZposition;
  }

  update(options) {
    this.mesh.position.z += options.speed;
    this.mesh.position.z += options.speed;
  }
}

export default Point;
