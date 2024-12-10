import MainForm from "./components/MainForm";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="bg-fabric-light flex flex-col items-center">
      <NavBar />
      <div className="max-w-5xl w-full mt-[60px] flex flex-col items-center">
        <MainForm/>
      </div>
    </div>
  );
}
