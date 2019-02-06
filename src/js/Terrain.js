import {
  Mesh,
  PlaneBufferGeometry,
  ShaderLib,
  ShaderMaterial,
  UniformsUtils,
  DoubleSide,
} from 'three';

class Terrain {
  constructor(options) {
    this.uniforms = {
      u_road_width: { type: 'f', value: 0.4 },
      u_min_elevation_amount: { type: 'f', value: 25.0 },
      u_max_noise_amount: { type: 'f', value: 50.0 },
      u_noise_scale: { type: 'f', value: 0.02 },
      u_y_scroll_speed: { type: 'f', value: options.yScrollSpeed },
      u_time: { type: 'f', value: 0.5 },
      u_time_frag: { type: 'f', value: 1.0 },
    };

    const geometry = new PlaneBufferGeometry(300, 500, 100, 200);
    const material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([ShaderLib.basic.uniforms, this.uniforms]),
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      wireframe: false,
      transparent: true,
      side: DoubleSide,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;

    options.scene.add(this.mesh);
  }
}

export default Terrain;
