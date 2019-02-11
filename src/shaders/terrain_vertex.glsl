#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)

// Function from Iñigo Quiles
// www.iquilezles.org/www/articles/functions/functions.htm
// https://thebookofshaders.com/edit.php#05/cubicpulse.frag
// https://www.flickr.com/photos/kynd/9546075099/
float cubicPulse( float c, float w, float x ){
    x = abs(x - c);
    if( x>w ) return 0.0;
    x /= w;
    return 1.0 - x*x*(3.0-2.0*x);
}

#define PI 3.1415926535897932384626433832795


uniform float u_road_width;
uniform float u_max_noise_amount;
uniform float u_noise_scale;
uniform float u_min_elevation_amount;
uniform float u_y_scroll_speed;
uniform float u_time;
varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormal;

void main() {
    vUv = uv;

    float cubicPulseX = 0.5;
    float cubicPulseWidth = u_road_width;

    // temporarly using 1.0 instead of u_time as second parameter to prevent noise from being animated
    vec4 wow = vec4(position.x, position.y + u_y_scroll_speed, position.z, 1.0);
    float displacement = u_max_noise_amount * snoise4(u_noise_scale * wow);
    displacement = displacement + u_min_elevation_amount;

    /**
     * displacement amount is being modulated by the cubicPulse function,
     * creating this v looking shape on the x axis
     */
    displacement = displacement * (1.0 - cubicPulse(cubicPulseX, cubicPulseWidth, uv.x));

    vec3 newPosition = position + normal * abs(displacement);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0);

    // vViewPosition and vNormal are required by the fragment shader
    // and need to be defined here.
    // More infos:
    // - https://www.youtube.com/watch?v=978-x5IL96Y
    // - https://github.com/sneha-belkhale/threejs-shader-demo
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -modelViewPosition.xyz;
    vNormal = normalMatrix * normal;
}