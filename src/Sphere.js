import { Sphere } from "@react-three/drei";
export default function Sphere() {
  return (
    <Sphere args={[0.4]} position={[0, -0.2, 0]}>
      <meshStandardMaterial color={"#AC7D88"} />
    </Sphere>
  );
}
