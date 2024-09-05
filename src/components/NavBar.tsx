import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/utils/cn";
import Logo from "./Logo";

function NavBar() {
  const [menuTrigger, setMenuTrigger] = useState(false);
  return (
    <nav className="w-full flex flex-row items-center p-6 top-0  z-[60]">
      <div className="relative">
        <Logo />
      </div>
      <div className="flex-grow"></div>
      <div className="hidden lg:flex gap-8 text-sm">
        <ul className="flex flex-row items-center gap-8 text-[#77859a] font-medium">
          <li>
            <a href="/">Platform</a>
          </li>
          <li>
            <a href="/users">Industries</a>
          </li>
          <li>
            <a href="/posts">Pricing</a>
          </li>
          <li>
            <a href="/posts">Guides</a>
          </li>
          <li>
            <a href="/posts">Pioneer</a>
          </li>
        </ul>
        <button className="mt-auto bg-[#6366f1] text-white py-2 px-6 rounded-md flex flex-row items-center justify-center text-center">
          Portal
        </button>
      </div>
      <div
        className="lg:hidden h-full w-10 p-2 border border-[#e4e4e7] rounded-md cursor-pointer z-[60]"
        onClick={() => {
          setMenuTrigger(!menuTrigger);
        }}
      >
        <List className="w-full h-full" />
      </div>
      <div
        className={cn(
          menuTrigger ? "flex" : "hidden",
          "flex-col absolute left-0 top-0 w-full h-screen bg-[#00000088] lg:hidden z-[80]"
        )}
        onClick={() => {
          setMenuTrigger(false);
        }}
      />

      <div
        className={cn(
          menuTrigger ? "flex" : "hidden",
          "absolute left-0 top-0 h-screen w-2/3 md:w-1/3 bg-white p-6 flex-col z-[90] lg:hidden"
        )}
      >
        <div className="flex flex-row justify-end">
          <div
            className="lg:hidden h-10 w-10 p-2 border border-[#e4e4e7] rounded-md cursor-pointer"
            onClick={() => {
              setMenuTrigger(false);
            }}
          >
            <X className="w-full h-full" />
          </div>
        </div>
        <ul className="flex flex-col gap-10 text-[#77859a] font-medium mt-4">
          <li>
            <a href="/">Platform</a>
          </li>
          <li>
            <a href="/users">Industries</a>
          </li>
          <li>
            <a href="/posts">Pricing</a>
          </li>
          <li>
            <a href="/posts">Guides</a>
          </li>
          <li>
            <a href="/posts">Pioneer</a>
          </li>
        </ul>
        <div className="flex-grow"></div>
        <button className="bg-[#6366f1] text-white py-2 px-6 rounded-md flex flex-row items-center justify-center">
          Portal
        </button>
      </div>
    </nav>
  );
}
export default NavBar;
