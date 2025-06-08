import React, { useEffect, useRef } from 'react';

interface GameCanvasProps {
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 600;
      canvas.height = 150;
      onCanvasReady(canvas);
    }
  }, [onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 bg-white"
      width={600}
      height={150}
    />
  );
};