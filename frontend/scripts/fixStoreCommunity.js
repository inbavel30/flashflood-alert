const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('selectedCommunityVillageId: string;')) {
  code = code.replace(
    'interface AppState {',
    "interface AppState {\n  selectedCommunityVillageId: string;\n  setSelectedCommunityVillageId: (id: string) => void;"
  );

  code = code.replace(
    'role: null,',
    "role: null,\n  selectedCommunityVillageId: 'v1',\n  setSelectedCommunityVillageId: (id: string) => set({ selectedCommunityVillageId: id }),"
  );

  fs.writeFileSync(file, code);
  console.log("Updated useStore.ts AppState properly.");
} else {
  console.log("Already updated");
}
