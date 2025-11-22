
import React, { useState, useRef } from 'react';
import { GripVertical } from 'lucide-react';

interface Props {
  beforeImage: string;
  afterImage: string;
  labelBefore?: string;
  labelAfter?: string;
}

const BeforeAfterSlider: React.FC<Props> = ({ 
  beforeImage, 
  afterImage, 
  labelBefore = "Raw Footage", 
  labelAfter = "Color Graded" 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    
    setSliderPosition(pos);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-col-resize select-none shadow-2xl"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
    >
      {/* After Image (Base) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full pointer-events-none">
        {labelAfter}
      </div>

      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full pointer-events-none">
          {labelBefore}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-600">
           <GripVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
