"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS loaded and ready!");
    main();
});

function main() {
    const container = document.getElementById("gameContainer");
    const canvas = document.getElementById("paintCanvas");
    const ctx = canvas.getContext("2d");

    // Make the canvas match the container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Pass vars to the drawing setup
    setupDrawing(canvas, ctx, container);
}

function setupDrawing(canvas, ctx, container) {
    ctx.lineWidth = 4;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "white";

    let drawing = false;

    function getPos(e) {
        const rect = container.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        return { x, y };
    }

    function startDraw(e) {
        drawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function stopDraw() {
        drawing = false;
    }

    // Prevent touch scrolling
    ["touchstart", "touchmove"].forEach(evt => {
        canvas.addEventListener(evt, e => e.preventDefault());
    });

    // Mouse + touch events
    const startEvents = ["mousedown", "touchstart"];
    const moveEvents = ["mousemove", "touchmove"];
    const endEvents = ["mouseup", "mouseleave", "touchend"];

    startEvents.forEach(ev => canvas.addEventListener(ev, startDraw));
    moveEvents.forEach(ev => canvas.addEventListener(ev, draw));
    endEvents.forEach(ev => canvas.addEventListener(ev, stopDraw));
}
