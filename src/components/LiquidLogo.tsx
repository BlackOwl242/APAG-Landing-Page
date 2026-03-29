"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uResolution;
  uniform float uTextureAspect;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // === Object-contain UV mapping ===
    float containerAspect = uResolution.x / uResolution.y;
    vec2 texUv = uv;
    if (uTextureAspect > containerAspect) {
      // Image wider than container: fit width, letterbox top/bottom
      float scale = containerAspect / uTextureAspect;
      texUv.y = (uv.y - 0.5) / scale + 0.5;
    } else {
      // Image taller than container: fit height, pillarbox left/right
      float scale = uTextureAspect / containerAspect;
      texUv.x = (uv.x - 0.5) / scale + 0.5;
    }

    // Transparent if outside texture bounds
    if (texUv.x < 0.0 || texUv.x > 1.0 || texUv.y < 0.0 || texUv.y > 1.0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    // === Liquid distortion ===
    float dist = distance(uv, uMouse);
    float strength = smoothstep(0.35, 0.0, dist);

    float n1 = snoise(texUv * 3.0 + uTime * 0.3);
    float n2 = snoise(texUv * 5.0 - uTime * 0.2);
    vec2 displacement = vec2(
      (n1 * 0.6 + n2 * 0.4) * 0.04,
      snoise(texUv * 4.0 + uTime * 0.25) * 0.04
    );
    texUv += displacement * strength * uIntensity;
    texUv = clamp(texUv, 0.0, 1.0);

    gl_FragColor = texture2D(uTexture, texUv);
  }
`;

interface LiquidLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LiquidLogo({ src, alt, className = "" }: LiquidLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  const intensityTarget = useRef(0);
  const intensityCurrent = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    // Keep linear output — texture data is passed through as-is (already sRGB bytes)
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);

    const loader = new THREE.TextureLoader();
    loader.load(src, (texture) => {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.colorSpace = THREE.LinearSRGBColorSpace;

      const textureAspect = texture.image.width / texture.image.height;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uIntensity: { value: 0 },
          uResolution: { value: new THREE.Vector2(w, h) },
          uTextureAspect: { value: textureAspect },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
      scene.add(mesh);

      const animate = () => {
        rafRef.current = requestAnimationFrame(animate);
        mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.08;
        mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.08;
        intensityCurrent.current += (intensityTarget.current - intensityCurrent.current) * 0.06;

        material.uniforms.uMouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);
        material.uniforms.uTime.value = (Date.now() - startTime.current) * 0.001;
        material.uniforms.uIntensity.value = intensityCurrent.current;
        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      const onResize = () => {
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        renderer.setSize(nw, nh);
        material.uniforms.uResolution.value.set(nw, nh);
      };
      window.addEventListener("resize", onResize);
      (container as any).__onResize = onResize;
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      const onResize = (container as any).__onResize;
      if (onResize) window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [src]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseTarget.current.x = (e.clientX - rect.left) / rect.width;
    mouseTarget.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { intensityTarget.current = 1; }}
      onMouseLeave={() => { intensityTarget.current = 0; mouseTarget.current = { x: 0.5, y: 0.5 }; }}
      role="img"
      aria-label={alt}
    >
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ opacity: 0 }} aria-hidden="true" />
    </div>
  );
}
