const fs = require('fs');
const path = require('path');

// --- Config ---
const deckDir = path.join(__dirname);
const indexPath = path.join(deckDir, 'index.html');

// Helper to convert filename to Title Case (only for display)
function filenameToTitle(name) {
  return name
    .replace(/\.html$/, '')      // Remove .html
    .replace(/^\d+-/, '')         // Remove leading number and dash
    .replace(/[-_]/g, ' ')        // Replace dashes and underscores
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case
}

// Build the HTML for the cards
const cards = fs.readdirSync(deckDir)
  .filter(file => file.endsWith('.html') && file !== 'index.html')
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map(file => {
    const base = file.replace(/\.html$/, ''); // keep the original filename for thumb
    const title = filenameToTitle(file);      // for visible title only
    const thumb = `${base}-thumb.png`;         // thumb matches numbered base!

    const thumbPath = path.join(deckDir, thumb);
    const imgTag = fs.existsSync(thumbPath)
      ? `<img src="${thumb}" alt="${title} thumbnail" />`
      : `
        <div class="generated-thumb">
          <div class="generated-thumb-text">${title}</div>
        </div>
      `;

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

