import { cn } from "@/utils/cn";
import { SpeakerHigh, SpeakerSimpleX } from "@phosphor-icons/react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

function VideoPlayer(props: { url: string; thumb: string }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  return (
    <div className="relative">
      <ReactPlayer
        url={`<${props.url}>`}
        playing={true}
        muted={isMuted}
        loop={true}
        volume={0.4}
        light={!play ? undefined : props.thumb}
        style={{ width: "100%", height: "100%" }}
      />
      <div
        className="absolute w-full h-full top-0 left-0"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div
          className={cn(
            show ? "flex" : "hidden",
            "flex-row justify-end items-end h-full p-2 bg-[#00000022]"
          )}
          onClick={(e: any) => {
            if (e.target !== e.currentTarget) return;
            setPlay(!play);
          }}
        >
          {isMuted ? (
            <div
              className="flex flex-row items-center text-white gap-2 border-white border p-1 px-2 cursor-pointer opacity-50 hover:opacity-100"
              onClick={() => setIsMuted(!isMuted)}
            >
              <div>Click to Unmute</div>
              <SpeakerSimpleX className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div
              className="flex flex-row items-center text-white gap-2 border-white border p-1 cursor-pointer opacity-50 hover:opacity-100"
              onClick={() => setIsMuted(!isMuted)}
            >
              <div>Click to Mute</div>
              <SpeakerHigh className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
