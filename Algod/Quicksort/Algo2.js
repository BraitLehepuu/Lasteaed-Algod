// ALGSTAADIUMIGA SEOTUD FUNKTSIOONID
// --------------------------------------------------------------------------------------------------------------------------------------------------
const gridWidth = 10; // Ruudustiku laius. Ma pean seda proovima paljude erinevate numbritega.
const gridHeight = 1; // Ruudustiku kõrgus. Üksainus rida.
var grid = NaN;       // Ruudustik
var speed = 1000;
var pivot = 0;        // Need kolm on siin selle pärast, et iga funktsioon allpool neid üheselt mõistaks. Need hakkavad ohtralt muutuma.
var pointer1 = 0;
var pointer2 = 0;     // Ja shift määrab, kus visuaalis pointerid ja pivot asuvad.
var näitemäng = []    // Siia ma salvestan sündmuste toimumise koodid ja kohad, et neid pärast visuaalis korrata.

// Funktsioon algsete olude seadmiseks
function SetUp(){
    grid = CreateGridArray();
    DisplayGrid();
    näitemäng = [];
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

// Algoritmiga alustamine. Konsooli tulevad debugimiseks vajalikud asjad ehk mis klausleid programm läbib ja mis järjekorras.
function Quicksort(){

    // Algsed muutujad ja nende väärtused
    var rida = []; // Siia me lisame sorteeritavad arvud.
    for(var arv = 0; arv < gridWidth; arv++){ // Genereerime arvud juhuslikult, need on ühest sajani.
        rida.push(Math.floor(Math.random()*100)+1);
        document.getElementById(arv).innerHTML = '<h1>' + rida[arv] + '</h1>'; // Asetab arvud visuaalselt ritta. Need on sorteerimata.
    }
    console.log(rida)
    pivot = Math.floor((rida.length)/2-1);
    näitemäng.push([N1, pivot, 0]) // Tekitab näitemängu protsessi odava visuaalse kujutise.
    pointer1 = 0;
    pointer2 = rida.length-1; // Ma ei salli nende semikoolonite rohkust kohe üldse.
    näitemäng.push([N2, pointer1, pointer2, 0])
    Sort(rida, pivot, pointer1, pointer2, 0);
    console.log(näitemäng)
    näitemängurakendus();
} // Sorteerimisfunktsioon on rekursiivne, aga selle päises ei tohiks kogu aeg uusi muutujaid deklareerida.

// Sorteerimine ise
function Sort(rida, pivot, pointerüks, pointerkaks, shift){
    console.log(rida[pivot]);
    console.log(shift);
    if(pointerüks >= pointerkaks){ // Sel juhul on sorteerimine selleks korraks otsas. Jätkub rekursioon.
        näitemäng.push([N5, pivot, shift])
        divide(rida, pivot, shift)
    }
    else if(rida[pointerüks]>=rida[pivot] && rida[pivot]>=rida[pointerkaks] && rida[pointerüks]!=rida[pointerkaks]){ // Sel juhul need vahetatakse. See on kogu sorteerimise alus.
        console.log("Jõudsin siia 1")
        näitemäng.push([N4, pointerüks, pointerkaks, rida[pointerüks], rida[pointerkaks], shift])
        var žonglöör = rida[pointerkaks];
        rida[pointerkaks] = rida[pointerüks];
        rida[pointerüks] = žonglöör;
        console.log(rida);
        if(pivot==pointerkaks){pivot=pointerüks} // Pivoti staatus liigub tema endaga muidugi kaasa.
        else if(pivot==pointerüks){pivot=pointerkaks}
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

// Jagab osaliselt sorteeritud rea kaheks alamreaks
function divide(rida, pivot, shift){
    console.log("Jõudsin siia 0")
        var uusrida = rida.slice(pivot+1);
        var teinerida = rida.slice(0, pivot);
        if (uusrida.length>1){
                console.log("Sorteerin uutrida");
                console.log(uusrida);
                pivot=Math.floor(uusrida.length/2);
                näitemäng.push([N1, pivot, shift+teinerida.length+1]);
                pointer1=0;
                pointer2=uusrida.length-1;
                näitemäng.push([N2, pointer1, pointer2, shift+teinerida.length+1]);
                Sort(uusrida, pivot, pointer1, pointer2, shift+teinerida.length+1); // Shift suureneb: paremal pool oleva rea pointerite ja pivoti visualiseerimine käib rohkem paremal. Märkus: teinerida.length+1 on see õige nihe, mida kasutada, et visuaal oleks õige.
            } else if(uusrida.length==1){näitemäng.push([N5, 0, shift+teinerida.length+1])}
        if (teinerida.length>1){        
                console.log("Sorteerin teistrida");
                console.log(teinerida);
                pivot=Math.floor(teinerida.length/2)
                näitemäng.push([N1, pivot, shift])
                pointer1=0;
                pointer2=teinerida.length-1;
                näitemäng.push([N2, pointer1, pointer2, shift])
                Sort(teinerida, pivot, pointer1, pointer2, shift); // Siinpool on lihtne, sest kõik toimub ikka vasakul ja teiserea vasakpoolne on kogu rea vasakpoolne.
        } else if(teinerida.length==1){näitemäng.push([N5, 0, shift])}
} // Ma vist jätan need konsoolilogid ikka alles, äkki läheb vaja.

// Liigutab pointereid
async function movepointer(pointer, shift){
    if (pointer==pointer1){
        pointer1 = pointer1+1;
        näitemäng.push([N3, pointer, 1, shift])
    } else if(pointer==pointer2){
        pointer2 = pointer2-1;
        näitemäng.push([N3, pointer, 2, shift])
    }
    await new Promise(r => setTimeout(r, speed));
}

// VISUAALI TOIMIMINE
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Mängib sellesama protsessi visuaali peal läbi, ainult et vahedega, nagu viisakas on.
async function näitemängurakendus(){
    for(N=0; N<näitemäng.length; N++){
        await new Promise(r => setTimeout(r, speed))
        if(näitemäng[N][0]==N1 || näitemäng[N][0]==N5){ // Need if-klauslid selgitavad, mitu argumenti kutsutavale funktsioonile anda tuleb.
            näitemäng[N][0](näitemäng[N][1], näitemäng[N][2]);
        } else if(näitemäng[N][0]==N2 || näitemäng[N][0]==N3){
            näitemäng[N][0](näitemäng[N][1], näitemäng[N][2], näitemäng[N][3]);
        } else if(näitemäng[N][0]==N4){
            N4(näitemäng[N][1], näitemäng[N][2], näitemäng[N][3], näitemäng[N][4], näitemäng[N][5]);
        }
    }
}

// 1. Valitakse pivot.
function N1(pivot, shift){
    var tile = document.getElementById(pivot+shift);
    tile.style.backgroundColor = "rgb(30,0,140)";
}

// 2. Valitakse pointerid. Pointer võib sattuda kohe pivoti peale.
function N2(pointer1, pointer2, shift){
    var tile = document.getElementById(pointer1+shift);
    console.log(tile)
    if(tile.style.backgroundColor=="rgb(30, 0, 140)" || tile.style.backgroundColor=="rgb(85, 0, 85)"){
        tile.style.backgroundColor = "rgb(85,0,85)";
    } else {tile.style.backgroundColor = "rgb(140,0,30)"}
    var tile = document.getElementById(pointer2+shift);
    if(tile.style.backgroundColor=="rgb(30, 0, 140)" || tile.style.backgroundColor=="rgb(85, 0, 85)"){
        tile.style.backgroundColor = "rgb(85,0,85)";
    } else {tile.style.backgroundColor = "rgb(140,0,30)"}
}

// 3. Üks pointer liigub. Pointer võib liikuda pivoti peale või sealt maha.
function N3(pointer, id, shift){
    var tile = document.getElementById(pointer+shift);
    if(id==1){
        if(tile.style.backgroundColor == "rgb(85, 0, 85)"){
            tile.style.backgroundColor = "rgb(30,0,140)"
        } else {tile.style.backgroundColor = "rgb(15,26,38)"}
        var newtile = document.getElementById(pointer+shift+1);
        if(newtile.style.backgroundColor == "rgb(30, 0, 140)" || newtile.style.backgroundColor == "rgb(85, 0, 85)"){
            newtile.style.backgroundColor = "rgb(85,0,85)"
        } else {newtile.style.backgroundColor = "rgb(140,0,30)"}
    } else if(id==2){
        if(tile.style.backgroundColor == "rgb(85, 0, 85)"){
            tile.style.backgroundColor = "rgb(30,0,140)"
        } else {tile.style.backgroundColor = "rgb(15,26,38)"}
        var newtile = document.getElementById(pointer+shift-1);
        if(newtile.style.backgroundColor == "rgb(30, 0, 140)" || newtile.style.backgroundColor == "rgb(85, 0, 85)"){
            newtile.style.backgroundColor = "rgb(85,0,85)"
        } else {newtile.style.backgroundColor = "rgb(140,0,30)"}
    }
}

// 4. Arvud vahetavad kohti. Pivoti staatus, kui on, läheb teisele pointerile.
function N4(pointer1, pointer2, arv1, arv2, shift){ // arv1 on see, millele pointer1 tol hetkel osutab, ja vastupidi
    var tile1 = document.getElementById(pointer1+shift);
    var tile2 = document.getElementById(pointer2+shift);
    document.getElementById(pointer1+shift).innerHTML = '<h1>' + arv2 + '</h1>';
    document.getElementById(pointer2+shift).innerHTML = '<h1>' + arv1 + '</h1>';
    if(tile1.style.backgroundColor == "rgb(85, 0, 85)"){
        tile1.style.backgroundColor = "rgb(140,0,30)";
        tile2.style.backgroundColor = "rgb(85,0,85)";
    } else if(tile2.style.backgroundColor == "rgb(85, 0, 85)"){
        tile2.style.backgroundColor = "rgb(140,0,30)";
        tile1.style.backgroundColor = "rgb(85,0,85)";
    }   
}

// 5. Pivot muutub roheliseks. Siinkohal on pointerid (peaaegu) alati kohtunud või on pivot rea ainus element.
function N5(pivot, shift){document.getElementById(pivot+shift).style.backgroundColor = "rgb(0,128,0)"}