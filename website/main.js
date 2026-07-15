import anime from 'animejs';

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------------------
  // 00 — HERO: Initial Loading
  // -----------------------------------------------------
  const tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1200
  });

  tl.add({
    targets: '.navbar',
    opacity: [0, 1],
    translateY: [-20, 0],
  })
  .add({
    targets: ['.hero-pill', '.hero-title', '.hero-subtitle', '.hero-actions'],
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(150),
  }, '-=800');

  // -----------------------------------------------------
  // 03 — CRAFT: Terminal Typing Loop
  // -----------------------------------------------------
  const craftTyper = document.getElementById('craft-typer');
  if (craftTyper) {
    const lines = [
      "Executing: Enterprise Architecture...",
      "Connecting: Scalable Systems...",
      "Verifying: Cryptographic Trust...",
      "Deploying: Zero-Downtime Infrastructure...",
      "System Ready. Awaiting Input."
    ];
    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeLoop() {
      const line = lines[currentLine];
      
      if (isDeleting) {
        craftTyper.innerText = line.substring(0, currentChar - 1);
        currentChar--;
      } else {
        craftTyper.innerText = line.substring(0, currentChar + 1);
        currentChar++;
      }

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && currentChar === line.length) {
        speed = 2000; // Pause at end of line
        isDeleting = true;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentLine = (currentLine + 1) % lines.length;
        speed = 500; // Pause before next line
      }

      setTimeout(typeLoop, speed);
    }
    
    // Start typing when section is visible
    const craftSection = document.getElementById('craft');
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        typeLoop();
        observer.unobserve(craftSection);
      }
    });
    if (craftSection) observer.observe(craftSection);
  }

  // -----------------------------------------------------
  // 01 — ORIGIN: Mouse Tracking Orb
  // -----------------------------------------------------
  // Sections 01-06: Interactions are now fully CSS-driven (Stark Brutal Minimalism)

  // -----------------------------------------------------
  // 08 — WORK: Random Spotlight Illumination
  // -----------------------------------------------------
  const marqueeWords = document.querySelectorAll('.marquee-word');
  if (marqueeWords.length > 0) {
    setInterval(() => {
      const randomWord = marqueeWords[Math.floor(Math.random() * marqueeWords.length)];
      randomWord.classList.add('is-illuminated');
      setTimeout(() => randomWord.classList.remove('is-illuminated'), 1000);
    }, 2000);
  }

  // -----------------------------------------------------
  // 09 — SIGNAL: Fog Dissolve
  // -----------------------------------------------------
  const signalFog = document.querySelector('.signal-fog');
  if (signalFog) {
    const signalObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: '.signal-fog',
          opacity: [0, 1],
          filter: ['blur(10px)', 'blur(0px)'],
          translateY: [20, 0],
          delay: anime.stagger(250),
          duration: 1500,
          easing: 'easeOutCubic'
        });
        signalObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    
    signalObserver.observe(signalFog);
  }

  // -----------------------------------------------------
  // 10 — iSad Carousel Rendering
  // -----------------------------------------------------
  const carouselTrack = document.getElementById('apple-carousel-track');
  const appleModal = document.getElementById('apple-carousel-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (carouselTrack) {
    const isadData = [
      { image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop", title: "What is iSad?", text: "An intelligent system designed to bridge the gap between abstract academic research and scalable enterprise solutions." },
      { image: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=1000&auto=format&fit=crop", title: "Student Led", text: "Engineered entirely by the brightest young minds at Madras Engineering College, unburdened by legacy thinking." },
      { image: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=1000&auto=format&fit=crop", title: "Enterprise Scale", text: "Built on a zero-trust, highly scalable architecture capable of handling billion-dollar transaction flows." },
      { image: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=1000&auto=format&fit=crop", title: "Zero Noise", text: "A brutalist approach to problem-solving. We strip away the unnecessary until only pure function remains." },
      { image: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=1000&auto=format&fit=crop", title: "Global Reach", text: "From local innovation to global deployment. Our protocols are designed for the borderless enterprise." }
    ];

    isadData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'apple-carousel-card';
      card.style.cursor = 'pointer';
      card.style.padding = '0'; // We use inner padding now
      card.innerHTML = `
        <img class="ac-bg-img" src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="ac-overlay"></div>
        <div class="ac-content" style="padding: 2.5rem;">
          <div class="ac-title">${item.title}</div>
        </div>
      `;
      carouselTrack.appendChild(card);

      card.addEventListener('click', () => {
        if (modalBody && appleModal) {
          modalBody.innerHTML = `
            <img src="${item.image}" style="width: 100%; height: 350px; object-fit: cover; border-bottom: 2px solid #6C4CFF;" />
            <div style="padding: 3rem;">
              <h3 style="font-family: 'Inter', sans-serif; font-size: clamp(2rem, 5vw, 4rem); font-weight: 900; color: #111; margin-bottom: 2rem; letter-spacing: -0.05em;">${item.title}</h3>
              <p style="font-family: 'Courier New', monospace; font-size: 1.2rem; line-height: 1.6; color: #666; max-width: 600px;">
                <strong style="color: #222;">SYSTEM_LOG //</strong> <br><br>
                ${item.text}
              </p>
            </div>
          `;
          appleModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      if (appleModal) {
        appleModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { if (modalBody) modalBody.innerHTML = ''; }, 300);
      }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  }

});
