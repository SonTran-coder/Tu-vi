import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="bg-fabric-light">
      <NavBar/>
      <div className="max-w-5xl w-full"></div>
    </div>
  );
}
