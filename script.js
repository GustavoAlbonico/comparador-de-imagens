//ELEMENTOS
const containerDivider = document.querySelector(".container-divider");
const imageContainer = document.querySelector(".image-container");
const firstImage = document.querySelector("#firstImage");
const secondImage = document.querySelector("#secondImage");
const container = document.querySelector(".container");

//FUNÇÕES
function definirPosicaoDividerArrastando(e) {
    if(e.target.className || e.target.id === "circle" || e.target.id === "bar") return;

    const posicaoHorizontal = e.offsetX;
    containerDivider.style.left = `${posicaoHorizontal}px`;
    firstImage.style.clipPath = `rect(auto ${posicaoHorizontal}px auto auto)`;
    secondImage.style.clipPath = `rect(auto auto auto ${posicaoHorizontal}px)`;
}

function definePosicaoDividerClicando(e) {
    if(
        !(e.target.className === "container-divider" || 
        e.target.id === "circle" ||
        e.target.id === "bar" || 
        e.target.tagName === "I")
    ) {
        const posicaoHorizontal = e.offsetX;
        containerDivider.style.left = `${posicaoHorizontal}px`;
        firstImage.style.clipPath = `rect(auto ${posicaoHorizontal}px auto auto)`;
        secondImage.style.clipPath = `rect(auto auto auto ${posicaoHorizontal}px)`;
    }
}

function removeMouseMoveEvento() {
    imageContainer.removeEventListener("mousemove",definirPosicaoDividerArrastando);
}

//FUNÇÕES TOUCH
function definirPosicaoDividerArrastandoTouch(e) {
    if(e.target.className || e.target.id === "circle" || e.target.id === "bar") return;

    const bodyLargura = e.target.offsetParent.offsetParent.offsetWidth;
    const containerImagemLargura = e.target.offsetParent.offsetWidth;
    const posicaoHorizontalTocada = e.touches[0].pageX;
    const posicaoHorizontal = posicaoHorizontalTocada - ((bodyLargura - containerImagemLargura) / 2);

    if(
        (posicaoHorizontal + 5) >= containerImagemLargura || 
        posicaoHorizontalTocada <= ((bodyLargura - (containerImagemLargura + 5)) / 2)
    ) return;

    containerDivider.style.left = `${posicaoHorizontal}px`;
    firstImage.style.clipPath = `rect(auto ${posicaoHorizontal}px auto auto)`;
    secondImage.style.clipPath = `rect(auto auto auto ${posicaoHorizontal}px)`;
}

function removeTouchMoveEvento() {
    imageContainer.removeEventListener("mousemove",definirPosicaoDividerArrastando);
}

//EVENTOS
container.addEventListener("mouseup", (e) => {
    if(e.target.className === "container") removeMouseMoveEvento();
})

imageContainer.addEventListener("mousedown", (e) => {
    definePosicaoDividerClicando(e);
    imageContainer.addEventListener("mousemove" , definirPosicaoDividerArrastando);
});

imageContainer.addEventListener("mouseup", () => { 
    removeMouseMoveEvento();
});

//EVENTOS TOUCH
container.addEventListener("touchend", (e) => {
    if(e.target.className === "container") removeTouchMoveEvento();
})

imageContainer.addEventListener("touchstart", (e) => {
    imageContainer.addEventListener("touchmove" , definirPosicaoDividerArrastandoTouch);
});

imageContainer.addEventListener("touchend", () => { 
    removeTouchMoveEvento();
});



