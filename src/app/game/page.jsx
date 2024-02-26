"use client";

import Level1 from "@/components/levels/L1";
import Level16 from "@/components/levels/L16";
import Level2 from "@/components/levels/L2";
import Level12 from "@/components/levels/L12";
import Level3 from "@/components/levels/L3";
import Level5 from "@/components/levels/L5";
import Level7 from "@/components/levels/L7";
import Level8 from "@/components/levels/L8";
import Level4 from "@/components/levels/L4";
import Level9 from "@/components/levels/L9";
import Level15 from "@/components/levels/L15";
import React, { useEffect, useState } from "react";
import Level11 from "@/components/levels/L11";
import Level6 from "@/components/levels/L6";
import Level10 from "@/components/levels/L10";
import Level13 from "@/components/levels/L13";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Level14 from "@/components/levels/L14";
import { staticData } from "@/lib/staticdata";
import { useRouter } from "next/navigation";
import {
  convertDotsToUnderscores,
  getIndianEpochTimeFromWorldTimeAPI,
  levelScore,
} from "@/lib/utils";
import { database } from "../../../firebase";
import { off, onValue, ref, runTransaction, set } from "firebase/database";

const Game = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [userDet, setUserDet] = useState(null);
  const router = useRouter();

  const handleLevelComplete = (curLevel) => {
    console.log("function called");
    // Update state to switch to the next level
    setScore(session.user.email);
    router.push("/");
  };

  const setStartTime = async (email) => {
    if (!loading && userDet?.CL <= staticData.maxLevel && userDet?.CS == 0) {
      {
        const uId = convertDotsToUnderscores(email);
        const curtime = await getIndianEpochTimeFromWorldTimeAPI();
        const userRef = ref(database, `/${uId}`);
        await set(userRef, { CL: userDet?.CL, CS: curtime, S: userDet?.S });
      }
    }
  };

  const setScore = async (email) => {
    setLoading(true);
    const uId = convertDotsToUnderscores(email);
    const userRef = ref(database, `/${uId}`);
    const updatedScore = await levelScore(userDet?.CL, userDet?.CS, userDet?.S);
    await set(userRef, { CL: userDet?.CL + 1, CS: 0, S: updatedScore });
  };

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

      setStartTime(session.user.email);

      return () => {
        off(userRef);
      };
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);

      // User is authenticated, continue rendering the component
    } else if (status === "loading") {
      // Session is still loading, do nothing (optional)
    } else {
      // User is not authenticated, redirect to homepage
      redirect("/");
    }
  }, [status, redirect]);

  return (
    <>
      {!loading && userDet?.CL <= staticData.maxLevel ? (
        <div className="w-screen ">
          {userDet?.CL === 1 && <Level1 onComplete={handleLevelComplete} />}
          {userDet?.CL === 2 && <Level2 onComplete={handleLevelComplete} />}
          {userDet?.CL === 3 && <Level3 onComplete={handleLevelComplete} />}
          {userDet?.CL === 4 && <Level4 onComplete={handleLevelComplete} />}
          {userDet?.CL === 5 && <Level5 onComplete={handleLevelComplete} />}
          {userDet?.CL === 6 && <Level6 onComplete={handleLevelComplete} />}
          {userDet?.CL === 7 && <Level7 onComplete={handleLevelComplete} />}
          {userDet?.CL === 8 && <Level8 onComplete={handleLevelComplete} />}
          {userDet?.CL === 9 && <Level9 onComplete={handleLevelComplete} />}
          {userDet?.CL === 10 && <Level10 onComplete={handleLevelComplete} />}
          {userDet?.CL === 11 && <Level11 onComplete={handleLevelComplete} />}
          {userDet?.CL === 12 && <Level12 onComplete={handleLevelComplete} />}
          {userDet?.CL === 13 && <Level13 onComplete={handleLevelComplete} />}
          {userDet?.CL === 14 && <Level14 onComplete={handleLevelComplete} />}
          {userDet?.CL === 15 && <Level15 onComplete={handleLevelComplete} />}
          {userDet?.CL === 16 && <Level16 onComplete={handleLevelComplete} />}
        </div>
      ) : (
        <div className="mt-8 text-[#F9DC34] text-center">
          <span>Come back soon for more levels!</span>
        </div>
      )}
    </>
  );
};

export default Game;
