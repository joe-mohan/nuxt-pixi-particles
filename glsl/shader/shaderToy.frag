// code copied from here https://www.shadertoy.com/view/XcS3zK Created by liamegan
#version 300 es
#define HW_PERFORMANCE 1
uniform vec3      iResolution;
uniform float     iTime;


out vec4 fragColor;


// float DistToLine(vec2 pt1, vec2 pt2, vec2 testPt)
// {
//   vec2 lineDir = pt2 - pt1;
//   vec2 perpDir = vec2(lineDir.y, -lineDir.x);
//   vec2 dirToPt1 = pt1 - testPt;
//   return abs(dot(normalize(perpDir), dirToPt1));
// }

// void main()
// {
//     vec2 xy = gl_FragCoord.xy / iResolution.xy; //Condensing this into one line
//     //vec2 uv = gl_FragCoord/iResolution.xy;
//     xy.y = 1.0 - xy.y + (sin(iTime)*1.0);
//     //fragColor = vec4(0.0,0.0,0.0,1.0);
//     // Get the distance to the line passing through the line x=y
//     fragColor.r = DistToLine(vec2(1.0, 0.0), vec2(0.0, 1.0), xy) * 1.0;
// }

// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float rand(float n){return fract(sin(n) * 43758.5453123);}
float noise(float p){
	float fl = floor(p);
    float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

vec4 colorLow = vec4(0., 0., 0., 0.);
vec4 colorHigh = vec4(1., 0., 0., 0.);
float spacingLow = 1.76;
float spacingHigh = 1.8;

float gradient(float dir, float time, float spacing) {
    float g = fract((dir + time * 0.1) * .9);
	float left = step(0.5, g);
    g = left * ((g - 0.5) * spacing) + (1. - left) * ((1. - g) - 0.5) * spacing;
    return g;
}

vec4 dualTone(vec4 low, vec4 high, float gradient, float power) {
    return mix(low, high, pow(gradient, power));
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    
    float gradient = gradient(noise(uv.y) - noise(uv.x), iTime, spacingHigh);
    vec4 tone = dualTone(colorLow, colorHigh, gradient, spacingLow);
    
    // Output to screen
    fragColor = tone;
}

#define Kpre86x