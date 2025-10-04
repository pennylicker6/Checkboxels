document.addEventListener("DOMContentLoaded", () => {
  console.log("Bannanannanannana");
  init();
});

function init() {
    const container = document.createElement("div");
    container.id = "pixelContainer";
    document.body.appendChild(container);
    
    for (let i = 0; i < 100; i++) {
        const pixel = document.createElement("input");
        pixel.type = "checkbox";
        pixel.id = "pixel" + i;
        container.appendChild(pixel);

        if ((i + 1) % 10 === 0) {
            const newline = document.createElement("br");
            container.appendChild(newline);
        }
    }
}

function fall() {
    const checkedBoxes = container.querySelectorAll("input[type='checkbox']:checked");
    console.log(checkedBoxes.length)
}
