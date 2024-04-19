#version 300 es
#define HW_PERFORMANCE 1
uniform vec3 iResolution;
uniform float iTime;
uniform float iScroll;

out vec4 fragColor;

#define PI 3.14159265359
#define EXP 2.71828182846

float w1 = 3.0;
float w2 = 2.0;
float w3 = 20.0;
float A = 2.0;
float R = 10.0;

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

float horizontal(in vec2 xy, float t) {
    float v = cos(w1 * snoise(xy) + A * t);
	return v;
}
    
float diagonal(in vec2 xy, float t) {
    float v = cos(w2 * (xy.x * cos(t) + 5.0 * xy.y * sin(t)) + A * t);
    return v;
}

float radial(in vec2 xy, float t) {
    float x = 0.3 * xy.x - 0.5 + cos(t);
    float y = 0.3 * xy.y - 0.5 + sin(t * 0.5);
    float v = sin(w3 * sqrt(x * x + y * y + 1.0) + A * t);
    return v;
}

float map(float a, float b, float c, float d, float x) {
    return ((x - a) * (d - c) / (b - a)) + c;
}

float log_map(float a, float b, float c, float d, float x) {
    float x1 = map(a, b, 1.0, EXP, x);
    return log(x1) * (d - c) + c;
}





void main()	{
    float t = iTime*0.1;
	
    vec2 xy = gl_FragCoord.xy / iResolution.xy  + vec2(0.0, -iScroll);
    float v = horizontal(xy, t);
    
    v += diagonal(xy, -0.5);
    
    v += radial(xy, sin(PI * t));
    v /= 3.0;
    
    // float r = map(-1.0, 1.0, 0.75, 1.0, sin(PI * v));
    // float g = map(-1.0, 1.0, 0.0, 0.8, sin(PI * v));
    
    // g += log_map(-1.0, 1.0, 0.0, 0.1, cos(PI * v));
    
    // float b = map(-1.0, 1.0, 0.0, 0.1, sin(PI * v));
    // fragColor = vec4(pow(r, R), pow(g, R), 0., 1.0);

    float r = map(0., 1.0, 0.75, 0.9, sin(PI * v));

    fragColor = vec4(pow(r, R), 0.0, 0.0, 1.0);
}
#define Kpre86x