import { cn } from "../../utils/cn";
import React, { useEffect,useState, useRef, useContext } from "react";
import { createNoise3D } from "simplex-noise";
import { ThemeContext } from '../App';



 const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {

  const { isDark } = useContext(ThemeContext);
  


  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = document.body.clientWidth;;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth ;
      h = ctx.canvas.height = window.innerHeight ;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

 

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.45); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;

  const isDarkModeEnabled = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const render = () => {



    
    ctx.fillStyle = backgroundFill || (isDark ? "#000" : "#fff")
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);


  

  return (
    <div
      className={cn(
        "h-full w-full flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      
      <div className={cn(" z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;