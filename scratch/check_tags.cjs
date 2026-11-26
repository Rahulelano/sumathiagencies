const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');
const lines = content.split('\n');
const items = [];
let cur = {};
lines.forEach(l => {
  const num = l.match(/number:\s*'([^']+)'/);
  if (num) cur.number = num[1];
  const tag = l.match(/tag:\s*'([^']+)'/);
  if (tag) cur.tag = tag[1];
  const title = l.match(/title:\s*'([^']+)'/);
  if (title) {
    cur.title = title[1];
    items.push({ ...cur });
    cur = {};
  }
});
console.log(JSON.stringify(items, null, 2));
