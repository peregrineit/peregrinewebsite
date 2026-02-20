// animated fading text -------------------------------------------------------------------
// Function to handle animation when text comes into view
let observer;
function animateText(entry) {
    if (entry.isIntersecting) {
        const textWrapper = entry.target;
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        anime.timeline({ loop: false })
            .add({
                targets: textWrapper.querySelectorAll('.letter'),
                translateX: [40, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 800,
                delay: (el, i) => 40 + 30 * i
            });
        observer.unobserve(textWrapper);
    }
}
function initTxtAnimation() {
    observer = new IntersectionObserver((entries) => entries.forEach(animateText), { threshold: 0 });
    document.querySelectorAll('.txtanimation3').forEach((el) => observer.observe(el));
}

// Animate SVG Paths --------------------------------------------------------------------
$(document).ready(function () {
    $('[svg="animated"]').css({
        opacity: 0,
        transition: "opacity 400ms ease"
    });
    $(window).on("load resize scroll", function () {
        $('[svg="animated"] path').each(function () {
            var pathLength = this.getTotalLength();
            $(this).attr({
                "stroke-dasharray": pathLength,
                "stroke-dashoffset": pathLength
            });
            var svgAnimated = $(this).closest('[svg="animated"]');
            var svgAnimatedTop = svgAnimated.offset().top;
            var svgAnimatedHeight = svgAnimated.outerHeight();
            var windowHeight = $(window).height();
            var windowScrollTop = $(window).scrollTop();
            var animationDuration = svgAnimated.attr('svg-animation-time') || 5000;
            if (windowScrollTop + windowHeight > svgAnimatedTop && windowScrollTop < svgAnimatedTop + svgAnimatedHeight) {
                $(svgAnimated).css("opacity", 1);
                $(this).css({
                    transition: "stroke-dashoffset " + animationDuration + "ms ease-out",
                    "stroke-dashoffset": 0
                });
            }
        });
    });
});

// Random LETTERS on hover -------------------------------------------------------------------
// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;
// Gets the mouse position
const getMousePos = e => {
    return {
        x: e.clientX,
        y: e.clientY
    };
};
// This function generates a random string of a given length
const getRandomString = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
// Initialize mouse position object
let mousepos = {
    x: 0,
    y: 0
};
// Listen for mousemove events and update 
// 'mousepos' with the current mouse position
window.addEventListener('mousemove', ev => {
    // Save the mouse position
    mousepos = getMousePos(ev);
});
class Item {
    // Initialize DOM and style related properties
    DOM = {
        // main DOM element
        el: null,
        // decoration sub-element
        deco: null,
    };
    // tracks the x and y coordinates for animations
    renderedStyles = {
        x: {
            previous: 0,
            current: 0,
            amt: 0.1
        },
        y: {
            previous: 0,
            current: 0,
            amt: 0.1
        }
    };
    // random string of 2000 chars
    randomString = getRandomString(2000);
    // tracks scroll position
    scrollVal;
    // tracks size and position of the DOM element
    rect;
    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.deco = this.DOM.el.querySelector('.grid__item-img-deco');
        this.calculateSizePosition();
        this.initEvents();
        // On touch/mobile, show deco directly (no hover on mobile)
        var isMobile = window.matchMedia('(hover: none)').matches || window.matchMedia('(max-width: 768px)').matches;
        if (this.DOM.deco && isMobile) {
            this.DOM.deco.innerHTML = this.randomString;
            this.DOM.deco.classList.add('grid__item-img-deco--mobile-visible');
            var cx = this.rect.width > 0 ? this.rect.width / 2 : 150;
            var cy = this.rect.height > 0 ? this.rect.height / 2 : 150;
            this.DOM.el.style.setProperty('--x', cx + 'px');
            this.DOM.el.style.setProperty('--y', cy + 'px');
            this.DOM.deco.style.opacity = '1';
        }
    }
    // Calculate and store the current scroll 
    // position and size/position of the DOM element
    calculateSizePosition() {
        // current scroll
        this.scrollVal = {
            x: window.scrollX,
            y: window.scrollY
        };
        // size/position
        this.rect = this.DOM.el.getBoundingClientRect();
    }
    // Register event listeners for resize, mousemove, 
    // mouseenter and mouseleave
    initEvents() {
        // On resize, recalculate the size and position
        window.addEventListener('resize', () => this.calculateSizePosition());
        // On mousemove over the element, generate a 
        // new random string
        this.DOM.el.addEventListener('mousemove', () => {
            // Get a new random string
            this.randomString = getRandomString(2000);
        });
        // On mouseenter, fade in the deco element and 
        // start the animation loop
        this.DOM.el.addEventListener('mouseenter', () => {
            gsap.to(this.DOM.deco, {
                duration: .5,
                ease: 'power3',
                opacity: 1
            });
            const isFirstTick = true;
            this.loopRender(isFirstTick);
        });
        // On mouseleave, stop the animation loop and 
        // fade out the deco element
        this.DOM.el.addEventListener('mouseleave', () => {
            this.stopRendering();
            gsap.to(this.DOM.deco, {
                duration: .5,
                ease: 'power3',
                opacity: 0
            });
        });
    }
    // Request a new animation frame to start or 
    // continue the render loop
    loopRender(isFirstTick = false) {
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(() => this.render(isFirstTick));
        }
    }
    // Cancel any ongoing render loop
    stopRendering() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }
    // Render the current frame
    render(isFirstTick) {
        // Clear requestId for the next frame
        this.requestId = undefined;
        // Calculate the difference between the current 
        // scroll position and the stored one
        const scrollDiff = {
            x: this.scrollVal.x - window.scrollX,
            y: this.scrollVal.y - window.scrollY
        };
        // Calculate the new translation values based on 
        // the mouse position, scroll difference and 
        // the element's position
        this.renderedStyles['x'].current = (mousepos.x - (scrollDiff.x + this.rect.left));
        this.renderedStyles['y'].current = (mousepos.y - (scrollDiff.y + this.rect.top));
        // If it's the first animation tick, set the 
        // previous values to be the same as the current ones
        if (isFirstTick) {
            this.renderedStyles['x'].previous = this.renderedStyles['x'].current;
            this.renderedStyles['y'].previous = this.renderedStyles['y'].current;
        }
        // Update the previous value to be a linear 
        // interpolation between the previous and current values
        for (const key in this.renderedStyles) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
        // Apply the new styles to the DOM element 
        // using CSS variables
        gsap.set(this.DOM.el, {
            '--x': this.renderedStyles['x'].previous,
            '--y': this.renderedStyles['y'].previous
        });
        // Set the deco element's innerHTML to the random string
        this.DOM.deco.innerHTML = this.randomString;
        // Request the next frame
        this.loopRender();
    }
}
function initGridItems() {
    document.querySelectorAll('.grid__item > .grid__item-img').forEach(function (img) {
        if (!img.dataset.gridItemInited) {
            img.dataset.gridItemInited = '1';
            new Item(img);
        }
    });
}

// Count Up
jQuery(document).ready(function ($) {
    $('.counterup').counterUp({
        delay: 100, // the delay time in ms
        time: 2000 // the speed time in ms
    });
});

// Typing animation
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('typetxt-1')) {
        var typed1 = new Typed('#typetxt-1', {
            strings: ['git push', 'git pull'],
            typeSpeed: 50,
            backSpeed: 50,
            autoInsertCss: true,
            cursorChar: '',
            loop: true,
        });
    }
    if (document.getElementById('typetxt-2')) {
        var typed2 = new Typed('#typetxt-2', {
            strings: ['arrays', 'atoms', 'automation', 'astrophysics', 'algorithms'],
            typeSpeed: 50,
            backSpeed: 50,
            autoInsertCss: true,
            cursorChar: '',
            loop: true,
        });
    }
});

// Scramble Text
class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{ }—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({
                from,
                to,
                start,
                end
            })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}
//Here is where you can change the words
const phrases = [
    'PoC and MVP Development',
    'Product Design',
    'Full-Stack Development',
    'AI Services'
];
function initScrambleText() {
    const el = document.querySelector('.scramble-text');
    if (el) {
        const fx = new TextScramble(el);
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => setTimeout(next, 800));
            counter = (counter + 1) % phrases.length;
        };
        next();
    }
}

// Run all init after load + delay so React hydration completes (fixes first-load animation issues)
function runAnimations() {
    initTxtAnimation();
    initGridItems();
    initScrambleText();
}
function scheduleAnimations() {
    setTimeout(runAnimations, 200);
    setTimeout(initGridItems, 500);
}
if (document.readyState === 'complete') {
    scheduleAnimations();
} else {
    window.addEventListener('load', scheduleAnimations);
}
