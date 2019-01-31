class Player {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.position = 0;

    this.init();
  }

  init() {
    this.setupMesh();
    this.setupEventListeners();
  }

  setupMesh() {
    /*
    const geometry = new THREE.CylinderGeometry( 2, 2, 20, 32 );
    const material = new THREE.MeshBasicMaterial({
      color: 0x9c27b0,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.z = 230;
    this.scene.add(this.mesh);
    */

    // Display a line on the ground for debugging purposes
    const geometry1 = new THREE.BoxGeometry(300, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });

    const debugLine = new THREE.Mesh(geometry1, material1);
    debugLine.position.z = 230;
    debugLine.position.z = 230;
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