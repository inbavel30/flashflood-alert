const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');
code = code.replace(/warningWindow: '.*?'/g, "warningWindow: 'UP TO 24 HOURS'");
fs.writeFileSync('src/store/useStore.ts', code);
