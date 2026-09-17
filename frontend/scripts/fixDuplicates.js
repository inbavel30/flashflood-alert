const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace duplicate occurrences
code = code.replace(
  `  selectedCommunityVillageId: 'v1',\n  setSelectedCommunityVillageId: (id: string) => set({ selectedCommunityVillageId: id }),\n  selectedCommunityVillageId: 'v1',\n  setSelectedCommunityVillageId: (id) => set({ selectedCommunityVillageId: id }),`,
  `  selectedCommunityVillageId: 'v1',\n  setSelectedCommunityVillageId: (id: string) => set({ selectedCommunityVillageId: id }),`
);

fs.writeFileSync(file, code);
console.log("Fixed duplicates");
