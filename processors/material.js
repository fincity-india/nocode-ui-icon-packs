const material = require('./data/mat-icons.json');
const fs = require('fs');

const result = material.map(e => {
    const s = new Set(e.unsupported_families);
    const ms = s.has("Material Icons");

    const obj = {n : (ms ? 'mso' : 'mio')+"-"+e.name, d:e.name, k: e.tags.join("").toLowerCase()};

    return {
        obj, css: `.${obj.n}::before{content:'\\${e.codepoint.toString(16)}'}`, ms
    };
}).reduce( (a,e) => {
    if(e.ms) {a.ms.json.push(e.obj); a.ms.css += e.css;}
    else {a.mi.json.push(e.obj); a.mi.css += e.css;}
    return a;
}, {
    ms: {json:[], css:""},
    mi: {json:[], css:""}
});

fs.mkdirSync('./dist/fonts/MATERIAL_ICONS/', { recursive: true });
fs.mkdirSync('./dist/fonts/MATERIAL_SYMBOLS/', { recursive: true });

fs.writeFileSync('./dist/fonts/MATERIAL_ICONS/font.json', JSON.stringify(result.mi.json), err => {});
fs.writeFileSync('./dist/fonts/MATERIAL_ICONS/font.css', result.mi.css, err => {});
fs.writeFileSync('./dist/fonts/MATERIAL_SYMBOLS/font.json', JSON.stringify(result.ms.json), err => {});
fs.writeFileSync('./dist/fonts/MATERIAL_SYMBOLS/font.css', result.ms.css, err => {});