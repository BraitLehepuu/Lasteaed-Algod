// ALGSTAADIUMIGA SEOTUD FUNKTSIOONID
// --------------------------------------------------------------------------------------------------------------------------------------------------
const gridWidth = 10;      // Ruudustiku laius. Ma pean seda proovima paljude erinevate numbritega.
const gridHeight = 1;      // Ruudustiku kõrgus
var grid = NaN;            // Ruudustik
var speed = 100;

// Funktsioon algsete olude seadmiseks
function SetUp(){
    grid = CreateGridArray();
    DisplayGrid();
}

// Loob html faili rea algoritmi visualiseerimise jaoks
function DisplayGrid(){
    var grid_container = document.getElementById("grid_container"); // Leiab algoritmi jaoks mõeldud divi

    // Teeb iga ruudu jaoks ühe HTML sõne
    var grid_html = []
    for(var j = 0; j < gridHeight; j++){
        grid_html.push('<div class="grid_column">');
        for(var i = 0; i < gridWidth; i++){
            len = grid_html.push('<div class="tile tile_empty" id="' + i + '_' + j + '" onclick="TileClicked(this.id)"><h1>' + i + ', ' + j + '</h1></div>'); // Nimetab ruudud
        }
        grid[i][j] = false;
    }
    len = grid_html.push('</div>');
    

    grid_container.innerHTML = grid_html.join(""); // Paneb sõne html-faili
}

// Teeb meie rea jaoks järjendi
function CreateGridArray(){
    var array = [];
    
    for(let i = 0; i < gridHeight; i++){
        array.push(Array(gridWidth));
    }
    
    return array;
}

// Tegeleb sammu kiiruse vahetamisega
function OnSpeedChanged(value){
    speed = value;
}

// ALGORITMIGA SEOTUD KOOD
// --------------------------------------------------------------------------------------------------------------------------------------------------
var currentlySolving = false; // Algoritmi tööolek

// Alusta algoritmiga
function StartQuicksort(){
    currentlySolving = true;
    Quicksort
();
}

// Quicksort-algoritm ise
async function Quicksort(){

    // Algsed muutujad ja nende väärtused
    const rida = []; // Siia me lisame sorteeritavad arvud.
    for(var len = 0; length < gridWidth; len++){ // Genereerime arvud juhuslikult.
        rida.push(Math.floor(Math.random() * 100));
    }
    var pivot = Math.floor(rida.length/2);
    var pointer1 = 0;
    var pointer2 = rida.length-1; // Ma ei salli nende semikoolonite rohkust kohe üldse.
    Sort(rida, pivot, pointer1, pointer2);
} // Sorteerimisfunktsioon on rekursiivne, aga selle päises ei tohiks uusi muutujaid deklareerida.

async function Sort(rida, pivot, pointer1, pointer2){ // Sorteerimine ise
    if(pointer1 >= pointer2){ // Sel juhul on sorteerimine selleks korraks otsas. Jätkub rekursioon, need tulemused pannakse uuesti kokku.
        const uusrida = rida.slice(pivot+1);
        const teinerida = rida.slice(0, pivot+1);
        if(uusrida!=[]){
            Sort(uusrida, Math.floor(uusrida.length/2), 0, uusrida.length-1);
        }
        if(teinerida!=[]){
            Sort(teinerida, Math.floor(teinerida.length/2), 0, teinerida.length-1);
        }
        const valmisrida = uusrida.concat(teinerida)
        console.log(valmisrida)


    }

    if(rida[pointer1]>pivot && pivot>rida[pointer2]){ // Sel juhul need vahetatakse. See on kogu sorteerimise alus.
        var žonglöör = rida[pointer2];
        rida[pointer2] = rida [pointer1];
        rida[pointer1] = žonglöör;
        pointer1 = pointer1+1;
        pointer2 = pointer2-1;
        Sort(rida, pivot, pointer1, pointer2);
    } else { // Ja muidu ta neid ei vaheta, liigub lihtsalt edasi.
        pointer2 = pointer2-1;
        Sort(rida, pivot, pointer1, pointer2);
        }
}