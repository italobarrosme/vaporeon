type XProps = {
  args?: [number, number, number]
  color?: string
}

export function X({ args = [4, 1.5, 1.5], color }: XProps) {
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={args} />
        <meshPhysicalMaterial color={color} />
      </mesh>
      <mesh castShadow receiveShadow rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={args} />
        <meshPhysicalMaterial color={color} />
      </mesh>
    </group>
  )
}
