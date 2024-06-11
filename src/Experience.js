/* eslint-disable react/no-unknown-property */
import {
  OrbitControls,
  RoundedBox,
  Box,
  Text,
  Sphere,
} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import MakeBox from "./MakeBox";

export default function Experience() {
  const [click, setClick] = useState(false);
  const boxref = useRef();
  const ballref = useRef();
  useFrame(() => {
    if (click) {
      boxref.current.applyImpulse({ x: -0.1, y: -0.1, z: -0.1 }, true);
      boxref.current.addTorque({ x: -0.01, y: 0, z: -0.01 }, true);
      ballref.current.applyImpulse({ x: -0.1, y: 0.9, z: -0.1 }, true);
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, -1, 10]} intensity={0.5} />
      <OrbitControls />
      <RigidBody ref={boxref}>
        <Box
          args={[1.5, 1.5, 0.3]}
          rotation={[1.5, 0, 0]}
          position={[0, 0, 0]}
          onClick={() => setClick(true)}
        >
          <meshStandardMaterial color={"#96c180"} />
        </Box>
      </RigidBody>
      <RigidBody ref={ballref}>
        <Sphere args={[0.4]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color={"#AC7D88"} />
        </Sphere>
      </RigidBody>
      <group position={[0, -1.2, 0]} onClick={() => setClick(true)}>
        <MakeBox
          color={"#c9e179"}
          args={[1.5, 1.5, 0.1]}
          position={[0, 0, 0.7]}
        />
        <MakeBox
          color={"#c9e179"}
          args={[1.5, 1.5, 0.1]}
          position={[0, 0, -0.7]}
        />
        <MakeBox
          color={"#c9e179"}
          args={[1.5, 1.5, 0.1]}
          rotation={[0, 1.57, 0]}
          position={[0.7, 0, 0]}
        />
        <MakeBox
          color={"#c9e179"}
          args={[1.5, 1.5, 0.1]}
          rotation={[0, 1.57, 0]}
          position={[-0.7, 0, 0]}
        />
      </group>
      <RigidBody type="fixed">
        <RoundedBox position={[0, -2, 0]} args={[9, 0.3, 9]} receiveShadow>
          <meshStandardMaterial color={"#8259ae"} />
        </RoundedBox>
      </RigidBody>
      <Suspense>
        {click && (
          <Text
            position={[0, 1, 0]}
            color={"#362FD9"}
            scale={0.8}
            fontWeight="bold"
          >
            Happy Birthday!!!
          </Text>
        )}
      </Suspense>
    </>
  );
}
