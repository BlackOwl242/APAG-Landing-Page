'use client';

import { Canvas } from '@react-three/fiber';
import React from 'react';
import Model from './Model';

interface SceneProps {
  activeBranch: number | null;
}

export default function MouseImageDistortionScene({ activeBranch }: SceneProps) {
  return (
    <div className='fixed top-0 left-0 h-screen w-full pointer-events-none z-[0] overflow-hidden'>
        <Canvas>
            <React.Suspense fallback={null}>
                <Model activeBranch={activeBranch} />
            </React.Suspense>
        </Canvas>
    </div>
  );
}
