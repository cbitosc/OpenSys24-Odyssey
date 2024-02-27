import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { levelScore } from "@/lib/utils";
import { database } from "../../firebase";
import { off, onValue, ref, runTransaction, set } from "firebase/database";

import { useState, useEffect } from "react";
import { convertDotsToUnderscores } from "@/lib/utils";
import { staticData } from "@/lib/staticdata";
const Home = () => {
  const { data: session } = useSession();
  const [userDet, setUserDet] = useState(null);

  useEffect(() => {
    // Real-time database listener to fetch selectedPS
    if (session && session.user) {
      const uId = convertDotsToUnderscores(session.user.email);
      const userRef = ref(database, `/${uId}`);

      onValue(userRef, (snapshot) => {
        const userVal = snapshot.val();
        console.log(userVal);
        setUserDet(userVal);
      });

      return () => {
        off(userRef);
      };
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center spacer h-screen  bg-[url('/layered-waves-haikei.svg')]">
      <div className="mx-6 mt-8">
        <Image
          src="/DarkVertical.png"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      {userDet?.CL <= staticData.maxLevel ? (
  <Link href="/game">
    <Button className="mt-8 text-xl" size="lg">
      Play Level {userDet?.CL}
    </Button>
  </Link>
) : (
  <div className="mt-8 text-[#F9DC34]">
    {userDet?.CL > 16 ? (
      <span>Congratulations for completing The Odyssey!</span>
    ) : (
      <span>Come back soon for more levels!</span>
    )}
  </div>
)}
      <div className="mt-8 text-white">
        <span>
          Number of levels completed{" "}
          <span className=" text-[#F9DC34]">{userDet?.CL - 1}</span>
        </span>
      </div>

      <div className="mt-8 text-white">
        <span>
          Number of levels available{" "}
          <span className=" text-[#F9DC34]">{staticData.maxLevel}</span>
        </span>
      </div>

      <div className="mt-8 text-white">
        <span>
          Score <span className=" text-[#F9DC34]">{Math.floor(parseFloat(userDet?.S))}</span>
        </span>
      </div>
    </div>
  );
};

export default Home;
