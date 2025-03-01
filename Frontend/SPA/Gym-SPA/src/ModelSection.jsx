import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


const Model = ({ url }) => {
    const obj = useLoader(OBJLoader, url);
    return <primitive object={obj} scale={1} />;
};

const ModelSection = () => {
    return (
        <section id="3d-model">
            <div className="container">
                <div className="row">
                    <div className="section-title">
                        <h2>3D Model</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Canvas style={{ height: '500px', width: '100%' }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Suspense fallback={null}>
                                <Model url="/models/omro khl5 .obj" />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModelSection;