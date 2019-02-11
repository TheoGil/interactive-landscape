import {
  Mesh,
  PlaneBufferGeometry,
  ShaderLib,
  ShaderMaterial,
  UniformsUtils,
  DoubleSide,
  Color,
  FlatShading,
} from 'three';
import glslify from 'glslify';
import terrainVertexShader from '../shaders/terrain_vertex.glsl';

class Terrain {
  constructor(options) {
    this.uniforms = {
      u_road_width: { type: 'f', value: 0.66 },
      u_min_elevation_amount: { type: 'f', value: 50.0 },
      u_max_noise_amount: { type: 'f', value: 100.0 },
      u_noise_scale: { type: 'f', value: 0.02 },
      u_y_scroll_speed: { type: 'f', value: options.yScrollSpeed },
      u_time: { type: 'f', value: 0.0 },
      u_time_frag: { type: 'f', value: 1.0 },

      // Phong Uniforms
      timeDelta: { type: 'f', value: 0.0 },
      // emissive: { type: 'c', value: new Color(0x000000) },
      // specular: { type: 'c', value: new Color(0x111111) },
    };

    const geometry = new PlaneBufferGeometry(500, 500, 100, 300);
    const material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([ShaderLib.phong.uniforms, this.uniforms]),
      // vertexShader: document.getElementById('vertexShader').textContent,//document.getElementById('vertexShader').textContent,
      vertexShader: glslify(terrainVertexShader),
      fragmentShader: ShaderLib.phong.fragmentShader,
      lights: true,
      side: DoubleSide,
      castShadow: true,
      receiveShadow: true,
      shading: FlatShading,
      wireframe: false,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;

    options.scene.add(this.mesh);

    this.initGUI(options.gui);
  }

  initGUI(gui) {
    const terrainFolder = gui.addFolder('Terrain');
    terrainFolder.add(this.mesh.material.uniforms.u_road_width, 'value', 0, 1)
      .name('road width');
    terrainFolder.add(this.mesh.material.uniforms.u_min_elevation_amount, 'value', 0, 50)
      .name('min elevation');
    terrainFolder.add(this.mesh.material.uniforms.u_noise_scale, 'value', 0, 0.1)
      .name('noise scale');
    terrainFolder.add(this.mesh.material.uniforms.u_max_noise_amount, 'value', 0, 100)
      .name('max noise');
    /*
    terrainFolder.add(this.options, 'yScrollSpeed', 0, 15)
      .name('scroll speed');
      */
  }
}

export default Terrain;
