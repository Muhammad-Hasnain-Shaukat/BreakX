// WebGL GLSL Shader Code for Dynamic Light Emission ("Actual Light Effect")

export const lightEmissionVertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const lightEmissionFragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D u_texture;
  uniform sampler2D u_emissionMap;
  uniform bool u_hasEmissionMap;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  uniform vec3 u_glowColorPrimary;
  uniform vec3 u_glowColorSecondary;

  // Pseudo-random noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Simplex-style smooth noise generator
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Calculate object-fit: cover UV coordinates to prevent stretching/distortion
  vec2 getCoverUv(vec2 uv, vec2 canvasRes, vec2 imgRes) {
    if (canvasRes.x <= 0.0 || canvasRes.y <= 0.0 || imgRes.x <= 0.0 || imgRes.y <= 0.0) {
      return uv;
    }
    float canvasAspect = canvasRes.x / canvasRes.y;
    float imgAspect = imgRes.x / imgRes.y;
    
    vec2 ratio = vec2(
      min(canvasAspect / imgAspect, 1.0),
      min(imgAspect / canvasAspect, 1.0)
    );
    
    return (uv - 0.5) * ratio + 0.5;
  }

  void main() {
    vec2 coverUv = getCoverUv(vUv, u_resolution, u_imageResolution);
    vec4 baseColor = texture2D(u_texture, coverUv);
    
    // Calculate light emission mask (either from u_emissionMap or procedural luminosity threshold)
    float emissionMask = 0.0;
    if (u_hasEmissionMap) {
      vec4 maskSample = texture2D(u_emissionMap, coverUv);
      emissionMask = maskSample.r;
    } else {
      // Extract bright highlights from the image to automatically form an emission mask
      float luminance = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
      emissionMask = smoothstep(0.4, 0.95, luminance);
    }

    // Distance to mouse pointer for interactive light spotlight
    vec2 aspectUv = (coverUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) + 0.5;
    vec2 aspectMouse = (u_mouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) + 0.5;
    float distToMouse = length(aspectUv - aspectMouse);
    float mouseSpotlight = smoothstep(0.45, 0.0, distToMouse);

    // Pulsing frequency
    float pulse = sin(u_time * 2.5) * 0.2 + 0.8;

    // Radiating light rays
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = aspectUv - center;
    float angle = atan(delta.y, delta.x);
    float rayPattern = sin(angle * 12.0 + u_time * 1.5) * 0.5 + 0.5;
    float rayFade = smoothstep(0.8, 0.1, length(delta));

    // Combine noise wave for light shimmer
    float shimmerNoise = noise(coverUv * 8.0 + vec2(u_time * 0.5, u_time * 0.3));

    // Dynamic light color blend
    float colorMixFactor = sin(u_time * 0.8 + coverUv.x * 2.0) * 0.5 + 0.5;
    vec3 activeGlowColor = mix(u_glowColorPrimary, u_glowColorSecondary, colorMixFactor);

    // Total light emission calculation
    float lightEnergy = emissionMask * pulse * u_intensity;
    lightEnergy += (rayPattern * rayFade * emissionMask * 0.6);
    lightEnergy += (shimmerNoise * 0.25 * emissionMask);
    lightEnergy += (mouseSpotlight * 0.4 * (emissionMask + 0.2));

    // Composite glow over base texture
    vec3 glowingResult = baseColor.rgb + (activeGlowColor * lightEnergy * 1.4);
    
    // Add subtle ambient edge bloom
    float edgeBloom = smoothstep(0.8, 1.0, length(coverUv - 0.5)) * 0.15 * pulse;
    glowingResult += u_glowColorPrimary * edgeBloom;

    gl_FragColor = vec4(glowingResult, baseColor.a);
  }
`;
