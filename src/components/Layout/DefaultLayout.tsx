import NavBar from "@/components/NavBar";
import React, { PropsWithChildren } from "react";

function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-screen min-h-screen pb-10 bg-gradient-to-br from-blue-200 via-indigo-100 to-blue-100">
        <NavBar />
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
