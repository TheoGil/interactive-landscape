import Point from './Point';

class PointFactory {
  constructor(scene, gui) {
    this.scene = scene;
    this.gui = gui;
    this.pool = [];
    this.points = [];
    this.max = 5;

    this.init();
  }

  init() {
    this.setupGUI();
    for (let i = 0; i < this.max; i++) {
      const point = new Point(this.scene);
      this.scene.add(point.mesh);
      this.pool.push(point);
    }
  }

  setupGUI() {
    const datGUIPointsFolderOptions = {
      spawnLeft: () => {
        this.spawn('left');
      },
      spawnCenter: () => {
        this.spawn('center');
      },
      spawnRight: () => {
        this.spawn('right');
      },
    };
    const pointsFolder = this.gui.addFolder('Points');
    pointsFolder.add(datGUIPointsFolderOptions, 'spawnLeft').name('spawn left');
    pointsFolder.add(datGUIPointsFolderOptions, 'spawnCenter').name('spawn center');
    pointsFolder.add(datGUIPointsFolderOptions, 'spawnRight').name('spawn right');
  }

  spawn(where) {
    // Check if there is any Point left in pool
    if (this.pool.length > 0) {
      /**
       * If a point is still available,
       * remove it from the pool and place it in the points array
       * so it will be updated
       */
      const point = this.pool.splice(0, 1);
      this.points = this.points.concat(point);
    } else {
      console.log('No points currently available!');
    }
  }

  update(options) {
    this.points.forEach((point) => {
      point.update({ speed: options.speed });
      // Check point position
      // if < XXX
      // remove it from points and store it back to pool
    });
  }
}

export default PointFactory;
