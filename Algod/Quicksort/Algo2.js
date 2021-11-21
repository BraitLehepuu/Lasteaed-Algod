// ALGSTAADIUMIGA SEOTUD FUNKTSIOONID
// --------------------------------------------------------------------------------------------------------------------------------------------------
const gridWidth = 10; // Ruudustiku laius. Ma pean seda proovima paljude erinevate numbritega.
const gridHeight = 1; // Ruudustiku kõrgus. Üksainus rida.
var grid = NaN;       // Ruudustik
var speed = 2000;
var pivot = 0;        // Need kolm on siin selle pärast, et iga funktsioon allpool neid üheselt mõistaks. Need hakkavad ohtralt muutuma.
var pointer1 = 0;
var pointer2 = 0;     // Ja shift määrab, kus visuaalis pointerid ja pivot asuvad.

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
function OnSpeedChanged(value){speed = value}

// ALGORITMIGA SEOTUD KOOD
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Alustab algoritmiga
function StartQuicksort(){Quicksort()}

// Quicksort-algoritm ise. Konsooli tulevad debugimiseks vajalikud asjad ehk mis klausleid programm läbib ja mis järjekorras.
function Quicksort(){

    // Algsed muutujad ja nende väärtused
    var rida = []; // Siia me lisame sorteeritavad arvud.
    for(var arv = 0; arv < gridWidth; arv++){ // Genereerime arvud juhuslikult, need on ühest sajani.
        rida.push(Math.floor(Math.random()*100)+1);
        document.getElementById(arv).innerHTML = '<h1>' + rida[arv] + '</h1>'; // Asetab arvud visuaalselt ritta. Need on sorteerimata.
    }
    console.log(rida)
    pivot = Math.floor((rida.length)/2-1);
    colour(pivot, 0);
    pointer1 = 0;
    colour(pointer1, 0);
    pointer2 = rida.length-1; // Ma ei salli nende semikoolonite rohkust kohe üldse.
    colour(pointer2, 0);
    Sort(rida, pivot, pointer1, pointer2, 0);
} // Sorteerimisfunktsioon on rekursiivne, aga selle päises ei tohiks kogu aeg uusi muutujaid deklareerida.

function Sort(rida, pivot, pointerüks, pointerkaks, shift){ // Sorteerimine ise
    // await new Promise(r => setTimeout(r, speed));
    if (rida.length==1){pivotready(0)}
    else {
    console.log(rida[pivot]);
    console.log(shift);
    if(pointerüks >= pointerkaks){ // Sel juhul on sorteerimine selleks korraks otsas. Jätkub rekursioon.
        divide(rida, pivot, shift)
    }
    else if(rida[pointerüks]>=rida[pivot] && rida[pivot]>=rida[pointerkaks] && rida[pointerüks]!=rida[pointerkaks]){ // Sel juhul need vahetatakse. See on kogu sorteerimise alus.
        console.log("Jõudsin siia 1")
        var žonglöör = rida[pointerkaks];
        rida[pointerkaks] = rida[pointerüks];
        rida[pointerüks] = žonglöör;
        console.log(rida);
        document.getElementById(pointerüks+shift).innerHTML = '<h1>' + rida[pointerüks] + '</h1>';
        document.getElementById(pointerkaks+shift).innerHTML = '<h1>' + rida[pointerkaks] + '</h1>';
        if(pivot==pointerkaks){ // Pivoti staatus liigub tema endaga muidugi kaasa.
            discolour(pivot, shift);
            pivot=pointerüks;
            var tile = document.getElementById(pivot+shift);
            tile.style.backgroundColor = "rgb(85,0,85)";
        } else if(pivot==pointerüks){
            discolour(pivot, shift);
            pivot=pointerkaks;
            var tile = document.getElementById(pivot+shift);
            tile.style.backgroundColor = "rgb(85,0,85)";
        }
        // movepointer(pointerüks, shift); // Neid ilmselt ei lähe vaja.
        // movepointer(pointerkaks, shift);
        Sort(rida, pivot, pointer1, pointer2, shift);
    } else if((rida[pivot]<rida[pointerkaks])){ // Ja muidu ta neid ei vaheta, liigub lihtsalt edasi.
        console.log("Jõudsin siia 2");
        movepointer(pointerkaks, shift);
        if(rida[pointer1]<rida[pivot]){
            console.log("Jõudsin siia 3");
            movepointer(pointerüks, shift);
        }
        console.log("Sorteerin");
        Sort(rida, pivot, pointer1, pointer2, shift);
        } else if(rida[pointerüks]<=rida[pivot]){
            console.log("Jõudsin siia 4");
            movepointer(pointerüks, shift);
            console.log("Sorteerin");
            Sort(rida, pivot, pointer1, pointer2, shift);
        }
    }
}

// Jagab osaliselt sorteeritud rea kaheks alamreaks
function divide(rida, pivot, shift){
    console.log("Jõudsin siia 0")
        var uusrida = rida.slice(pivot+1); // Ma pean pointereid liigutama.
        var teinerida = rida.slice(0, pivot);
        pivotready(pivot)
        if (uusrida.length>1 || teinerida.length>1){
                console.log("Sorteerin uutrida");
                console.log(uusrida);
                pointer1=0;
                pointer2=uusrida.length-1;
                Sort(uusrida, Math.floor(uusrida.length/2), 0, uusrida.length-1, shift+teinerida.length+1); // Shift suureneb: paremal pool oleva rea pointerite ja pivoti visualiseerimine käib rohkem paremal. Märkus: teinerida.length+1 on see õige nihe, mida kasutada, et visuaal oleks õige.
                console.log("Sorteerin teistrida");
                console.log(teinerida);
                pointer1=0;
                pointer2=teinerida.length-1;
                Sort(teinerida, Math.floor(teinerida.length/2), 0, teinerida.length-1, shift); // Siinpool on lihtne, sest kõik toimub ikka vasakul ja teiserea vasakpoolne on kogu rea vasakpoolne.
        } else{valmisrida(0, shift)}
}

// Värvib ruudu, mis on pivot või pointer.
async function colour(element, shift){
    var tile = document.getElementById(element+shift);
    if(element==pointer1 || element==pointer2){
        if(element==pivot){ // Kui ta on mõlemad, tuleb vahepealne värv.
            tile.style.backgroundColor = "rgb(85,0,85)";
        } else {tile.style.backgroundColor = "rgb(140,0,30)"} // Muidu tuleb pointeri värv.
    } else if(element==pivot){tile.style.backgroundColor = "rgb(30,0,140)"}
    await new Promise(r => setTimeout(r, speed));
}
// Eemaldab ruudu värvi.
async function discolour(element, shift){
    if((pivot==pointer1 && element==pointer1) || (pivot==pointer2 && element==pointer2)){
        var tile = document.getElementById(element+shift);
        tile.style.backgroundColor = "rgb(30,0,140)";
    } else {
    var tile = document.getElementById(element+shift);
    tile.style.backgroundColor = "rgb(15,26,38)";
    await new Promise(r => setTimeout(r, speed));
    }
}

// Liigutab pointereid.
async function movepointer(pointer, shift){
    if (pointer==pointer1){
        discolour(pointer1, shift);
        pointer1 = pointer1+1;
        colour(pointer1, shift);
    } else if(pointer==pointer2){
        discolour(pointer2, shift);
        pointer2 = pointer2-1;
        colour(pointer2, shift);
    }
    await new Promise(r => setTimeout(r, speed));
}

// Kui sorteerimine saab valmis
async function valmisrida(rida, shift){
    for(let i=0; i<gridWidth; i++){
        var tile = document.getElementById(i);
        tile.style.backgroundColor = "rgb(0,128,0)";
    }
    await new Promise(r => setTimeout(r, speed));
}

// Teeb ühe paigas elemendi roheliseks
async function pivotready(pivot){
    var tile = document.getElementById(pivot);
    tile.style.backgroundColor = "rgb(0,128,0)";
    await new Promise(r => setTimeout(r, speed))
}