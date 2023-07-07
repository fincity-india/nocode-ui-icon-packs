
const fa1 = require('./data/fa-icons1.json');
const fa2 = require('./data/fa-icons2.json');
const fa3 = require('./data/fa-icons3.json');

const fs = require('fs');

const result = [fa1.results[0].hits, fa2.results[0].hits, fa3.results[0].hits]
    .flatMap(e => e)
    .flatMap(e => {
        const o = {n: "fa-"+e.name, d: e.label, k: e.keywords.join("").toLowerCase()};
        return e.membership.free.map(t =>{
            x = {...o, n: "fa-"+t+" "+o.n};
            return {type : t, obj: x};
        });
    })
    .reduce((acc, e) => {
        if (acc[e.type] === undefined) {
            acc[e.type] = [];
        }
        acc[e.type].push(e.obj);
        return acc;
    });


fs.mkdirSync('./dist/fonts/FREE_FONT_AWESOME_ALL/', { recursive: true });
fs.mkdirSync('./dist/fonts/FREE_FONT_AWESOME_SOLID_ONLY/', { recursive: true });
fs.mkdirSync('./dist/fonts/FREE_FONT_AWESOME_REGULAR_ONLY/', { recursive: true });

fs.writeFileSync('./dist/fonts/FREE_FONT_AWESOME_ALL/font.json', JSON.stringify([...result.solid, ...result.regular]), err => {});
fs.writeFileSync('./dist/fonts/FREE_FONT_AWESOME_SOLID_ONLY/font.json', JSON.stringify(result.solid), err => {});
fs.writeFileSync('./dist/fonts/FREE_FONT_AWESOME_REGULAR_ONLY/font.json', JSON.stringify(result.regular), err => {});
