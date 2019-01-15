function map (value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function lerp (start, end, amt){
  return (1 - amt) * start + amt * end;
}

class AnimatedLandscape {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.terrain = null;
    this.uniforms = {
      time: { type: "f", value: 0.0 },
      roadWidth: { type: "f", value: 0.5 },
      intensity: { type: "f", value: 0.5 }
    };
    this.mouse = {
      x: 0,
      y: 0,
      xDamped: 0,
      yDamped: 0
    };

    this.init();
  }

  init(){
    this.setupScene();
    this.setupCamera();
    this.setupMesh();
    this.render();

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
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
    this.camera.position.z = 100;
    this.camera.position.y = 50;
    this.camera.lookAt(0, 0, 0);
    new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  setupMesh(){
    const geometry = new THREE.PlaneBufferGeometry(100, 100, 50, 50);
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([ THREE.ShaderLib.basic.uniforms, this.uniforms ]),
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      wireframe: true,
      transparent: true
    });
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.rotation.x = -Math.PI / 2;
    this.scene.add(this.terrain);
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  render() {
    // damping mouse for smoother interaction
    /*
    const damplingFactor = 0.2; // The lower, the smoother
    this.mouse.xDamped = lerp(this.mouse.xDamped, this.mouse.x, damplingFactor);
    this.mouse.yDamped = lerp(this.mouse.yDamped, this.mouse.y, damplingFactor);
    */

    this.terrain.material.uniforms.roadWidth.value = map(this.mouse.x, 0, window.innerWidth, 1, 0);
    this.terrain.material.uniforms.intensity.value = map(this.mouse.y, 0, window.innerHeight, 1, 0);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

const terrain = new AnimatedLandscape();