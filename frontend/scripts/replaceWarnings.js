const fs = require('fs');
const path = require('path');

function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  });
}

const replacements = [
  // Dashboard text
  { from: /Warning Window\s*<\/span>\s*<span[^>]*>[^<]*minutes<\/span>/gi, to: 'Early Warning Window</span>\n                <span className="font-bold text-red-600">UP TO 24 HOURS</span>' },
  { from: /Warning Window\s*<\/span>\s*<span[^>]*>[^<]*min<\/span>/gi, to: 'Early Warning Window</span>\n                <span className="font-bold text-red-600">UP TO 24 HOURS</span>' },
  { from: /Warning Window\s*:\s*<span[^>]*>[^<]*min<\/span>/gi, to: 'Early Warning Window:\n                <span className="font-bold text-red-600">UP TO 24 HOURS</span>' },
  { from: /Estimated Warning Window/gi, to: 'Early Warning Window' },
  
  // Hardcoded values in text
  { from: /\b\d{2}[–-]\d{2} minutes\b/gi, to: 'UP TO 24 HOURS' },
  { from: /\b\d{2}[–-]\d{2} min\b/gi, to: 'UP TO 24 HOURS' },
  { from: /\bUp to 6 Hours\b/gi, to: 'UP TO 24 HOURS' },
  
  // Table headers
  { from: /<th[^>]*>Warning Window<\/th>/gi, to: '<th className="px-4 py-3">Early Warning Window</th>' },
  
  // Component labels (like RiskMap or Emergency Response)
  { from: /Warning Window:/gi, to: 'Early Warning Window:' },
  { from: /Window:/gi, to: 'Early Warning Window:' },
];

walkSync('src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${filepath}`);
  }
});
