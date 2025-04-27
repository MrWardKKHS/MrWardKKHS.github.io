const fs = require('fs');
const path = require('path');

// --- Config ---
const deckDir = path.join(__dirname);
const indexPath = path.join(deckDir, 'index.html');

// Helper to convert filename to Title Case
function filenameToTitle(name) {
  return name
    .replace(/\.html$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Build the HTML for the cards
const cards = fs.readdirSync(deckDir)
  .filter(file => file.endsWith('.html') && file !== 'index.html')
  .map(file => {
    const base = file.replace(/\.html$/, '');
    const title = filenameToTitle(file);
    const thumb = `${base}-thumb.png`;

    const imgTag = fs.existsSync(path.join(deckDir, thumb))
      ? `<img src="${thumb}" alt="${title} thumbnail" />`
      : `<div class="placeholder-thumb">No Preview</div>`;

    return `
      <div class="card">
        <a href="${file}">
          ${imgTag}
          <h3>${title}</h3>
        </a>
      </div>
    `;
  }).join('\n');

// Read and replace the section in index.html
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  /<section id="Slides">([\s\S]*?)<div class="slides-wrapper">[\s\S]*?<\/div>/,
  `<section id="Slides">
    <h2>Slides</h2>
    <div class="slides-wrapper">
      ${cards}
    </div>`
);

fs.writeFileSync(indexPath, indexContent);
console.log('✅ index.html updated with slide cards!');

