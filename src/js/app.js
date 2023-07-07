const ICON_PACK = new Map([[
    'FREE_FONT_AWESOME_ALL',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
],

[
    'MATERIAL_SYMBOLS_OUTLINED',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
],

[
    'MATERIAL_SYMBOLS_ROUNDED',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
],

[
    'MATERIAL_SYMBOLS_SHARP',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
],

[
    'MATERIAL_ICONS_FILLED',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
],

[
    'MATERIAL_ICONS_OUTLINED',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
],

[
    'MATERIAL_ICONS_ROUNDED',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
],

[
    'MATERIAL_ICONS_SHARP',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp',
],

[
    'MATERIAL_ICONS_TWO_TONE',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone',
]]);

const packs = document.getElementById("packs");

Array.from(ICON_PACK.keys()).forEach(e => {
    const option = document.createElement("option");
    option.value = e;
    option.innerText = e;
    packs.append(option);
})

const link1 = document.getElementById("oneLink");
const link2 = document.getElementById("twoLink");

function selectedPack() {
    const pack = packs.value;
    console.log(pack, ICON_PACK.has(pack));
    if (ICON_PACK.has(pack)) {
        document.getElementById("searchDiv").style.display = "block";
        document.getElementById("resultsDiv").style.display = "flex";
    } else {
        document.getElementById("searchDiv").style.display = "none";
        document.getElementById("resultsDiv").style.display = "none";
        packs.value = "";
    }

    link1.href = ICON_PACK.get(pack);

    if (pack.includes("MATERIAL_ICONS_")) 
        link2.href = './fonts/MATERIAL_ICONS/font.css';
    else if (pack.includes("MATERIAL_SYMBOLS_")) 
        link2.href = './fonts/MATERIAL_SYMBOLS/font.css';

    searchdata();
}

const dataMap = new Map([
    ['FREE_FONT_AWESOME_ALL', './fonts/FREE_FONT_AWESOME_ALL/font.json'],
    ['MATERIAL_SYMBOLS_OUTLINED', './fonts/MATERIAL_SYMBOLS/font.json'],
    ['MATERIAL_SYMBOLS_ROUNDED', './fonts/MATERIAL_SYMBOLS/font.json'],
    ['MATERIAL_SYMBOLS_SHARP', './fonts/MATERIAL_SYMBOLS/font.json'],
    ['MATERIAL_ICONS_FILLED', './fonts/MATERIAL_ICONS/font.json'],
    ['MATERIAL_ICONS_OUTLINED', './fonts/MATERIAL_ICONS/font.json'],
    ['MATERIAL_ICONS_ROUNDED', './fonts/MATERIAL_ICONS/font.json'],
    ['MATERIAL_ICONS_SHARP', './fonts/MATERIAL_ICONS/font.json'],
    ['MATERIAL_ICONS_TWO_TONE', './fonts/MATERIAL_ICONS/font.json']]);

const prefixMap = new Map([
    ['FREE_FONT_AWESOME_ALL', 'fa'],
    ['MATERIAL_SYMBOLS_OUTLINED', 'ms material-symbols-outlined'],
    ['MATERIAL_SYMBOLS_ROUNDED', 'ms material-symbols-rounded'],
    ['MATERIAL_SYMBOLS_SHARP', 'ms material-symbols-sharp'],
    ['MATERIAL_ICONS_FILLED', 'mi material-icons'],
    ['MATERIAL_ICONS_OUTLINED', 'mi material-icons-outlined'],
    ['MATERIAL_ICONS_ROUNDED', 'mi material-icons-round'],
    ['MATERIAL_ICONS_SHARP', 'mi material-icons-sharp'],
    ['MATERIAL_ICONS_TWO_TONE', 'mi material-icons-two-tone']]);

function searchdata() {

    const pack = packs.value;
    const results = document.getElementById("resultsDiv");
    const filter = document.getElementById("search").value.toLowerCase();

    results.innerHTML = "";

    if (!dataMap.has(pack)) return;

        fetch(dataMap.get(pack))
            .then(response => response.json())
            .then( data => {
                data.filter(e => e.k.indexOf(filter) !== -1).forEach(e => {
                    const div = document.createElement("div");
                    div.className = "iconContainer";
                    div.innerHTML = `<i class="${prefixMap.get(pack)} ${e.n}"></i><p>${e.d}</p>`;
                    results.append(div);
                })
            })
}