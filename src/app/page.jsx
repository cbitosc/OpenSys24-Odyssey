"use client";

import { Suspense } from "react/";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("@/components/Home"), {
  loading: () => (
    <div className="flex items-center justify-center gap-4 px-8 py-4 mx-auto my-40 text-6xl layer1 w-min glass h-min">
      <h2 className="py-4 text-3xl text-center shimmerb text-bblue-200">
        Loading...
      </h2>
    </div>
  ),
});

const DynamicLogin = dynamic(() => import("@/components/Login"), {
  loading: () => (
    <div className="flex items-center justify-center gap-4 px-8 py-4 mx-auto my-40 text-6xl layer1 w-min glass h-min">
      <h2 className="py-4 text-3xl text-center shimmerb text-bblue-200">
        Loading...
      </h2>
    </div>
  ),
});

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex flex-col items-center spacer h-screen  bg-[url('/layered-waves-haikei.svg')]">
      {session ? (
        <Suspense>
          <DynamicHome />
        </Suspense>
      ) : (
        <Suspense>
          <DynamicLogin />
        </Suspense>
      )}
    </main>
  );
}
