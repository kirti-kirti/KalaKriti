"use client";

import { useState } from "react";
import Image from "next/image";
import { BASE_URL } from "@/services/api";

interface ImageFallbackProps {
  filename?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ImageFallback({ filename, alt, className, ...props }: ImageFallbackProps) {
  const [error, setError] = useState(false);

  const src = (filename && !error) 
    ? `${BASE_URL}/api/files/${filename}` 
    : "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=600"; // fallback aesthetic image

  return (
    <div className={`bg-muted overflow-hidden relative ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        style={props.fill ? { position: "absolute", top: 0, left: 0 } : { width: props.width, height: props.height }}
        {...props}
      />
    </div>
  );
}
