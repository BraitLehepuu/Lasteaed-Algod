// ALGSTAADIUMIGA SEOTUD FUNKTSIOONID
// --------------------------------------------------------------------------------------------------------------------------------------------------
const gridWidth = 10;      // Ruudustiku laius. Ma pean seda proovima paljude erinevate numbritega.
const gridHeight = 1;      // Ruudustiku kõrgus. Üksainus rida.
var grid = NaN;            // Ruudustik
var speed = 200;

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
    for(var j = 0; j = gridHeight; j++){ // Muutuja gridHeight on 1, aga võib-olla saab sorteerimist mingil moel ruudustikus ka teha.
        grid_html.push('<div class="grid_column">');
        for(var i = 0; i < gridWidth; i++){
            len = grid_html.push('<div class="tile tile_empty" id="' + i + '"<h1>' + i + '</h1></div>'); // Nimetab ruudud
        } // Ma arvan, et mäluleket põhjustab mul see 23. rida või vähemalt see funktsioon. Mida ma valesti teen? Või teen mujal?
        len = grid_html.push('</div>');
    }  

    grid_container.innerHTML = grid_html.join(""); // Paneb sõne html-faili
}

// Teeb meie rea jaoks järjendi
function CreateGridArray(){
    var array = [];

    for(let i = 0; i = gridHeight; i++){
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
    Quicksort
();
}

// Quicksort-algoritm ise
async function Quicksort(){

    // Algsed muutujad ja nende väärtused
    var queue = []; // Selle ma pean ümber tegema, sest see vist ei tööta.
    var rida = []; // Siia me lisame sorteeritavad arvud.
    for(var arv = 0; arv < gridWidth; arv++){ // Genereerime arvud juhuslikult.
        rida.push(Math.floor(Math.random() * 100));
    }
    var pivot = Math.floor(rida.length/2);
    AddToQueue(pivot, queue); // Kas see käib nii?
    var pointer1 = 0;
    AddToQueue(pointer1, queue);
    var pointer2 = rida.length-1; // Ma ei salli nende semikoolonite rohkust kohe üldse.
    AddToQueue(pointer2, queue);
    Sort(rida, pivot, pointer1, pointer2);
} // Sorteerimisfunktsioon on rekursiivne, aga selle päises ei tohiks kogu aeg uusi muutujaid deklareerida.

async function Sort(rida, pivot, pointer1, pointer2){ // Sorteerimine ise
    if(pointer1 >= pointer2){ // Sel juhul on sorteerimine selleks korraks otsas. Jätkub rekursioon, need tulemused pannakse uuesti kokku.
        EmptyQueue();
        const uusrida = rida.slice(pivot+1);
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
        pointer1 = pointer1+1;
        AddToQueue(pointer1, queue);
        pointer2 = pointer2-1;
        AddToQueue(pointer2, queue);
        Sort(rida, pivot, pointer1, pointer2);
    } else if(pivot<rida[pointer2]){ // Ja muidu ta neid ei vaheta, liigub lihtsalt edasi.
        pointer2 = pointer2-1;
        AddToQueue(pointer2, queue); // Tegelikult ma ei tea, mida see funktsioon siin teeb.
        if(rida[pointer1]<pivot){
            pointer1 = pointer1+1
            AddToQueue(pointer1, queue);
        }
        Sort(rida, pivot, pointer1, pointer2);
        }
}

var visualQueue = []            // Järjend visuaalse järjekorra jaoks - Ma pean endalt küsima, kas seda on ka vaja.

// Lisab ruudu visuaalsesse järjekorda ning näitab
async function AddToQueue(element, queue){
    queue.push(element); // Lisa element algoritmi järjekorda
    visualQueue.push('<div class="queue_item queue_unexplored"><h1></h1><p>(' + element + ')</p></div>'); // Lisa element visuaalsesse järjekorda - Ma pean seda veel harjutama, see ei ole õige, ja h1 vahele peaks vist lisama ' + element[0] + ', ' + element[1] + '.

    RefreshQueue();

    // Värvib ruudu reas, kui see on pivot ja/või pointer - ma olen päris kindel, et see ei tööta nii ega ole päris nii lihtne.
    for(var k=0; k<queue.length; k++){
        if(queue[k]=pivot){
        var tile = document.getElementById(element[0]);
        tile.style.backgroundColor = "rgb(30,0,140)";
        }
        if(queue[k]==pointer1 || queue[k]==pointer2){
            var tile = document.getElementById(element[0]);
            tile.style.borderBlockColor = "rgb(140,0,30)";
        }
    }

    await new Promise(r => setTimeout(r, speed));
}

// Tühjendab visuaalse järjekorra
function EmptyQueue(){
    visualQueue = []
    RefreshQueue();
}

// Eemaldab esimese elemendi visuaalsest järjekorrast
function PopFromQueue(){
    visualQueue.shift();
    RefreshQueue();
}

// Uuendab visuaalset järjekorda ekraanil
function RefreshQueue(){
    var queue_container = document.getElementById("queue_container");
    queue_container.innerHTML = "";
}

// Viib algoritmi ja meie rea algstaadiumisse
function ResetQuicksort(){
    EmptyQueue();
    SetUp();
}

//Jah, aga mul praegu ju mingit visuaali ei olegi.