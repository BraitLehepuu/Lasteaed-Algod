
// Kuna ise väga hästi javascripti ei osanud algul, võtsin Ralfi koodi eeskujuks, 
// sest ta oli varakult oma osa üpris professionaalselt ära teinud.
//-----------------------------MUUTUJAD-------------------------------------------------------------------

var row_length = 10;
var row = NaN;
var row_exists = false;
var array_ = NaN;
var ms = 800;
var cycle = 1;
var restart = false;
var solving = false;
var solved = false;

//-------------------------ETTEVALMISTUS JA ESIALGSE VISUAALI TEKITAMINE------------------------------------
// Funktsioon mis käivitatakse vahelehe avamisel. Tekitab ekraanile visuaalse arvude rea.
function CreateRow(){
    if(row_exists){  // See if lause on vajalik Bubblesort() funktsiooni jaoks, et järjendi uuendamisel üle ei kirjutataks
        row = array_;
    }
    else{
        row = CreateArray(); // Kui veel ei ole järjendit või vajutati restart nuppu, loo uus järjend
    }
    row_exists = true
    var row_container = document.getElementById('row_container');
    var html_array = [];
    var id = 0;
    for(number of row){ // Lappab järjendist arve ja loob neile div elemendid
        html_array.push('<div class="tile" id="' + id + '"><h1>' + number + '</h1></div>');
        id += 1;
        }
    row_container.innerHTML = html_array.join(''); // Paneb div elemendid kokku ja paigutab veebilehele
    
    
}

// Loob suvalise arvude järjendi vahemikus 1-50. Kutsutakse välja CreateRow() funktsioonis UI loomiseks.
function CreateArray(){
    var array = [];
    for(let i = 0; i < row_length; i++){  // Järjendis on muutuja row_length poolt määratud arvu
        let x = Math.floor((Math.random() * 50) + 1); // Kasutan Math moodulit, et luua suvalisi arve (https://www.w3schools.com/jsref/jsref_random.asp)
        array.push(x);
    }

    return array;
}

//-----------------SORTEERIMISEGA SEONDUVAD FUNKTSIOONID----------------------------------------------
// Bubble Sort funktsioon
async function Bubblesort(array){

    
    let lenght_ = array.length; // Järjendi pikkus
    array_ = array;
    var sorted = false;

    while(!sorted){
        
        var sorted_counter = 1; // Muutuja kontrollimaks, kas on lahendatud

        for(let i = 0; i < lenght_ - 1; i++){ // Sorteerimise for tsükkel. i on indeks.

            
            if(array_[i] > array_[i+1]){
                let temp = array_[i];
                array_[i] = array_[i+1];  // Kui järgmine arv on väiksem, vaheta.
                array_[i+1] = temp;
                await ShowStep(i, 'y'); // Näitab visuaalselt sammu, tsükkel jääb hetkeks seisma.
                if(restart){
                    restart = false;  // Kui toimus Restart nupu vajutus, lõpetab tsükli töö.
                    return;
                }
                //document.getElementById(i).innerHTML = '<div class="tile" id="' + i + '"><h1>' + array_[i] + '</h1></div>';  
                //document.getElementById(i+1).innerHTML = '<div class="tile" id="' + (i+1) + '"><h1>' + array_[i+1] + '</h1></div>';
            }
            else{
                sorted_counter+=1;  // Kui järgnev arv on suurem, suurendab sorteerimise loendurit.
                await ShowStep(i, 'n'); // Näita sammu.
                if(restart){
                    restart = false;
                    return;
                }
                //document.getElementById(i).innerHTML = '<div class="tile" id="' + i + '"><h1>' + array_[i] + '</h1></div>';
                //document.getElementById(i+1).innerHTML = '<div class="tile" id="' + (i+1) + '"><h1>' + array_[i+1] + '</h1></div>';
            }

            CreateRow(); // Peale tsüklit uuenda rida.
        }


        if(sorted_counter == lenght_){ // Kui loendur sorted_counter on võrdne järjendi pikkusega, tuleb while tsüklist välja ja lõpetab sorteerimise.
            sorted = true;
            cycle -= 1;
        }
        cycle += 1;  // Mitmes tsükkel texti uuendus
        document.getElementById('cycles').innerHTML = '<div id="cycle"><p>Tsükkel nr.' + cycle + '</p></div>';
    }
    j = 0;
    for(num of array_){  // Funktsiooni töö lõpus esitab sorteeritud vastuse eksraanile.
        document.getElementById(j).innerHTML = '<div class="tile_solved" id="' + j + '"><h1>' + num + '</h1></div>';
        j += 1;
    }
    document.getElementById('cycles').innerHTML = '<div id="cycle"><p>Lahendamiseks kulus ' + cycle + ' tsüklit</p></div>';
    solving = false;
    solved = true;
}   


// Sammu visualiseerimiseks mõeldud funktsioon.
async function ShowStep(index, swap){
    if(swap == 'y'){    // Kui peab vahetama, muuda mullid roheliseks ja vaheta numbrid.
        var tile_1 = document.getElementById(index);
        var tile_2 = document.getElementById(index+1);
        tile_1.innerHTML = '<div class="tile_swap" id="' + index + '"><h1>' + array_[index+1] + '</h1></div>';
        tile_2.innerHTML = '<div class="tile_swap" id="' + (index+1) + '"><h1>' + array_[index] + '</h1></div>';
        await new Promise(r => setTimeout(r, ms/2));
        tile_1.innerHTML = '<div class="tile_swap" id="' + index + '"><h1>' + array_[index] + '</h1></div>';
        tile_2.innerHTML = '<div class="tile_swap" id="' + (index+1) + '"><h1>' + array_[index+1] + '</h1></div>';
    }
    else if(swap == 'n'){   // Kui ei pea vahetama muuda mullid lihtsalt punaseks.
        var tile_1 = document.getElementById(index);
        var tile_2 = document.getElementById(index+1);
        tile_1.innerHTML = '<div class="tile_noswap" id="' + index + '"><h1>' + array_[index] + '</h1></div>';
        tile_2.innerHTML = '<div class="tile_noswap" id="' + (index+1) + '"><h1>' + array_[index+1] + '</h1></div>';
    }
    await new Promise(r => setTimeout(r, ms));  // Väike paus, et kasutaja jõuaks muutust hoomata.
}

//-------------NUPUD------------------------------------------------------------------------------
// Funktsioon, mis käivitatakse Start nupule vajutades.
function StartSort(){
    if(solving){
        return;     // Kui paraku lahendatakse või järjend on sorteeritud, katkesta Start nupu töö
    }
    if(solved){
        return;
    }
    solving = true;
    restart = false;
    document.getElementById('cycles').innerHTML = '<div id="cycle"><p>Tsükkel nr.' + cycle + '</p></div>'; // Tekita tsüklite loendur ekraanile
    Bubblesort(row); // Alusta sorteerimist
}


// Programmi taaskäivitamiseks mõeldud funktsioon. Läheb käima kui vajutada Restart nuppu.
function Restart(){
    solving = false;
    solved = false;
    row_exists = false;
    cycle = 1;
    restart = true;
    document.getElementById('cycles').innerHTML = '<div id="cycle"></div>';
    CreateRow();
}

// Kiiruse muutmise lahtri funktsioon (Eeskujuks Ralfi kood)
function Speed(speed){
    ms = speed;
}

