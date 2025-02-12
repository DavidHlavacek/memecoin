import { useEffect, useState, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

interface CryptoNode {
  x: number;
  y: number;
  z: number;       // Depth coordinate
  baseY: number;   // Base position for vertical oscillation
  baseZ: number;   // Original depth
  symbol: string;
  size: number;
  speed: number;
  connections: number[];
  opacity: number; // For smooth transitions
}

export default function DynamicBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CryptoNode[]>([]);
  
  const symbols = ['₿', 'Ξ', '◈', 'Ł', '₳', 'Đ', 'ε', 'ℕ', 'Ӿ', 'Ψ'];

  useEffect(() => {
    // Increased number of nodes and better distribution
    nodesRef.current = Array(30).fill(null).map((_, i) => {
      // Create a natural 3D distribution using a spiral pattern for x and y,
      // and assign a random depth (z) within a reasonable range.
      const phi = (1 + Math.sqrt(5)) / 2;
      const theta = i * phi * Math.PI * 2;
      const radius = Math.sqrt(i / 30) * 1.2;

      // Check if we're in portrait mode (mobile screen)
      const isPortrait = window.innerWidth < window.innerHeight;
      // Use different multipliers to adjust distribution.
      // For portrait: spread more horizontally (0.8) and less vertically (0.4)
      // For landscape: use the default multipliers (0.6, 0.6)
      const multiplierX = isPortrait ? 0.8 : 0.6;
      const multiplierY = isPortrait ? 0.4 : 0.6;
      const normX = 0.5 + (radius * Math.cos(theta) * multiplierX);
      const normY = 0.5 + (radius * Math.sin(theta) * multiplierY);

      return {
        x: (normX + Math.random() * 0.1) * window.innerWidth,
        y: (normY + Math.random() * 0.1) * window.innerHeight,
        z: Math.random() * 400 + 400,       // Depth between 400 and 800
        baseY: (normY + Math.random() * 0.1) * window.innerHeight,
        baseZ: Math.random() * 400 + 400,     // Original depth
        symbol: symbols[i % symbols.length],
        size: Math.random() * 20 + 35,
        speed: Math.random() * 0.3 + 0.1,
        connections: Array(3).fill(0)
          .map(() => Math.floor(Math.random() * 30))
          .filter(n => n !== i),
        opacity: 1
      };
    });

    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        // Set the canvas resolution using the device pixel ratio
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        // Ensure the canvas displays at the correct size
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        const ctx = canvasRef.current.getContext('2d');
        ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame((time) => {
    // Smooth scroll animation
    const scrollDiff = scrollY - smoothScrollY;
    setSmoothScrollY(prev => prev + scrollDiff * 0.1);

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with gradient background that shifts with scroll
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    const scrollOffset = (smoothScrollY * 0.02) % 360;
    gradient.addColorStop(0, `hsl(${220 + scrollOffset}, 100%, 6%)`);
    gradient.addColorStop(1, `hsl(${220 + scrollOffset * 0.5}, 100%, 2%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Compute parameters for perspective projection
    const fov = 300; // Focal length
    // On mobile screens, use a larger multiplier so the camera moves closer
    const cameraZ = window.innerWidth < 768 ? smoothScrollY * 0.3 : smoothScrollY * 0.2;
    const rotationAngle = smoothScrollY * 0.0003; // Camera rotation (radians), less aggressive

    // Calculate mesh center (average x and y of nodes)
    let sumX = 0, sumY = 0;
    nodesRef.current.forEach(node => {
       sumX += node.x;
       sumY += node.y;
    });
    const meshCenterX = nodesRef.current.length ? sumX / nodesRef.current.length : canvas.width / 2;
    const meshCenterY = nodesRef.current.length ? sumY / nodesRef.current.length : canvas.height / 2;

    // For each node, compute its projected position using simple perspective projection.
    const projectedNodes = nodesRef.current.map(node => {
      // Update node's x,y oscillation (simulate movement)
      const scrollInfluence = smoothScrollY * 0.03;
      node.x += Math.sin(time * 0.001) * node.speed;
      node.y = node.baseY + Math.cos(time * 0.001) * node.speed * 12 - scrollInfluence;

      // Apply a 2D rotation around the mesh center to simulate camera rotation.
      const dx = node.x - meshCenterX;
      const dy = node.y - meshCenterY;
      const r = Math.sqrt(dx * dx + dy * dy);
      const theta = Math.atan2(dy, dx) + rotationAngle;
      const rotatedX = meshCenterX + r * Math.cos(theta);
      const rotatedY = meshCenterY + r * Math.sin(theta);

      // Perspective calculation:
      // Ensure depth denominator is not too small.
      const depth = Math.max(50, node.z - cameraZ);
      const perspective = fov / depth;

      // Project rotated coordinates onto the screen.
      const projectedX = meshCenterX + (rotatedX - meshCenterX) * perspective;
      const projectedY = meshCenterY + (rotatedY - meshCenterY) * perspective;

      // Adjust node size based on perspective.
      // On mobile screens (width < 768px), scale down the symbol size.
      const mobileScale = window.innerWidth < 768 ? 0.6 : 1;
      const projectedSize = node.size * perspective * mobileScale;

      return {
         projectedX,
         projectedY,
         projectedSize,
         opacity: node.opacity,
         symbol: node.symbol,
         original: node
      };
    });

    // Draw connections using projected positions
    projectedNodes.forEach((pNode, i) => {
      const originalNode = pNode.original;
      originalNode.connections.forEach(connectionIndex => {
        const connected = projectedNodes[connectionIndex];
        if (!connected) return;
        const connectionOpacity = Math.min(originalNode.opacity, connected.opacity);
        ctx.strokeStyle = `hsla(${220 + scrollOffset}, 100%, 70%, ${0.15 * connectionOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pNode.projectedX, pNode.projectedY);
        ctx.lineTo(connected.projectedX, connected.projectedY);
        ctx.stroke();

        // Draw a moving data point along the connection with an unsynchronized offset and random speed.
        // Compute a deterministic random offset based on node index (i) and connectionIndex.
        const offset = ((Math.sin(i * 12.9898 + connectionIndex * 78.233) * 43758.5453) % 1 + 1) % 1;
        // Compute a random speed factor for this connection, ensuring variety in movements.
        const speedFactor = (((Math.cos(i * 3.14 + connectionIndex) + 1) / 2) * 0.00025) + 0.00005;
        const progress = ((time * speedFactor + smoothScrollY * 0.0002 + offset) % 1);
        const dataX = pNode.projectedX + (connected.projectedX - pNode.projectedX) * progress;
        const dataY = pNode.projectedY + (connected.projectedY - pNode.projectedY) * progress;
        ctx.fillStyle = `hsla(${220 + scrollOffset}, 100%, 70%, ${0.8 * connectionOpacity})`;
        ctx.beginPath();
        ctx.arc(dataX, dataY, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Draw nodes using projected positions.
    projectedNodes.forEach(pNode => {
      const distanceToMouse = Math.hypot(
        mousePosition.x * canvas.width - pNode.projectedX,
        mousePosition.y * canvas.height - pNode.projectedY
      );
      const glowIntensity = Math.max(0, 1 - distanceToMouse / 200);

      // Draw glow effect.
      ctx.shadowColor = `hsla(${220 + scrollOffset}, 100%, 70%, ${0.5 * pNode.opacity})`;
      ctx.shadowBlur = 15 * glowIntensity;

      // Set font and draw the crypto symbol with projected size.
      ctx.font = `${pNode.projectedSize}px Arial`;
      ctx.fillStyle = `hsla(${220 + scrollOffset}, 100%, 70%, ${(0.8 + glowIntensity * 0.2) * pNode.opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pNode.symbol, pNode.projectedX, pNode.projectedY);

      ctx.shadowBlur = 0;
    });

    // We're explicitly computing and drawing projected positions. No canvas transform used.
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#000614] overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            hsla(${220 + (smoothScrollY * 0.02) % 360}, 100%, 70%, 0.03) 0%,
            transparent 60%
          )`,
          transform: `translate(${Math.sin(smoothScrollY * 0.01) * 3}px, 0)`,
        }}
      />
    </div>
  );
}
