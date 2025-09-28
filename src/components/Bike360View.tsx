import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, Bounds } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Bike360View
 * - Renders a .glb/.gltf 3D model of a two-wheeler with smooth orbit controls and zoom.
 * - White background, responsive full-width container.
 * - Uses @react-three/fiber and @react-three/drei.
 *
 * Props:
 * - modelUrl?: string   -> defaults to '/models/bike.glb'
 * - height?: number     -> canvas height in px (defaults to 500)
 * - autoRotate?: boolean -> enable auto-rotation (defaults to false)
 * - maxDistance?: number -> OrbitControls max distance (defaults to 10)
 * - minDistance?: number -> OrbitControls min distance (defaults to 1)
 *
 * Notes:
 * - Place your .glb model at public/models/bike.glb or pass a custom modelUrl.
 * - Ensure packages are installed: three, @react-three/fiber, @react-three/drei
 *   npm i three @react-three/fiber @react-three/drei
 */
export type Bike360ViewProps = {
  modelUrl?: string;
  height?: number;
  autoRotate?: boolean;
  maxDistance?: number;
  minDistance?: number;
};

function FitAndCenter({ children }: { children: React.ReactNode }) {
  // Bounds component fits contents into view while preserving aspect ratio
  return (
    <Bounds clip fit observe margin={1.2}>
      {children}
    </Bounds>
  );
}

function BikeModel({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url, true);

  // Center and scale the model to a comfortable size
  useEffect(() => {
    if (!group.current) return;

    // Clone to avoid mutating cached GLTF scene
    const cloned = scene.clone(true);

    // Remove lights/cameras from the imported scene if any
    cloned.traverse((child) => {
      if ((child as THREE.Light).isLight || (child as THREE.Camera).isCamera) {
        child.parent?.remove(child);
      }
    });

    // Attach to our group
    // Clear existing
    while (group.current.children.length) group.current.remove(group.current.children[0]);
    group.current.add(cloned);

    // Compute bounding box to center
    const box = new THREE.Box3().setFromObject(group.current);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Center the model at origin
    group.current.position.sub(center);

    // Scale model to target size
    const maxDim = Math.max(size.x, size.y, size.z);
    const target = 3; // world units
    const scale = maxDim > 0 ? target / maxDim : 1;
    group.current.scale.setScalar(scale);
  }, [scene]);

  return <group ref={group} />;
}

function Fallback() {
  return (
    <Html center>
      <div style={{
        padding: '10px 14px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.9)',
        color: '#000',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        fontSize: 14,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        Loading 3D model...
      </div>
    </Html>
  );
}

function Scene({ modelUrl, autoRotate, maxDistance, minDistance }: Required<Pick<Bike360ViewProps, 'modelUrl' | 'autoRotate' | 'maxDistance' | 'minDistance'>>) {
  // Simple animation tick if autoRotate is true (OrbitControls also supports it)
  const orbitRef = useRef<any>(null);
  useFrame(() => {
    if (autoRotate && orbitRef.current) {
      orbitRef.current.update();
    }
  });

  return (
    <>
      {/* White background */}
      <color attach="background" args={["#ffffff"]} />

      {/* Lights */}
      <hemisphereLight intensity={0.7} groundColor={new THREE.Color('#e0e0e0')} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      {/* Keep contents fit and centered regardless of model size */}
      <FitAndCenter>
        <Suspense fallback={<Fallback />}>
          <BikeModel url={modelUrl} />
        </Suspense>
      </FitAndCenter>

      <OrbitControls
        ref={orbitRef}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        minDistance={minDistance}
        maxDistance={maxDistance}
        makeDefault
      />
    </>
  );
}

export default function Bike360View({
  modelUrl = '/models/bike.glb',
  height = 500,
  autoRotate = false,
  maxDistance = 10,
  minDistance = 1,
}: Bike360ViewProps) {
  // Preload model for faster UX (non-blocking)
  useEffect(() => {
    try {
      // @ts-ignore - drei augment
      if (useGLTF && typeof (useGLTF as any).preload === 'function') {
        (useGLTF as any).preload(modelUrl);
      }
    } catch { /* noop */ }
  }, [modelUrl]);

  const style = useMemo<React.CSSProperties>(() => ({ width: '100%', height, display: 'block' }), [height]);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Canvas
        style={style}
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 5], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true }}
      >
        <Scene modelUrl={modelUrl} autoRotate={autoRotate} maxDistance={maxDistance} minDistance={minDistance} />
      </Canvas>
      {/* Graceful message if the model file is missing; this is optional and non-blocking */}
      <noscript>
        Please enable JavaScript to view the 3D model.
      </noscript>
    </div>
  );
}

// Drei GLTF loader type augmentation
useGLTF.preload?.('/models/bike.glb');
