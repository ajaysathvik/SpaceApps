import React, { useEffect, useRef } from 'react';
import { CanvasTexture } from '@react-three/fiber';

export const createGradientTexture = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)'); // Start color
    gradient.addColorStop(1, 'rgba(0, 0, 255, 1)'); // End color

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return new CanvasTexture(canvas);
};
