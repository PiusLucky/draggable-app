"use client";

import React, { useEffect, useRef, useState } from "react";
import DraggableSection from "../section/DraggableSection";
import { tourDestinationsContent } from "@/lib/data";

export default function DraggableList() {
  const [tours, setTours] = useState<Tour[]>(tourDestinationsContent);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<Tour | null>(null);

  // NOTE: Hide drag ghost
  useEffect(() => {
    const draggableElements = document.querySelectorAll(".draggable");
    draggableElements.forEach((element) => {
      element.addEventListener(
        "dragstart",
        handleCustomDragStart as EventListener
      );
    });

    // Clean up event listeners on component unmount
    return () => {
      draggableElements.forEach((element) => {
        element.removeEventListener(
          "dragstart",
          handleCustomDragStart as EventListener
        );
      });
    };
  }, [tours]);

  const handleCustomDragStart = (event: DragEvent) => {
    // Using the transparant image as ghost
    const img = new Image();
    img.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/eqRPmwAAAAASUVORK5CYII=";
    if (event.dataTransfer) {
      event.dataTransfer.setDragImage(img, 0, 0);
    }
  };

  const handleDragStart = (
    _: React.DragEvent<HTMLDivElement>,
    index: number,
    tourId: number
  ) => {
    dragItem.current = index;

    const activeTourItem = tours.find((tour) => tour.id === tourId);
    setActiveDragItem(activeTourItem as Tour);
  };

  const handleDragEnter = (
    _: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    dragOverItem.current = index;

    const updatedTours = tours.map((tour, i) => ({
      ...tour,
      isDragged: i === index,
    }));

    setTours(updatedTours);
  };

  const handleDragEnd = (_: React.DragEvent<HTMLDivElement>) => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const updatedTours = [...tours];
      const draggedTour = updatedTours[dragItem.current];

      updatedTours.splice(dragItem.current, 1);
      updatedTours.splice(dragOverItem.current, 0, draggedTour);

      dragItem.current = null;
      dragOverItem.current = null;

      setTours(updatedTours.map((tour) => ({ ...tour, isDragged: false })));
    }
  };

  return (
    <div className="md:min-w-[900px]">
      {tours.map((tour, index) => (
        <div
          key={tour.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index, tour.id)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragEnd={handleDragEnd}
          className="draggable"
        >
          <DraggableSection {...tour} activeDragItem={activeDragItem} />
        </div>
      ))}
    </div>
  );
}
