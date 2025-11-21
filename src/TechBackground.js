import React, { useEffect, useRef } from 'react';

const TechBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1);

        // Characters to display (Binary + Matrix style)
        const chars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let lastTime = 0;
        const fps = 20; // Lower FPS for slower speed
        const nextFrameDelay = 1000 / fps;

        const draw = (time) => {
            const deltaTime = time - lastTime;

            if (deltaTime >= nextFrameDelay) {
                // Semi-transparent black to create trail effect
                ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#3b82f6'; // Electric Blue text
                ctx.font = '15px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * 20, drops[i] * 20);

                    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
                lastTime = time;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: '#0f172a', // Deep Navy background
            }}
        />
    );
};

export default TechBackground;
