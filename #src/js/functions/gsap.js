const myAnime = () => {

  const btnParent = document.querySelector('.intro__bottom');
  const btnMove   = btnParent.querySelector('.intro__btn');

  btnMove.addEventListener('click', (e) => {
    e.preventDefault();
    const move   = btnMove.getAttribute('href').replace('#', '');
    const moveTo = document.getElementById(move);
    moveTo.scrollIntoView({
      behavior: 'smooth'
    });
  });

  if (window.innerWidth > 1023) {
    let tl = gsap.timeline();
  
    tl.from(".intro__title", {duration: 0.8, y: 120, opacity: 0})
      .from(".intro__subtitle", {duration: 0.6, y: 50, opacity: 0}, "-=0.2")
      .from(".header", {duration: 0.8, y: -160, opacity: 0}, "-=0.2")
      .from("._deco-1", {duration: 0.7, x: 80, scaleX: 0}, "-=0.2")
      .from("._deco-2", {duration: 0.7, x: 0, scale: 0}, "-=0.4")
      .from(btnParent, {duration: 0.8, rotation: 360, scale: 0, onComplete: function() {
        if (window.innerHeight < 750) {
          btnParent.classList.add('_active-sml');
        } else {
          btnParent.classList.add('_active');
        }
      }}, "-=0.3")
  }
  
  if (window.innerWidth > 1180) {
    gsap.registerPlugin(ScrollTrigger);
  
    let new2Tl = gsap.timeline({defaults: {duration: 1}, scrollTrigger: {
      trigger: ".benefits",
      start: "top bottom-=350px"
    }})
    .from(".benefits__top-title", {
      x: -200,
      opacity: 0
    })
    .from(".benefits__top-anth-lang", {
      x: 200,
      opacity: 0
    }, "-=0.5")
    .from(".benefits__item",  {
      y: 50,
      opacity: 0,
      stagger: 0.4
    }, "-=0.5")
    .from(".benefits__bottom",  {
      opacity: 0,
      height: 0
    }, "-=0.5")
  
    let new3Tl = gsap.timeline({defaults: {duration: 2}, scrollTrigger: {
      trigger: ".old-man__body",
      start: "top bottom-=250px"
    }})
    .from(".old-man__body",  {
        opacity: 0,
        width: 0
    })
    .from(".old-man__title",  {
        opacity: 0,
        skewX: 25
    }, "-=0.5")
    .from(".old-man__text",  {
        opacity: 0,
        x: 50
    }, "-=1.5")
    .from(".old-man__author",  {
        opacity: 0,
        y: 35
    }, "-=1.5")
    .from(".old-man__details",  {
        opacity: 0,
    }, "-=1.5");
  
    let new4Tl = gsap.timeline({defaults: {duration: 1}, scrollTrigger: {
      trigger: ".home",
      start: "top bottom-=350px"
    }})
    .from(".home__top-title",  {
      opacity: 0,
      x: -200
    })
    .from(".home__top-anth-lang", {
      x: 200,
      opacity: 0
    }, "-=0.5")
    .from(".home__list-text", {
      y: 40,
      skewY: 5,
      opacity: 0,
      stagger: 0.3
    }, "-=0.5")
    .from(".home__details", {
      x: 225,
      opacity: 0
    }, "-=1")
  
    const animItems = () => {
      let new6Tl = gsap.timeline({defaults: {duration: .5}, repeat: -1, repeatDelay: 2, scrollTrigger: {
        trigger: ".safety__items",
        start: "top bottom"
      }})
      .to(".safety__item", {
        y: -35,
        stagger: 0.1
      })
      .to(".safety__item", {
        ease: "bounce.out",
        y: 0,
      })
      return new6Tl;
    };
  
    const elemStopAnimate = document.querySelector('.safety__items');
  
    let new5Tl = gsap.timeline({defaults: {duration: 1}, scrollTrigger: {
      trigger: ".safety",
      start: "top bottom-=100px"
    }})
    .from(".safety__top-title",  {
      opacity: 0,
      x: -200
    })
    .from(".safety__details", {
      x: 225,
      opacity: 0
    })
    const animItem = animItems()
    
    elemStopAnimate.addEventListener('mouseover', () => {
      animItem.pause();
    })
    elemStopAnimate.addEventListener('mouseleave', () => {
      animItem.play();
    })
  
    let new7Tl = gsap.timeline({defaults: {duration: 1}, scrollTrigger: {
      trigger: ".start",
      start: "top bottom-=300px"
    }})
    .from(".start__top-title",  {
      opacity: 0,
      x: -200
    })
    .from(".start__top-anth-lang", {
      x: 200,
      opacity: 0
    }, "-=0.5")
    .from(".start__item", {
      x: 150,
      scale: 0.5,
      opacity: 0,
      stagger: 0.3,
    })
  
    let new8Tl = gsap.timeline({defaults: {duration: 1}, scrollTrigger: {
      trigger: ".news",
      start: "top bottom-=150px"
    }})
    .from(".news__item",  {
      opacity: 0,
      stagger: 0.3
    })
  }
};

window.onload = myAnime();