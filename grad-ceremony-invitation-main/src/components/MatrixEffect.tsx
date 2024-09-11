import React, { useEffect } from 'react';

const MatrixEffect: React.FC = () => {
    useEffect(() => {
        const canvas = document.querySelector('.matrix') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrixCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
        const charactersArray = matrixCharacters.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = Array(Math.floor(columns)).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px Source Code Pro`;

            drops.forEach((y, i) => {
                const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
                ctx.fillText(text, i * fontSize, y * fontSize);

                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };

        const interval = setInterval(drawMatrix, 35);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default MatrixEffect;
