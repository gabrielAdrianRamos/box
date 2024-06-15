/* eslint-disable react/no-unknown-property */
import { OrbitControls, RoundedBox, Box, Text, Torus } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import MakeBox from "./MakeBox";
import Ball from "./Ball";

export default function Experience() {
  const [click, setClick] = useState(false);
  const [intersecting, setIntersecting] = useState(false);
  const ballref = useRef();
  const isOnFloor = useRef(true);

  const jump = () => {
    if (isOnFloor.current) {
      ballref.current.applyImpulse({ x: 0.1, y: 7, z: 0.4 });
      isOnFloor.current = false;
    }
  };

  useFrame(() => {
    if (click) {
      jump();
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, -1, 10]} intensity={0.5} />
      <OrbitControls />
      <RigidBody>
        <Box
          args={[1.5, 1.5, 0.3]}
          rotation={[1.5, 0, 0]}
          position={[0, 0, 0]}
          onPointerDown={() => setClick(true)}
          onPointerUp={() => setClick(false)}
        >
          <meshStandardMaterial color={"#9CAFAA"} />
        </Box>
      </RigidBody>
      <RigidBody
        ref={ballref}
        colliders="ball"
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = false;
          }
        }}
      >
        <Ball args={[0.3]} position={[0, -0.3, 0]} />
      </RigidBody>

      <group
        position={[0, -1.2, 0]}
        onPointerDown={() => setClick(true)}
        onPointerUp={() => setClick(false)}
      >
        <MakeBox
          color={"#D6DAC8"}
          args={[1.5, 1.5, 0.1]}
          position={[0, 0, 0.7]}
        />
        <MakeBox
          color={"#D6DAC8"}
          args={[1.5, 1.5, 0.1]}
          position={[0, 0, -0.7]}
        />
        <MakeBox
          color={"#D6DAC8"}
          args={[1.5, 1.5, 0.1]}
          rotation={[0, 1.57, 0]}
          position={[0.7, 0, 0]}
        />
        <MakeBox
          color={"#D6DAC8"}
          args={[1.5, 1.5, 0.1]}
          rotation={[0, 1.57, 0]}
          position={[-0.7, 0, 0]}
        />
      </group>
      <RigidBody type="fixed" name="floor">
        <RoundedBox position={[0, -2, 0]} args={[10, 0.3, 10]} receiveShadow>
          <meshStandardMaterial color={"#B3C8CF"} />
        </RoundedBox>
      </RigidBody>
      <Suspense>
        {intersecting && (
          <Text
            position={[0, 2, 0]}
            font={"fonts/Poppins-Black.ttf"}
            color={"#352F44"}
            scale={1.1}
            fontWeight="bold"
            textAlign="center"
          >
            {`Happy\n Birthday!!!`}
          </Text>
        )}
      </Suspense>
      <RigidBody type="fixed">
        <CuboidCollider
          position={[0, 2, 0]}
          args={[1, 0.5, 0.5]}
          sensor
          onIntersectionEnter={() => setIntersecting(true)}
        />
      </RigidBody>
    </>
  );
}
