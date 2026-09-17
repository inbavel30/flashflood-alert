const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('selectedCommunityVillageId')) {
  code = code.replace(
    'export interface AppState {',
    "export interface AppState {\n  selectedCommunityVillageId: string;\n  setSelectedCommunityVillageId: (id: string) => void;"
  );

  code = code.replace(
    'role: null,',
    "role: null,\n  selectedCommunityVillageId: 'v1',\n  setSelectedCommunityVillageId: (id) => set({ selectedCommunityVillageId: id }),"
  );

  fs.writeFileSync(file, code);
  console.log("Updated useStore.ts");
} else {
  console.log("Already updated");
}
