import Image from "next/image";
import React from "react";
import PinIcon from "../icons/PinIcon";

interface IProps {
  activeDragItem: Tour | null;
  imageUrl: string;
  title: string;
  description: string;
  alt: string;
  isDragged: boolean;
}

export default function DraggableSection({
  activeDragItem,
  imageUrl,
  title,
  description,
  alt,
  isDragged,
}: IProps) {
  return (
    <div className="hover:cursor-move select-none">
      {isDragged && !!activeDragItem && (
        <div>
          <div className="bg-[#1E9BF0] h-[3px] w-full relative">
            <div className="absolute -top-8 left-[22%] md:left-[35%]">
              <ActiveTour
                imageUrl={activeDragItem?.imageUrl}
                title={activeDragItem?.title}
                alt={activeDragItem?.alt}
              />
            </div>
          </div>
        </div>
      )}
      <div className="px-[2.5rem] py-[20px] flex gap-normal items-center hover:bg-[#F4F5F6] ">
        <div>
          <Image
            src={imageUrl}
            width={96}
            height={96}
            alt={alt}
            className="rounded-[1rem] w-[96px] h-[96px] object-cover"
          />
        </div>

        <div>
          <p className="font-medium text-[19px] text-[#292B36]">{title}</p>
          <div className="flex gap-[4px] items-center">
            <PinIcon />
            <p className="text-[#A8A9AE] text-[17px]">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveTour({
  imageUrl,
  title,
  alt,
}: Pick<IProps, "imageUrl" | "title" | "alt">) {
  return (
    <div className="flex items-center gap-[12px] bg-white p-[16px] w-[288px] rounded-[8px]">
      <div>
        <Image
          src={imageUrl}
          width={32}
          height={32}
          alt={alt}
          className="rounded-[5px] w-[32px] h-[32px] object-cover"
        />
      </div>
      <p className="font-medium text-[17px] text-[#292B36]">{title}</p>
    </div>
  );
}
