import { BatQuaiIcon } from "@/app/assets/svgs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="h-[60px] bg-red-extra-dark flex items-center justify-center fixed top-0  w-full">
      <div className="flex items-center justify-between max-w-5xl w-full">
        <BatQuaiIcon className="w-10 h-10 hover:cursor-pointer" />
        <div className="flex gap-10 items-center">
          <p className="font-sans text-white font-semibold cursor-pointer hover:underline">
            About us
          </p>
          <p className="font-sans text-white font-semibold cursor-pointer hover:underline">
            History
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin">
            <Button
              variant="outline"
              className="outline-white text-white bg-red-extra-dark rounded-md font-bold font-sans text-md"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              variant="outline"
              className="text-red-extra-dark font-bold font-sans text-md"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
