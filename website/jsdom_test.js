import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('index.html', 'utf8');
const scriptContent = fs.readFileSync('animations.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });

// Mock anime and gsap
dom.window.anime = function() {};
dom.window.anime.setDashoffset = 0;
dom.window.anime.stagger = function() {};
dom.window.anime.set = function() {};
dom.window.anime.remove = function() {};

dom.window.gsap = {
  quickSetter: () => () => {},
  to: () => {}
};

dom.window.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
};

try {
  dom.window.eval(scriptContent);
  
  // Trigger DOMContentLoaded manually since scripts ran after
  const event = dom.window.document.createEvent('Event');
  event.initEvent('DOMContentLoaded', true, true);
  dom.window.document.dispatchEvent(event);

  const chromaGrid = dom.window.document.getElementById('chroma-grid');
  console.log("Grid HTML length:", chromaGrid ? chromaGrid.innerHTML.length : "NOT FOUND");
  
  console.log("No errors!");
} catch (e) {
  console.error("Execution error:", e);
}
