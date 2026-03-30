import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { motion } from "framer-motion-3d";
import { animate, useMotionValue, useTransform } from 'framer-motion';
import { vertex, fragment } from './Shader';
import { useTexture, useAspect } from '@react-three/drei';
import { useMouse, useDimension } from './hooks';
import * as THREE from 'three';

const images = [
  '/images/tphcm.png',
  '/images/danang.png',
  '/images/daklak.png'
];

interface ModelProps {
  activeBranch: number | null;
}

export default function Model({ activeBranch }: ModelProps) {
  const plane = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  const textures = useTexture(images);
  
  // Safe extraction for TS
  const firstTexture = Array.isArray(textures) ? textures[0] : textures;
  const { width, height } = firstTexture.image;
  
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const scale = useAspect(width, height, 0.225);
  
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  useEffect(() => {
    if (activeBranch !== null && activeBranch >= 0 && activeBranch < images.length) {
      if (plane.current) {
        // @ts-ignore
        plane.current.material.uniforms.uTexture.value = textures[activeBranch];
      }
      animate(opacity, 1, {
        duration: 0.2, 
        onUpdate: latest => {
          if (plane.current) {
            // @ts-ignore
            plane.current.material.uniforms.uAlpha.value = latest;
          }
        }
      });
    } else {
      animate(opacity, 0, {
        duration: 0.2, 
        onUpdate: latest => {
          if (plane.current) {
            // @ts-ignore
            plane.current.material.uniforms.uAlpha.value = latest;
          }
        }
      });
    }
  }, [activeBranch, textures, opacity]);

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] },
    uAlpha: { value: 0 }
  });

  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(x - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, x, 0.1));
      smoothMouse.y.set(lerp(smoothY, y, 0.1));
      
      if (plane.current) {
        // @ts-ignore
        plane.current.material.uniforms.uDelta.value = {
          x: x - smoothX,
          y: -1 * (y - smoothY)
        };
      }
    }
  });

  const x = useTransform(smoothMouse.x, [0, dimension.width || 1], [-1 * viewport.width / 2, viewport.width / 2]);
  const y = useTransform(smoothMouse.y, [0, dimension.height || 1], [viewport.height / 2, -1 * viewport.height / 2]);

  return (
    <motion.mesh position-x={x} position-y={y} ref={plane} scale={scale as any}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial 
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent={true}
      />
    </motion.mesh>
  );
}
