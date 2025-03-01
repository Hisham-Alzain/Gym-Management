/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 omro.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/Models/omro.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.HG_Body.geometry} material={materials['.Human']} rotation={[Math.PI / 2, 0, 0]} />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.HG_Eyes_1.geometry} material={materials['.HG_Eyes_Outer_FAST']} />
        <mesh geometry={nodes.HG_Eyes_2.geometry} material={materials['.HG_Eyes_Inner']} />
      </group>
      <mesh geometry={nodes.HG_TeethLower.geometry} material={materials['.HG_Teeth']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.HG_TeethUpper.geometry} material={materials['.HG_Teeth']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/omro.gltf')
