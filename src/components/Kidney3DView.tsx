import React, { useState, Suspense } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import { useLanguage } from '../contexts/LanguageContext';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    KidneyArtery_blue_0: THREE.Mesh;
    KidneyArtery_red_0: THREE.Mesh;
    KidneyArtery_Ureter_0: THREE.Mesh;
    Kidney_kidney_0: THREE.Mesh;
  };
  materials: {
    blue: THREE.MeshStandardMaterial;
    material: THREE.MeshStandardMaterial;
    Ureter: THREE.MeshStandardMaterial;
    kidney: THREE.MeshStandardMaterial;
  };
};

interface Kidney3DViewProps {
  onError?: () => void;
}

function Model() {
  const gltf = useGLTF(require('../../assets/human_kidney_anatomy.glb')) as any as GLTFResult;
  const { nodes, materials } = gltf;
  
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KidneyArtery_blue_0.geometry}
        material={materials.blue}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KidneyArtery_red_0.geometry}
        material={materials.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KidneyArtery_Ureter_0.geometry}
        material={materials.Ureter}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Kidney_kidney_0.geometry}
        material={materials.kidney}
      />
    </group>
  );
}

export default function Kidney3DView({ onError }: Kidney3DViewProps) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  const getLoadingText = () => {
    switch (language) {
      case 'kz':
        return 'Модель жүктелуде...';
      case 'en':
        return 'Loading model...';
      default:
        return 'Загрузка модели...';
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00A86B" />
          <Text style={styles.loadingText}>{getLoadingText()}</Text>
        </View>
      )}
      <Suspense fallback={null}>
        <Canvas
          style={styles.canvas}
          onCreated={() => setLoading(false)}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Model />
        </Canvas>
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  canvas: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#27343a',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    gap: 12,
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
