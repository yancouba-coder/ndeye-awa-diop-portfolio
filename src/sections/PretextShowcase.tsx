import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prepareWithSegments, layoutNextLine, type PreparedTextWithSegments, type LayoutCursor } from '@chenglou/pretext';

gsap.registerPlugin(ScrollTrigger);

const PretextShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const manifestoText = `Je crée des histoires qui connectent. Chaque marque a une voix unique à découvrir. Mon rôle est de donner vie à cette voix à travers du contenu stratégique, des campagnes social media engageantes et une analyse data qui fait la différence. Brand content n'est pas juste un métier, c'est une passion.`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Prepare text with Pretext
      const font = '400 18px Inter, system-ui, sans-serif';
      preparedRef.current = prepareWithSegments(manifestoText, font);

      // Entrance animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Render text that flows around mouse cursor
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !preparedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const font = '400 18px Inter, system-ui, sans-serif';
    ctx.font = font;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textBaseline = 'top';

    const lineHeight = 32;
    const padding = 40;
    const maxWidth = rect.width - padding * 2;
    const obstacleRadius = 80;

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Reset cursor for each render
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      let y = padding;

      // Draw obstacle (mouse position)
      if (isHovering) {
        const gradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, obstacleRadius
        );
        gradient.addColorStop(0, 'rgba(255, 45, 85, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 45, 85, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 45, 85, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, obstacleRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      // Layout text line by line, avoiding obstacle
      while (cursor.segmentIndex < preparedRef.current!.segments.length) {
        // Calculate available width for this line based on obstacle position
        let lineWidth = maxWidth;
        
        if (isHovering) {
          const lineY = y + lineHeight / 2;
          const distToObstacle = Math.abs(lineY - mousePos.y);
          
          if (distToObstacle < obstacleRadius) {
            // Text flows around obstacle
            const halfChord = Math.sqrt(
              Math.max(0, obstacleRadius * obstacleRadius - distToObstacle * distToObstacle)
            );
            
            if (mousePos.x < rect.width / 2) {
              // Obstacle on left, text flows on right
              lineWidth = maxWidth - (mousePos.x + halfChord - padding);
            } else {
              // Obstacle on right, text flows on left
              const leftSpace = mousePos.x - halfChord - padding;
              if (leftSpace > 50) {
                lineWidth = leftSpace;
              }
            }
          }
        }

        // Get next line using Pretext
        const line = layoutNextLine(preparedRef.current!, cursor, lineWidth);
        if (!line) break;

        // Draw the line
        const x = isHovering && mousePos.x < rect.width / 2 && 
                  Math.abs(y + lineHeight / 2 - mousePos.y) < obstacleRadius
          ? mousePos.x + Math.sqrt(Math.max(0, obstacleRadius * obstacleRadius - 
              Math.pow(y + lineHeight / 2 - mousePos.y, 2))) + 20
          : padding;

        ctx.fillText(line.text, x, y);

        // Update cursor and y position
        cursor = line.end;
        y += lineHeight;

        if (y > rect.height - padding) break;
      }
    };

    const animate = () => {
      render();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, isHovering]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-brand-dark z-35 py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-dark to-brand-rose/5" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-white/50 text-sm uppercase tracking-widest">Philosophie</span>
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Mon Approche
          </h2>
          <p className="text-white/60">
            Déplacez votre curseur pour voir le texte s'adapter
          </p>
        </div>

        {/* Pretext canvas container */}
        <div
          ref={containerRef}
          className="relative glass-card-strong rounded-3xl overflow-hidden cursor-none"
          style={{ height: '500px' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
          />
          
          {/* Custom cursor indicator */}
          {isHovering && (
            <div
              className="absolute pointer-events-none w-4 h-4 rounded-full bg-brand-rose/50 blur-sm transition-transform"
              style={{
                left: mousePos.x - 8,
                top: mousePos.y - 8,
                transform: 'scale(1)',
              }}
            />
          )}

          {/* Corner decoration */}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-white/30 text-xs">
            <span>Powered by</span>
            <span className="font-mono text-brand-rose">@chenglou/pretext</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { label: 'Mesures DOM-free', value: '500x' },
            { label: 'Performance', value: '120fps' },
            { label: 'Précision', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient">{stat.value}</p>
              <p className="text-white/50 text-xs sm:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PretextShowcase;
