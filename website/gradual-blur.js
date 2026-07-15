// Vanilla JS port of GradualBlur component

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  target: 'parent'
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const getGradientDirection = position =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  })[position] || 'to bottom';

export function applyGradualBlur(container, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options };
  
  const blurWrapper = document.createElement('div');
  blurWrapper.className = `gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'}`;
  
  const isVertical = ['top', 'bottom'].includes(config.position);
  const isHorizontal = ['left', 'right'].includes(config.position);
  
  Object.assign(blurWrapper.style, {
    position: config.target === 'page' ? 'fixed' : 'absolute',
    pointerEvents: 'none',
    zIndex: config.target === 'page' ? config.zIndex + 100 : config.zIndex,
  });

  if (isVertical) {
    blurWrapper.style.height = config.height;
    blurWrapper.style.width = '100%';
    blurWrapper.style[config.position] = '0';
    blurWrapper.style.left = '0';
    blurWrapper.style.right = '0';
  } else if (isHorizontal) {
    blurWrapper.style.width = config.height;
    blurWrapper.style.height = '100%';
    blurWrapper.style[config.position] = '0';
    blurWrapper.style.top = '0';
    blurWrapper.style.bottom = '0';
  }

  const inner = document.createElement('div');
  inner.className = 'gradual-blur-inner';
  Object.assign(inner.style, {
    position: 'relative',
    width: '100%',
    height: '100%'
  });

  const increment = 100 / config.divCount;
  const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

  for (let i = 1; i <= config.divCount; i++) {
    let progress = i / config.divCount;
    progress = curveFunc(progress);

    let blurValue;
    if (config.exponential) {
      blurValue = Math.pow(2, progress * 4) * 0.0625 * config.strength;
    } else {
      blurValue = 0.0625 * (progress * config.divCount + 1) * config.strength;
    }

    const p1 = Math.round((increment * i - increment) * 10) / 10;
    const p2 = Math.round(increment * i * 10) / 10;
    const p3 = Math.round((increment * i + increment) * 10) / 10;
    const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

    let gradient = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) gradient += `, black ${p3}%`;
    if (p4 <= 100) gradient += `, transparent ${p4}%`;

    const direction = getGradientDirection(config.position);

    const div = document.createElement('div');
    Object.assign(div.style, {
      position: 'absolute',
      inset: '0',
      maskImage: `linear-gradient(${direction}, ${gradient})`,
      WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
      backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
      WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
      opacity: config.opacity
    });
    
    inner.appendChild(div);
  }

  blurWrapper.appendChild(inner);
  container.appendChild(blurWrapper);
  
  return blurWrapper;
}
