import { Sphere } from "@react-three/drei";
export default function Ball(props) {
  return (
    <>
      <Sphere args={props.args} position={props.position}>
        <meshStandardMaterial color={"#03AED2"} />
      </Sphere>
    </>
  );
}
