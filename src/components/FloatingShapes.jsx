import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles, Environment, ContactShadows } from '@react-three/drei'
import { useMediaQuery } from '../hooks/useMediaQuery'

function LiquidSphere({ isDark, isMobile }) {
  const meshRef = useRef()
  const matRef = useRef()
  const { pointer } = useThree()

  const sphereArgs = useMemo(
    () => (isMobile ? [1.8, 32, 32] : [1.8, 64, 64]),
    [isMobile]
  )

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return

    if (isMobile) {
      // Simple auto-rotation on mobile — no pointer tracking
      meshRef.current.rotation.y += 0.004
      return
    }

    meshRef.current.rotation.y += (pointer.x * 0.8 - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.x += (-pointer.y * 0.5 - meshRef.current.rotation.x) * 0.05

    const dist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2)
    const targetDistort = dist < 0.3 ? 0.7 : (isDark ? 0.55 : 0.45)
    matRef.current.distort += (targetDistort - matRef.current.distort) * 0.04
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={sphereArgs} />
      <MeshDistortMaterial
        ref={matRef}
        color={isDark ? '#06B6D4' : '#8B5CF6'}
        emissive={isDark ? '#6366F1' : '#FB923C'}
        emissiveIntensity={0.3}
        distort={isDark ? 0.55 : 0.45}
        speed={isDark ? 2 : 1.8}
        metalness={0.2}
        roughness={0.0}
      />
    </mesh>
  )
}

export default function FloatingShapes({ isDark = true }) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 8, 5]} intensity={1.5} color={isDark ? '#06B6D4' : '#8B5CF6'} />
      <pointLight position={[-8, -6, -4]} intensity={1.0} color={isDark ? '#6366F1' : '#FB923C'} />

      <Environment preset="city" />

      <LiquidSphere isDark={isDark} isMobile={isMobile} />

      <Sparkles
        count={isMobile ? 20 : 80}
        size={[1, isMobile ? 1.5 : 2.5]}
        speed={0.3}
        color={isDark ? '#06B6D4' : '#8B5CF6'}
        scale={6}
        opacity={0.6}
      />

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={4}
        blur={2.5}
        far={4}
      />
    </>
  )
}
