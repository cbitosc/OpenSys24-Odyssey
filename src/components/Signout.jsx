import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default () => (
  <Button
    className="text-[#F9DC34] border-[#F9DC34] hover:bg-[#F9DC34] text-lg bg-transparent font-thin hover:text-black"
    variant="outline"
    onClick={() => signOut()}>
    Sign out
  </Button>
);
