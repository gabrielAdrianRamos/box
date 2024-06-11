import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Experience from "./Experience";
import "./styles.css";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.2, 9] }} shadows>
      <Suspense>
        <color attach="background" args={["#b7e7d0"]} />
        <Physics>
          <Experience />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
