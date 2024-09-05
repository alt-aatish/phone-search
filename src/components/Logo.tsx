import LogoWaves from "./LogoWaves";
import MonoLogoWaves from "./MonoLogoWaves";
import MonoReverseLogoWaves from "./MonoReverseLogoWaves";

const Logo = (props: { variant?: string }) => {
  return props.variant === undefined ||
    props.variant.replace(" ", "") === "default" ||
    props.variant.replace(" ", "") === "" ? (
    <div className="relative">
      <a
        aria-label="echowin Logo"
        className="flex place-items-center"
        data-discover="true"
        href="/"
      >
        <div
          className="overflow-hidden"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <div className="overflow-hidden text-2xl sm:text-3xl text-indigo-600">ech</div>
        </div>
        <span className="mx-[2px] mt-1 inline-block h-6 w-6 transform overflow-hidden rounded-full border-2 border-indigo-600">
          <div className="flex">
            <LogoWaves />
          </div>
        </span>
        <div className="overflow-hidden">
          <div className="overflow-hidden text-2xl sm:text-3xl text-slate-600">win</div>
        </div>
      </a>
    </div>
  ) : props.variant === "mono" ? (
    <div className="relative">
      <a
        aria-label="echowin Logo"
        className="flex place-items-center"
        data-discover="true"
        href="/"
      >
        <div
          className="overflow-hidden"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <div className="overflow-hidden text-2xl sm:text-3xl text-white">ech</div>
        </div>
        <span className="mx-[2px] mt-1 inline-block w-5 h-5 sm:w-6 sm:h-6 transform overflow-hidden rounded-full border-2 border-white">
          <div className="flex">
            <MonoLogoWaves />
          </div>
        </span>
        <div className="overflow-hidden">
          <div className="overflow-hidden text-2xl sm:text-3xl text-white">win</div>
        </div>
      </a>
    </div>
  ) : props.variant === "mono-reverse" ? (
    <div className="relative">
      <a
        aria-label="echowin Logo"
        className="flex place-items-center"
        data-discover="true"
        href="/"
      >
        <div
          className="overflow-hidden"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <div className="overflow-hidden text-2xl sm:text-3xl text-[#bfc1c4]">ech</div>
        </div>
        <span className="mx-[2px] mt-1 inline-block w-5 h-5 sm:w-6 sm:h-6 transform overflow-hidden rounded-full border-2 border-[#bfc1c4]">
          <div className="flex">
            <MonoReverseLogoWaves />
          </div>
        </span>
        <div className="overflow-hidden">
          <div className="overflow-hidden text-2xl sm:text-3xl text-[#bfc1c4]">win</div>
        </div>
      </a>
    </div>
  ) : <></>;
};

export default Logo;
