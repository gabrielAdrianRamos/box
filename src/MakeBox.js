import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function MakeBox(props) {
  return (
    <RigidBody type="fixed">
      <Box
        args={props.args}
        position={props.position}
        rotation={props.rotation}
      >
        <meshStandardMaterial color={props.color} />
      </Box>
    </RigidBody>
  );
}
