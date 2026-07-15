import { Grainient } from './grainient.js';
import { applyGradualBlur } from './gradual-blur.js';
import { initBeams } from './beams.js';

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================
     Splash Screen Animation
     ======================================= */
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    document.body.style.overflow = 'hidden';

    // 1. SVG Line Drawing (squiggles and diagonals)
    anime({
      targets: '.s-svg path, .s-svg line',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: anime.stagger(100)
    });

    // 2. Solid Shapes Pop In
    anime({
      targets: '.s-shape:not(.s-svg)',
      scale: [0, 1],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .6)',
      duration: 1200,
      delay: anime.stagger(50, { start: 300 })
    });

    // 3. Text Letter Reveal
    const logoText = document.querySelector('.splash-logo');
    if (logoText) {
      logoText.innerHTML = logoText.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");

      anime({
        targets: '.splash-logo .letter',
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(40, { start: 500 })
      });
    }

    // 4. Outro Animation
    setTimeout(() => {
      // Shapes and text fly out/fade
      anime({
        targets: '.s-shape, .splash-logo',
        translateY: -100,
        opacity: 0,
        easing: 'easeInExpo',
        duration: 600,
        delay: anime.stagger(30)
      });

      // Background slides up
      anime({
        targets: splashScreen,
        translateY: '-100%',
        easing: 'easeInOutExpo',
        duration: 800,
        delay: 400,
        complete: () => {
          splashScreen.style.display = 'none';
          document.body.style.overflow = 'auto';

          // Initialize Grainient here to avoid rendering under splash
          const darkveilContainers = document.querySelectorAll('.darkveil-container, #darkveil-container');
          darkveilContainers.forEach(container => {
            // Remove any legacy CSS backgrounds
            container.style.background = 'none';
            new Grainient(container, {
              color1: '#0a0a0a',
              color2: '#1e1b4b',
              color3: '#0a0a0a',
              timeSpeed: 0.15,
              warpStrength: 1.5,
              warpFrequency: 4.0,
              warpAmplitude: 40.0,
              blendSoftness: 0.2,
              contrast: 1.2
            });
          });
        }
      });
    }, 2200); // Wait for intro to finish
  }
  /* =======================================
     SVG Network Generation (Hero)
     ======================================= */
  const canvas = document.getElementById('network-canvas');
  if (canvas) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const numNodes = 20;
    const nodes = [];

    // Generate nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height
      });
    }

    let paths = '';
    // Generate connecting lines
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() > 0.8) {
          paths += `<path d="M ${nodes[i].x} ${nodes[i].y} L ${nodes[j].x} ${nodes[j].y}" fill="none" stroke="rgba(139, 92, 246, 0.2)" stroke-width="1" class="network-line" />`;
        }
      }
    }

    canvas.innerHTML = paths;

    // Animate drawing lines
    anime({
      targets: '.network-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      delay: function (el, i) { return i * 50 },
      direction: 'alternate',
      loop: true
    });
  }

  /* =======================================
     Decrypt Effect (DNA Section) - Intersection Observer
     ======================================= */
  const decryptElements = document.querySelectorAll('.decrypt-text');
  const decryptChars = '!<>-_\\\\/[]{}—=+*^?#________';

  const decryptObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        let originalText = el.getAttribute('data-text');
        let frame = 0;
        let interval = setInterval(() => {
          el.innerText = originalText.split('').map((char, index) => {
            if (index < frame) return char;
            return decryptChars[Math.floor(Math.random() * decryptChars.length)];
          }).join('');

          if (frame >= originalText.length) {
            clearInterval(interval);
            el.innerText = originalText;
          }
          frame += 1 / 3; // animation speed
        }, 30);
        decryptObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  decryptElements.forEach(el => decryptObserver.observe(el));

  /* =======================================
     Hero Text Stagger
     ======================================= */
  anime({
    targets: '.hero-text-reveal',
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.9, 1],
    easing: 'easeOutExpo',
    duration: 1500,
    delay: 500
  });

  /* =======================================
     Bento Box Interactive SVGs
     ======================================= */
  const bentoCards = document.querySelectorAll('.svg-interactive');

  bentoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const shape = card.querySelector('.draw-shape');
      if (shape) {
        anime.remove(shape);
        anime({
          targets: shape,
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1500,
        });
      }
    });
  });

  /* =======================================
     Continuous SVG Animations
     ======================================= */
  anime({
    targets: '.anim-spin',
    rotate: '1turn',
    duration: 10000,
    easing: 'linear',
    loop: true,
    transformOrigin: ['50% 50%', '50% 50%']
  });

  anime({
    targets: '.pulse-shape',
    scale: [0.9, 1.2],
    opacity: [0.3, 0.8],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 2000
  });

  anime({
    targets: '.float-shape',
    translateY: [-5, 5],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 3000
  });

  /* =======================================
     Scroll Triggered Stagger (Intersection Observer)
     ======================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.kanban-card, .bento-card, .cap-card, .project-row');
        anime({
          targets: cards,
          translateY: [100, 0],
          opacity: [0, 1],
          delay: anime.stagger(150),
          easing: 'easeOutExpo',
          duration: 1200
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.staggered-entry').forEach(el => {
    // Hide initially via CSS or AnimeJS setup
    const cards = el.querySelectorAll('.kanban-card, .bento-card, .cap-card, .project-row');
    anime.set(cards, { translateY: 100, opacity: 0 });
    observer.observe(el);
  });

  /* =======================================
     Portfolio 3D Float Effect
     ======================================= */
  const portfolioCards = document.querySelectorAll('.hover-3d');

  portfolioCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  /* =======================================
     Localized Magnetic Cursor (Portfolio)
     ======================================= */
  const previewCursor = document.getElementById("project-preview-cursor");
  const projectRows = document.querySelectorAll(".project-row");

  if (previewCursor) {
    document.addEventListener("mousemove", (e) => {
      previewCursor.style.left = e.clientX + "px";
      previewCursor.style.top = e.clientY + "px";
    });

    projectRows.forEach(row => {
      row.addEventListener("mouseenter", () => {
        const previewUrl = row.getAttribute('data-preview');
        const img = previewCursor.querySelector('.cursor-image');
        if (previewUrl && img) {
          img.src = previewUrl;
          previewCursor.classList.add("has-image");
        }
        previewCursor.classList.add("active");
      });
      row.addEventListener("mouseleave", () => {
        previewCursor.classList.remove("active");
        previewCursor.classList.remove("has-image");
      });
    });
  }
  /* =======================================
     Horizontal Accordion (Capabilities)
     ======================================= */
  const svcCards = document.querySelectorAll('.svc-card');
  if (svcCards.length > 0) {
    svcCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active state from all
        svcCards.forEach(c => {
          c.setAttribute('data-active', 'false');
          c.style.flex = ''; // Reset flex to fallback to CSS default
        });

        // Set clicked to active
        card.setAttribute('data-active', 'true');
      });
    });
  }

  /* =======================================
     Apple Cards Carousel migrated to main.js
     ======================================= */

  /* =======================================
     Features Bento Grid Logic
     ======================================= */
  // 1. Floating Images for Card 2
  const floatContainer = document.getElementById('floating-images-container');
  if (floatContainer) {
    const images = [
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=300",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=300",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=300",
      "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=300",
      "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=300",
    ];

    let row1 = '<div class="float-row">';
    images.forEach(img => {
      const rot = Math.random() * 20 - 10;
      row1 += `<img src="${img}" class="float-img" style="transform: rotate(${rot}deg);" />`;
    });
    row1 += '</div>';

    let row2 = '<div class="float-row">';
    images.forEach(img => {
      const rot = Math.random() * 20 - 10;
      row2 += `<img src="${img}" class="float-img" style="transform: rotate(${rot}deg);" />`;
    });
    row2 += '</div>';

    floatContainer.innerHTML = row1 + row2;
  }

  // 2. Cobe Globe for Card 4
  const cobeCanvas = document.getElementById('cobe-globe');
  if (cobeCanvas) {
    import('https://esm.sh/cobe').then(module => {
      const createGlobe = module.default;
      let phi = 0;

      const globe = createGlobe(cobeCanvas, {
        devicePixelRatio: 2,
        width: 800,
        height: 800,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 4000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        }
      });
    }).catch(err => console.error('Failed to load Cobe globe:', err));
  }



  /* =======================================
     Live Preview Modal Logic
     ======================================= */
  const previewModal = document.getElementById('live-preview-modal');
  const previewIframe = document.getElementById('preview-iframe');
  const previewTitle = document.getElementById('preview-modal-title');
  const previewCloseBtn = document.getElementById('preview-close-btn');
  const previewBentoCards = document.querySelectorAll('.bento-card[data-preview-url]');

  if (previewModal && previewBentoCards.length > 0) {
    previewBentoCards.forEach(card => {
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-preview-url');
        const title = card.getAttribute('data-preview-title');

        if (url) {
          previewTitle.textContent = title || 'Live Preview';
          previewIframe.src = url;
          previewModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      previewModal.classList.remove('active');
      setTimeout(() => {
        previewIframe.src = '';
      }, 300);
      document.body.style.overflow = '';
    };

    if (previewCloseBtn) {
      previewCloseBtn.addEventListener('click', closeModal);
    }

    // Close on click outside
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        closeModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && previewModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

// --- Impact Glow Counter Animation ---
const statsSection = document.querySelector('.impact-glow-section');
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

if (statsSection && counters.length > 0) {
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing function (easeOutExpo)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(ease * target);

        counter.innerText = currentCount;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

    ScrollTrigger.create({
      trigger: statsSection,
      start: "top 80%",
      onEnter: () => {
        if (!hasAnimated) {
          hasAnimated = true;
          animateCounters();
          
          // Explode stats animation
          gsap.fromTo(".impact-stat-item", 
            { y: 100, scale: 0.5, opacity: 0 }, 
            { y: 0, scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "back.out(1.5)" }
          );
        }
      }
    });
  }

  // --- Phase 1: Crazy Manifesto Kinetic Text ---
  const manifestoLines = document.querySelectorAll('.manifesto-line');
  if (manifestoLines.length > 0) {
    // Utility to split text into word spans
    manifestoLines.forEach(line => {
      const text = line.innerText;
      line.innerHTML = text.split(' ').map(word => `<span class="manifesto-word" style="display:inline-block; opacity:0; transform:translateY(50px) scale(0.8) blur(10px);">${word}&nbsp;</span>`).join('');
    });

    // Animate words on scroll
    gsap.to('.manifesto-word', {
      scrollTrigger: {
        trigger: ".manifesto-section",
        start: "top 75%",
        end: "center center",
        scrub: 1
      },
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      stagger: 0.05,
      ease: "power2.out"
    });
  }

  // --- Phase 2: Products Hover Interaction ---
  const hoverItems = document.querySelectorAll('.product-hover-item');
  const hoverVideos = document.querySelectorAll('.hover-video');

  hoverItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const target = item.getAttribute('data-target');
      
      // Hide all videos
      hoverVideos.forEach(v => {
        v.classList.remove('active');
        v.pause();
      });
      
      // Show and play target video
      const targetVideo = document.getElementById('bg-video-' + target);
      if (targetVideo) {
        targetVideo.classList.add('active');
        let playPromise = targetVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.log('Video play prevented:', e));
        }
      }
    });
    
    item.addEventListener('mouseleave', () => {
      hoverVideos.forEach(v => {
        v.classList.remove('active');
        v.pause();
      });
    });
  });

  // --- Phase 2: Inside MadrasThinks (Live Roadmap) ---
  const roadmapBars = document.querySelectorAll('.roadmap-progress-fill');
  roadmapBars.forEach(bar => {
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: "top 85%", 
        once: true
      },
      width: (i, target) => target.getAttribute('data-progress'),
      duration: 1.5,
      ease: "power3.out"
    });
  });

  // --- Phase 1: Section 4 Engineering Process Timeline ---
  const processSection = document.querySelector('.process-section');
  const processContainer = document.querySelector('.process-timeline-container');
  const processSteps = document.querySelectorAll('.timeline-step');
  const processProgress = document.querySelector('.timeline-progress');

  if (processSection && processContainer && processSteps.length > 0) {
    const totalScrollWidth = processContainer.scrollWidth - window.innerWidth;
    
    let processTween = gsap.to(processContainer, {
      x: () => -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: processSection,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + totalScrollWidth,
        invalidateOnRefresh: true
      }
    });

    // Animate the progress line
    gsap.to(processProgress, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: processSection,
        start: "top top",
        end: () => "+=" + totalScrollWidth,
        scrub: 1
      }
    });

    // Illuminate steps
    processSteps.forEach(step => {
      ScrollTrigger.create({
        trigger: step,
        containerAnimation: processTween,
        start: "left center",
        end: "right center",
        onEnter: () => step.classList.add("active"),
        onLeave: () => step.classList.remove("active"),
        onEnterBack: () => step.classList.add("active"),
        onLeaveBack: () => step.classList.remove("active")
      });
    });
  }

  /* =======================================
     GradualBlur Integration
     ======================================= */
  const hqSection = document.getElementById('contact-info');
  if (hqSection) {
    // Apply gradual blur to the bottom of the HQ section
    applyGradualBlur(hqSection, {
      position: 'bottom',
      height: '6rem',
      strength: 2,
      divCount: 5,
      curve: 'bezier',
      exponential: true,
      opacity: 1
    });
  }

  /* =======================================
     Beams Background
     ======================================= */
  const beamsContainer = document.getElementById('beams-container');
  if (beamsContainer) {
    initBeams(beamsContainer, {
      beamWidth: 2,
      beamHeight: 15,
      beamNumber: 15,
      lightColor: '#ffffff',
      speed: 2,
      noiseIntensity: 1.75,
      scale: 0.2,
      rotation: 0,
      backgroundColor: '#0a0a0a' // matches HQ background roughly, but wait, the section background is transparent or #080808
    });
  }

});
