import React from "react";

export default function InfoField(props: {
  field: string;
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="flex flex-row items-center gap-2">
        <div className="w-3 h-3 sm:w-4 sm:h-4">
          <props.icon className="w-full h-full text-[#979ca1]" />
        </div>
        <div className="text-xs sm:text-sm text-[#979ca1]">{props.field}</div>
      </div>
      <div className="text-sm sm:text-base font-medium">{props.text}</div>
    </div>
  );
}
