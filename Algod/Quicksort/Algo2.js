// ALGSTAADIUMIGA SEOTUD FUNKTSIOONID
// --------------------------------------------------------------------------------------------------------------------------------------------------
const gridWidth = 10;      // Ruudustiku laius. Ma pean seda proovima paljude erinevate numbritega.
const gridHeight = 1;      // Ruudustiku kõrgus. Üksainus rida.
var grid = NaN;            // Ruudustik
var speed = 200;
var pivot = 0;
var pointer1 = 0;
var pointer2 = 0;

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
    for(var j = 0; j < gridHeight; j++){ // Muutuja gridHeight on 1, aga võib-olla saab sorteerimist mingil moel ruudustikus ka teha.
        grid_html.push('<div class="grid_column">');
        for(var i = 0; i < gridWidth; i++){
            len = grid_html.push('<div class="tile tile_empty" id="' + i + '"><h1>' + i + '</h1></div>'); // Nimetab ruudud
        }
        len = grid_html.push('</div>');
    }  

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

// Alustab algoritmiga
function StartQuicksort(){
    Quicksort();
}

// Quicksort-algoritm ise
async function Quicksort(){

    // Algsed muutujad ja nende väärtused
    var rida = []; // Siia me lisame sorteeritavad arvud.
    for(var arv = 0; arv < gridWidth; arv++){ // Genereerime arvud juhuslikult.
        rida.push(Math.floor(Math.random() * 100));
        document.getElementById(arv).innerHTML = '<h1>' + rida[arv] + '</h1>'; // Asetab arvud visuaalselt ritta. Need on sorteerimata.
    }
    pivot = Math.floor((rida.length)/2); //Programm ei saa aru, et pivot on siin defineeritud.
    colour(pivot);
    var pointer1 = 0;
    colour(pointer1);
    var pointer2 = rida.length-1; // Ma ei salli nende semikoolonite rohkust kohe üldse.
    colour(pointer2);
    Sort(rida, pivot, pointer1, pointer2);
} // Sorteerimisfunktsioon on rekursiivne, aga selle päises ei tohiks kogu aeg uusi muutujaid deklareerida.

async function Sort(rida, pivot, pointer1, pointer2){ // Sorteerimine ise
    if(pointer1 >= pointer2){ // Sel juhul on sorteerimine selleks korraks otsas. Jätkub rekursioon, need tulemused pannakse uuesti kokku.
        EmptyQueue();
        const uusrida = rida.slice(pivot+1); // Ma pean pointereid liigutama.
        const teinerida = rida.slice(0, pivot+1);
        if(uusrida.length>1){
            Sort(uusrida, Math.floor(uusrida.length/2), 0, uusrida.length-1);
        }
        if(teinerida.length>1){ //Siin satuvad pointerid visuaalis vist vale koha peale. Kuidas ümber teha?
            Sort(teinerida, Math.floor(teinerida.length/2), 0, teinerida.length-1);
        }
        const valmisrida = uusrida.concat(teinerida);
        return valmisrida
    }

    if(rida[pointer1]>pivot && pivot>rida[pointer2]){ // Sel juhul need vahetatakse. See on kogu sorteerimise alus.
        var žonglöör = rida[pointer2];
        rida[pointer2] = rida [pointer1];
        rida[pointer1] = žonglöör;
        document.getElementById(pointer1).innerHTML = '<h1>' + rida[pointer1] + '</h1>';
        document.getElementById(pointer2).innerHTML = '<h1>' + rida[pointer2] + '</h1>';
        pointer1 = pointer1+1;
        pointer2 = pointer2-1;
        Sort(rida, pivot, pointer1, pointer2);
    } else if(pivot<rida[pointer2]){ // Ja muidu ta neid ei vaheta, liigub lihtsalt edasi.
        pointer2 = pointer2-1;
        if(rida[pointer1]<pivot){
            pointer1 = pointer1+1
        }
        Sort(rida, pivot, pointer1, pointer2);
        }
}

// Värvib ruudu, mis on pivot või pointer.
function colour(element){
    if (element==pivot){
        var tile = document.getElementById(element)
        tile.style.backgroundColor = "rgb(30,0,140)";
    } else if(element==pointer1 || element==pointer2){
        var tile = document.getElementById(element);
        tile.style.borderBlockColor = "rgb(140,0,30)";
    }
}

// Viib algoritmi ja meie rea algstaadiumisse
function ResetQuicksort(){
    EmptyQueue();
    SetUp();
}