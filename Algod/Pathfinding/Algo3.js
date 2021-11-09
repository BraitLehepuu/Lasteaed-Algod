// ALGSTAADIUMIGA SEOTUD FUNKTSIOONID
// --------------------------------------------------------------------------------------------------------------------------------------------------
const gridWidth = 10;       // Ruudustiku laius
const gridHeight = 10;      // Ruudustiku kõrgus
var grid = NaN;             // Ruudustik
var speed = 100;

// Funktsioon algsete olude seadmiseks
function SetUp(){
    grid = CreateGridArray();
    DisplayGrid();
}

// Loo html faili ruudustik algoritmi visualiseerimise jaoks
function DisplayGrid(){
    var grid_container = document.getElementById("grid_container"); // Leia algoritmi jaoks mõeldud div

    // Tee ruudustiku jaoks mõeldud HTML sõne
    var grid_html = []
    for(var j = 0; j < gridHeight; j++){
        grid_html.push('<div class="grid_column">');
        for(var i = 0; i < gridWidth; i++){
            if(i === 0 && j === 0){
                grid_html.push('<div class="tile tile_start" id="' + i + '_' + j + '" onclick="StartPathfinding()"><h1>Start</h1></div>'); // Paneb paika start ruudu
            }
            else if(i === gridHeight - 1 && j === gridWidth - 1){
                grid_html.push('<div class="tile tile_finish" id="' + i + '_' + j + '"><h1>Finish</h1></div>'); // Paneb paika finish ruudu
            }
            else{
                len = grid_html.push('<div class="tile tile_empty" id="' + i + '_' + j + '" onclick="TileClicked(this.id)"><h1>' + i + ', ' + j + '</h1></div>'); // Paneb paika kõik tavalised ruudud
            }
            grid[i][j] = false;
        }
        len = grid_html.push('</div>');
    }

    grid_container.innerHTML = grid_html.join(""); // Pane sõne html faili
}

// Tegeleb ruudu klikkimisega
function TileClicked(tile_id){
    if(currentlySolving){return;} // Ignoreeri klikki kui hetkel algoritm juba töötab
    
    // Kogu algne info klikitud ruudu kohta
    var tile = document.getElementById(tile_id);
    var id = tile_id.toString().split('_');
    var row = id[1];
    var column = id[0];

    ToggleTile(row, column, tile); // Vaheta ruudu olek
    
}

// Vaheta ruudu olek vastastikuseks
function ToggleTile(row, column, tile){
    if(tile.className == "tile tile_empty"){
        tile.className = "tile tile_filled"
        grid[row][column] = true;
    }
    else{
        tile.className = "tile tile_empty"
        grid[row][column] = false;
    }
}

// Tee ruudustiku jaoks järjend
function CreateGridArray(){
    var array = [];
    
    for(let i = 0; i < gridHeight; i++){
        array.push(Array(gridWidth));
    }
    
    return array;
}

function OnSpeedChanged(value){

}

// ALGORITMIGA SEOTUD KOOD
// --------------------------------------------------------------------------------------------------------------------------------------------------
var currentlySolving = false; // Algoritmi tööolek

function StartPathfinding(){
    currentlySolving = true;
    Pathfinding();
}

async function Pathfinding(){

    // Algsed muutujad ja nende väärtused
    var queue = [];          // Järjekorra järjend, iga element on järjend kus on [positsioon, eelmine positsioon, mitmes järjestuses]
    AddToQueue([[0, 0], [0, 0], 0], queue)
    
    let current_index = 0;                      // Praegune asukoht järjekorras
    var current_position = NaN;                 // Praegune positsioon
    var end_pos = [gridHeight-1, gridWidth-1];  // Lõpu positsioon
    var gridCopy = [...grid];                   // Ruudustiku koopia
    var path_found = false;                     // Kas tee on leitud

    
    while(current_index < queue.length){ // Tsükkel kuni queue (järjekorra) viimane element on kontrollitud või lõpp leitud
        current_position = queue[current_index][0]
        // Leia kõik praeguse positsiooniga seotud kohad ja lisa need järjekorda
        for(let i = 1; i < 3; i++){
            let x = current_position[0] + (-1)**i;
            let y = current_position[1];

            if(x < 0 || x > gridHeight - 1 || y < 0 || y > gridWidth - 1){ continue; } // Juhuhl kui kontrollitav positsioon on ruudustikust väljas, ignoreeri seda
            if(gridCopy[x][y]){ continue; } // Juhul kui kontrollitav ruut on sein või seda on juba kontrollitud, ignoreeri seda
            await AddToQueue([[x, y],current_position, queue[current_index][2]+1], queue);
            if([x, y].toString() == end_pos.toString()){ path_found = true; console.log("Found it"); PathFound(queue); return; } // Juhul kui kontrollitud ruut on finish, lõpeta algoritm
            
            gridCopy[x][y] = true;
        }
        for(let i = 1; i < 3; i++){
            let x = current_position[0];
            let y = current_position[1] + (-1)**i;

            if(x < 0 || x > gridHeight - 1 || y < 0 || y > gridWidth - 1){ continue; } // Juhuhl kui kontrollitav positsioon on ruudustikust väljas, ignoreeri seda
            if(gridCopy[x][y]){ continue; } // Juhul kui kontrollitav ruut on sein või seda on juba kontrollitud, ignoreeri seda
            await AddToQueue([[x, y],current_position, queue[current_index][2]+1], queue);
            if([x, y].toString() == end_pos.toString()){ path_found = true; console.log("Found it"); PathFound(queue); return; } // Juhul kui kontrollitud ruut on finish, lõpeta algoritm
            
            gridCopy[x][y] = true;
        }

        current_index += 1;
        PopFromQueue();
    }

    console.log("No path");
    ResetPathfinding();
}

var visualQueue = []

async function AddToQueue(element, queue){
    queue.push(element);
    visualQueue.push('<div class="queue_item queue_unexplored"><h1>' + element[0][1] + ', ' + element[0][0] + '</h1><p>(' + element[1][1] + ', ' + element[1][0] + ')</p></div>');

    var queue_container = document.getElementById("queue_container");
    queue_container.innerHTML = visualQueue.join("");

    if(element[0].toString() != [0,0].toString() && element[0].toString() != [gridHeight-1,gridWidth-1].toString()){
        var tile = document.getElementById(element[0][1] + "_" + element[0][0]);
        tile.className = "tile tile_checked";
        tile.style.backgroundColor = "rgb(" + (140-element[2]*5) + ",0, " + (30+element[2]*5) +  ")"
    }

    await new Promise(r => setTimeout(r, speed));
}

function PopFromQueue(){
    visualQueue.shift();
    var queue_container = document.getElementById("queue_container");
    queue_container.innerHTML = visualQueue.join("");
}

function PathFound(queue){
    var current_index = queue.length-1;
    var current_position = queue[current_index][1];
    var path = [queue[current_index][0]];

    while(current_position.toString() != [0, 0].toString()){
        if(queue[current_index][0] == current_position){
            path.push(queue[current_index][0]);
            current_position = queue[current_index][1];
        }

        current_index -= 1;
    }

    DisplayPath(path);
}

async function DisplayPath(path){
    for(let i = path.length-1; i >= 1; i--){
        var tile = document.getElementById(path[i][1] + '_' + path[i][0]);
        tile.className = 'tile tile_path';
        tile.removeAttribute("style");
        await new Promise(r => setTimeout(r, speed));
    }
}

function ResetPathfinding(){
    currentlySolving = false;
    SetUp();
}