import React, { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";

interface Props {}

const App: React.FC<Props> = (props) => {
  const [drawing, setDrawing] = useState(false);
  const [pencil, setPencil] = useState(0);
  const [height, setHeight] = useState(window.innerHeight / 2);
  const [width, setWidth] = useState(window.outerWidth / 2);

  const containerRef = useRef<HTMLDivElement>(null);

  const onDrawing = (
    context: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    cx: number,
    cy: number
  ) => {
    if (!drawing) return;
    if (pencil === 0) {
      sx *= width;
      sy *= height;
      cx *= width;
      cy *= height;

      context.beginPath();
      context.moveTo(sx, sy);
      context.lineTo(cx, cy);
      context.fillStyle = "black";
      context.lineWidth = 3;
      context.stroke();
    } else if (pencil === 1) {
      //eraser

      cx *= width;
      cy *= height;
      context.fillStyle = "white";
      context.fillRect(cx, cy, 20, 20);
    }
  };

  const startDrawing = () => setDrawing(true);
  const endDrawing = () => setDrawing(false);
  const onExit = () => {
    if (drawing) setDrawing(false);
  };

  const selectEraser = () => setPencil(1);
  const selectPencil = () => setPencil(0);

  useEffect(() => {
    window.addEventListener("resize", (event: any) => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight / 2);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [containerRef.current]);

  return (
    <div
      className="h-screen w-screen
     "
    >
      <div
        className="w-full h-96 mx-auto border-2 border-black rounded-md "
        ref={containerRef}
      >
        <Canvas
          onDraw={onDrawing}
          onStart={startDrawing}
          onStop={endDrawing}
          onEnd={onExit}
          className="bg-white w-full h-full"
          height={height}
          width={width}
        />
      </div>
      <div className="mt-4 flex justify-center space-x-4 h-1/10">
        <button className="border-2 px-2" onClick={selectPencil}>
          Pencil
        </button>
        <button className="border-2 px-2" onClick={selectEraser}>
          Eraser
        </button>
      </div>
    </div>
  );
};

App.defaultProps = {};

export default React.memo(App);
