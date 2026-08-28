struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn contour(p: vec2f, t: f32, offset: f32) -> f32 {
  let bend = sin(p.x * 5.0 + offset * 2.4 + t * 0.08) * 0.06;
  let ridge = abs(fract((p.y + bend + offset) * 8.0) - 0.5);
  return 1.0 - smoothstep(0.465, 0.5, ridge);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let t = params.time;

  let traces =
    contour(p, t, 0.00) * 0.18 +
    contour(p, t, 0.07) * 0.14 +
    contour(p, t, 0.14) * 0.10;

  let cell = floor(uv * vec2f(36.0, 20.0));
  let h = hash21(cell);
  let pulse = 0.5 + 0.5 * sin(t * 1.2 + h * 24.0);
  let spark = step(0.978, h) * pulse;
  let rightFade = smoothstep(0.22, 0.68, uv.x);

  var alpha = (traces + spark * 0.12) * rightFade;
  alpha = clamp(alpha, 0.0, 0.28);

  let blue = vec3f(0.164706, 0.498039, 0.619608);
  let green = vec3f(0.243137, 0.498039, 0.450980);
  let color = mix(blue, green, h);
  return vec4f(color * alpha, alpha);
}
