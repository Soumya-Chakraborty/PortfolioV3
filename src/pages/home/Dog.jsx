import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import dog from "../../assets/3d/dog3.glb";
import { useIsMobile } from "../../hooks";

// Custom hook for rotating an object
const useRotation = (ref, speed) => {
  return () => {
    if (ref.current) {
      ref.current.rotation.y += speed;
    }
  };
};

const Dog = () => {
  const { isMobile } = useIsMobile();
  // Destructuring assignment
  const { scene } = useLoader(GLTFLoader, dog);
  const ref = useRef();
  // Custom hook
  const rotate = useRotation(ref, 0.002);
  useFrame(rotate);
  return (
    <>
      <spotLight position={[5, 10, 7.5]} />
      <spotLight position={[-3, 10, -7.5]} />
      <pointLight color={"#f00"} position={[0, 0.6, 0]} distance="1.5" />
      {/* Conditional rendering */}
      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      <primitive object={scene} scale={isMobile ? 2 : 1.2} ref={ref} />
    </>
  );
};

export default Dog;