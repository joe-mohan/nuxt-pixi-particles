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

float horizontal(in vec2 xy, float t) {
    float v = cos(w1 * xy.x + A * t);
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
    
    float r = map(-1.0, 1.0, 0.75, 1.0, sin(PI * v));
    float g = map(-1.0, 1.0, 0.0, 0.8, sin(PI * v));
    
    g += log_map(-1.0, 1.0, 0.0, 0.1, cos(PI * v));
    
    float b = map(-1.0, 1.0, 0.0, 0.1, sin(PI * v));
    fragColor = vec4(pow(r, R), pow(g, R), 0., 1.0);
}
#define Kpre86x