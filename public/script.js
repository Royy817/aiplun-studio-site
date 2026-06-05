const menuToggle = document.querySelector('.menu-toggle');
const globalNav = document.querySelector('.global-nav');
const year = document.getElementById('year');
const tiltCards = document.querySelectorAll('.tilt-card');
const revealItems = document.querySelectorAll('.reveal');
const introGate = document.querySelector('.intro-gate');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = Boolean(window.gsap && window.ScrollTrigger && !reduceMotion);
const hasIntro = Boolean(introGate);
const motionTargets = document.querySelectorAll([
  '.section-heading h2',
  '.section-heading .lead',
  '.section-heading .eyebrow',
  '.hero-content .lead',
  '.hero-content p:not(.eyebrow)',
  '.trust > .container > p',
  '.section-note',
  '.service-card',
  '.price-card',
  '.price-notes',
  '.monitor-items .card',
  '.concern-item',
  '.flow-list li',
  '.faq-list details',
  '.case-card',
  '.works-story',
  '.work-feature',
  '.project-row',
  '.project-browser',
  '.final-cta-inner h2',
  '.final-cta-inner p',
  '.cta-row',
  '.visual-card',
  '.comparison-table-wrap',
  '.comparison-card',
  '.plan-detail-card',
  '.plan-page-hero'
].join(','));

if (year) {
  year.textContent = new Date().getFullYear();
}

if (hasIntro) {
  document.body.classList.add('intro-active');
}

if (menuToggle && globalNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = globalNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  globalNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      globalNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const splitHeroTitle = () => {
  document.querySelectorAll('.hero h1 > span').forEach((line) => {
    if (line.dataset.split === 'true') return;
    if (line.querySelector('.hero-emphasis-white')) return;
    const text = line.textContent;
    line.textContent = '';
    line.dataset.split = 'true';

    [...text].forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'hero-char';
      charSpan.textContent = char === ' ' ? '\u00a0' : char;
      line.appendChild(charSpan);
    });
  });
};

const splitIntroLogo = () => {
  const logo = document.querySelector('.intro-mark strong');
  if (!logo || logo.dataset.split === 'true') return;

  const text = logo.textContent.trim();
  logo.textContent = '';
  logo.dataset.text = logo.dataset.text || text;
  logo.dataset.split = 'true';

  [...text].forEach((char, index) => {
    const charSpan = document.createElement('span');
    charSpan.className = 'intro-char';
    charSpan.style.setProperty('--char-index', index);
    charSpan.textContent = char === ' ' ? '\u00a0' : char;
    logo.appendChild(charSpan);
  });
};

const enableHeroCharSplit = false;
if (hasGsap && enableHeroCharSplit) {
  splitHeroTitle();
}
splitIntroLogo();

motionTargets.forEach((item, index) => {
  item.classList.add('motion-item');
  item.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 70}ms`);
});

const initHeroVideo = () => {
  const video = document.querySelector('.hero-video-bg');
  const source = video?.dataset.videoSrc;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!video || !source || reduceMotion || connection?.saveData || video.dataset.loaded === 'true') {
    return;
  }

  if (connection && /(^|-)2g$/.test(connection.effectiveType || '')) {
    return;
  }

  const loadVideo = () => {
    if (video.dataset.loaded === 'true') return;

    video.dataset.loaded = 'true';
    video.addEventListener('canplay', () => {
      video.classList.add('is-loaded');
    }, { once: true });
    video.src = source;
    video.load();

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  const scheduleIdleLoad = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadVideo, { timeout: 4200 });
    } else {
      window.setTimeout(loadVideo, 3200);
    }
  };

  if (document.readyState === 'complete') {
    window.setTimeout(scheduleIdleLoad, 1800);
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(scheduleIdleLoad, 1800);
    }, { once: true });
  }
};

const finishIntro = () => {
  if (document.body.classList.contains('intro-finished')) {
    return;
  }

  document.body.classList.remove('intro-active');
  document.body.classList.add('intro-finished');
  if (window.gsap) {
    gsap.set(['.site-header', 'main'], { autoAlpha: 1, clearProps: 'visibility,opacity' });
    gsap.set('.hero h1 > span', {
      autoAlpha: 1,
      y: 0,
      rotateX: 0,
      clearProps: 'visibility,opacity,transform'
    });
    gsap.set(['.hero-content > *', '.hero-gallery img'], {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      clearProps: 'visibility,opacity,transform'
    });
  }
  if (introGate) {
    introGate.setAttribute('hidden', '');
    introGate.style.display = 'none';
  }
  initHeroVideo();
};

const initFallbackAnimations = () => {
  const observeTargets = [...revealItems, ...motionTargets];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    observeTargets.forEach((item) => observer.observe(item));
  } else {
    observeTargets.forEach((item) => item.classList.add('is-visible'));
  }
};

const initGsapAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(motionTargets, { autoAlpha: 0, y: 26 });
  gsap.set(revealItems, { autoAlpha: 0, y: 22 });
  gsap.set(['.hero-content', '.hero-gallery'], { autoAlpha: 1, y: 0 });
  gsap.set(['.site-header', 'main'], { autoAlpha: 1 });
  gsap.set('.intro-char', {
    transformPerspective: 1200,
    transformOrigin: '50% 52%'
  });
  gsap.set('.intro-mark strong', { clipPath: 'inset(0 50% 0 50%)' });
  gsap.set('.intro-water-bg', { scale: 1.08 });
  gsap.set('.intro-ripple', { autoAlpha: 0, scale: 0.16 });
  gsap.set('.intro-light', { autoAlpha: 0, scaleX: 0.24 });
  gsap.set('.intro-current', { autoAlpha: 1 });

  const introTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: finishIntro
  });

  window.setTimeout(() => {
    if (document.body.classList.contains('intro-active')) {
      introTimeline.kill();
      finishIntro();
    }
  }, 4300);

  introTimeline
    .fromTo('.intro-water-bg', { scale: 1.1, autoAlpha: 0.88 }, { scale: 1.03, autoAlpha: 0.98, duration: 1.05, ease: 'power2.out' })
    .fromTo('.intro-mist', { autoAlpha: 0.22, xPercent: -5 }, { autoAlpha: 0.72, xPercent: 4, duration: 1.1, ease: 'sine.inOut' }, '<')
    .fromTo('.intro-mark', { autoAlpha: 0, y: 14, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.56, ease: 'power3.out' }, '-=0.72')
    .to('.intro-mark strong', { clipPath: 'inset(0 0% 0 0%)', duration: 0.82, ease: 'expo.out' }, '-=0.28')
    .fromTo('.intro-char', { autoAlpha: 0, y: 20, scale: 0.78, rotateX: 20 }, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, stagger: { amount: 0.46, from: 'center' }, duration: 0.62, ease: 'power3.out' }, '-=0.66')
    .to('.intro-mark strong', { scale: 1.025, duration: 0.3, ease: 'power2.out' }, '-=0.04')
    .to('.intro-mark strong', { scale: 1, duration: 0.24, ease: 'power2.inOut' })
    .to('.intro-char', { autoAlpha: 0, y: -8, scale: 0.9, rotateX: 24, stagger: { amount: 0.2, from: 'center' }, duration: 0.38, ease: 'power2.in' }, '+=0.14')
    .to('.intro-ripple-one', { autoAlpha: 0.9, scale: 6.8, duration: 1.08, ease: 'expo.out' }, '-=0.18')
    .to('.intro-ripple-two', { autoAlpha: 0.58, scale: 9.5, duration: 1.22, ease: 'expo.out' }, '<0.08')
    .to('.intro-light', { autoAlpha: 0.92, scaleX: 1.08, duration: 0.62, ease: 'power2.out' }, '<0.1')
    .to('.intro-current-left', { yPercent: -108, xPercent: -8, rotation: -2.4, duration: 1.12, ease: 'expo.inOut' }, '-=0.42')
    .to('.intro-current-right', { yPercent: 108, xPercent: 8, rotation: 2.4, duration: 1.12, ease: 'expo.inOut' }, '<')
    .to('.intro-water-bg', { scale: 1.18, autoAlpha: 0.48, duration: 1.06, ease: 'power2.out' }, '<')
    .to('.intro-mist', { autoAlpha: 0.08, scale: 1.24, duration: 0.72, ease: 'power2.out' }, '-=0.48')
    .to('.intro-ripple', { autoAlpha: 0, duration: 0.46, ease: 'power2.out' }, '<')
    .to('.intro-gate', { autoAlpha: 0, duration: 0.55, ease: 'power2.out' }, '-=0.12')
    .from('.site-header', { y: -18, autoAlpha: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-content > *:not(h1)', { autoAlpha: 0, y: 26, stagger: 0.09, duration: 0.8 }, '-=0.32')
    .from('.hero h1 > span', { autoAlpha: 0, y: 28, rotateX: -12, transformOrigin: '50% 100%', stagger: 0.08, duration: 0.78, ease: 'power3.out' }, '-=0.76')
    .from('.hero-gallery img', { autoAlpha: 0, y: 28, rotate: -1.5, scale: 0.96, stagger: 0.08, duration: 0.75 }, '-=0.56');

  window.setTimeout(() => {
    if (document.body.classList.contains('intro-active')) {
      finishIntro();
    }
  }, 6200);

  gsap.utils.toArray(motionTargets).forEach((item) => {
    gsap.to(item, {
      autoAlpha: 1,
      y: 0,
      duration: 0.86,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 86%',
        once: true
      }
    });
  });

  gsap.utils.toArray(revealItems).forEach((item) => {
    gsap.to(item, {
      autoAlpha: 1,
      y: 0,
      duration: 0.86,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        once: true
      }
    });
  });

  gsap.utils.toArray('.card, .case-card, .concern-item').forEach((item) => {
    gsap.fromTo(item, {
      clipPath: 'inset(0 0 8% 0)',
    }, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        once: true
      }
    });
  });

  gsap.to('.hero-gallery img:first-child', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.from('.project-row', {
    x: 44,
    autoAlpha: 0,
    stagger: 0.16,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.works-cinematic',
      start: 'top 72%',
      once: true
    }
  });

  gsap.from('.project-browser img', {
    y: 36,
    scale: 0.96,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.project-browser',
      start: 'top 78%',
      once: true
    }
  });
};

if (hasIntro && hasGsap) {
  initGsapAnimations();
} else {
  if (hasIntro) {
    setTimeout(finishIntro, 1900);
  } else {
    initHeroVideo();
  }
  initFallbackAnimations();
}

if (!reduceMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${x * 4}deg`);
      card.style.setProperty('--tilt-y', `${y * -4}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}
