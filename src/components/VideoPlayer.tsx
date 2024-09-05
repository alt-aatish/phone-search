import { cn } from "@/utils/cn";
import { SpeakerHigh, SpeakerSimpleX } from "@phosphor-icons/react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

function VideoPlayer() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="relative">
      <ReactPlayer
        url="<https://www.youtube.com/watch?v=w47oTyA4hhg>"
        playing={true}
        muted={isMuted}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute w-full h-full top-0 left-0" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <div className={cn(show ? "flex" : "hidden", "flex-row justify-end items-end h-full p-2 bg-[#00000022]")}>
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
