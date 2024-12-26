import { Suspense } from "react";
import NavBar from "../components/NavBar";
import HeadingForm from "@/app/components/HeadingForm/HeadingForm";
import TopupBox from "./components/TopupBox/TopupBox";

export default function Home() {
  return (
    <div className="bg-fabric-light flex flex-col items-center min-h-screen h-full">
      <NavBar />
      <div className="max-w-5xl w-full mt-[60px] flex flex-col items-center">
        <Suspense>
          <HeadingForm />
        </Suspense>
        <TopupBox/>
      </div>
    </div>
  );
}
