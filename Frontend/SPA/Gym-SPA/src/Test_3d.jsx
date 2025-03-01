import { useRef, useState, Suspense } from 'react'
import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Omro from '../public/Models/Omro'
import Nuclear from '../public/Nuclear.jsx'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// import { useLoader } from '@react-three/fiber'
// import { DDSLoader } from "three-stdlib"
import './Test_3d.css';

// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());
// const Scene = () => {
//     const materials = useLoader(MTLLoader, "omro khl5 .mtl");
//     const obj = useLoader(OBJLoader, "omro khl5 .obj", (loader) => {
//         materials.preload();
//         loader.setMaterials(materials);
//     });

//     console.log(obj);
//     return <primitive object={obj} scale={0.4} />;
// };

// export default function Test_3d() {
//     return (
//         <Canvas>
//             <Suspense fallback={null}>
//                 <Scene />
//                 <OrbitControls />
//                 <Environment preset="sunset" background />
//             </Suspense>
//         </Canvas>
//     );
// }

// function Box(props) {
//     // This reference gives us direct access to the THREE.Mesh object
//     const ref = useRef()
//     // Hold state for hovered and clicked events
//     const [hovered, hover] = useState(false)
//     const [clicked, click] = useState(false)
//     // Subscribe this component to the render-loop, rotate the mesh every frame
//     useFrame((state, delta) => (ref.current.rotation.x += delta))
//     // Return the view, these are regular Threejs elements expressed in JSX
//     return (
//         <mesh
//             {...props}
// ref={ref}
// scale={clicked ? 3 : 2}
// onClick={(event) => click(!clicked)}
// onPointerOver={(event) => (event.stopPropagation(), hover(true))}
// onPointerOut={(event) => hover(false)}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//         </mesh>
//     )
// }

export default function Test_3d() {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Omro />
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
    )
}


{/* <>
<Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
    <OrbitControls />
</Canvas>
<div>
    <h1>
        idk i just want to test and prove a point
    </h1>
</div>
</> */}

