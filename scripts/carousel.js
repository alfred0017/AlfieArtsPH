const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;


//get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
})
//insert copies of the first few cards to beginning of carousel for infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend",card.outerHTML);
})



//add event listeners for left and right buttons
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const scrollIncrement = btn.id === "btn-left" ? -firstCardWidth : firstCardWidth;
        carousel.scrollBy({ left: scrollIncrement, behavior: 'smooth' });
    });
});

// arrowBtns.forEach(btn =>{
//     btn.addEventListener("click",()=>{
//         // carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
//         carousel.scrollLeft += btn.id === "left" ? firstCardWidth : -firstCardWidth;

//     })
// })

// arrowBtns.forEach(btn => {
//     btn.addEventListener("click", () => {
//         const scrollIncrement = btn.id === "left" ? -firstCardWidth : firstCardWidth;
//         carousel.scrollBy({ left: scrollIncrement, behavior: 'smooth' });
//     });
// });

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    //records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    
}

const dragging = (e) => {
    if(!isDragging) return; //return isDragging here if false
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 900) return; //return if window is smaller than 800 (mobile)  
    //autoplay the carousel after every 2500ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

const tolerance = 1; // Define a small tolerance value

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
    // If the carousel is at the end, scroll to the beginning
    else if (Math.abs(carousel.scrollLeft - (carousel.scrollWidth - carousel.offsetWidth)) <= tolerance) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    //clear existing timeout and start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}


carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



