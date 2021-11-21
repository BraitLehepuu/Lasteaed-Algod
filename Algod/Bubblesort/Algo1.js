
var row_length = 10;
var row = NaN;
var row_exists = false;
var array_ = NaN
var ms = 1000
var cycle = 1
var restart = false
var solving = false



 
async function Bubblesort(array){

    
    let lenght_ = array.length;
    array_ = array;
    var sorted = false;

    while(!sorted){
        
        var sorted_counter = 1;

        for(let i = 0; i < lenght_ - 1; i++){

            
            if(array_[i] > array_[i+1]){
                let temp = array_[i];
                array_[i] = array_[i+1];
                array_[i+1] = temp;
                await ShowStep(i, 'y');
                if(restart){
                    restart = false
                    return
                }
                document.getElementById(i).innerHTML = '<div class="tile" id="' + i + '"><h1>' + array_[i] + '</h1></div>';
                document.getElementById(i+1).innerHTML = '<div class="tile" id="' + (i+1) + '"><h1>' + array_[i+1] + '</h1></div>';
            }
            else{
                sorted_counter+=1;
                await ShowStep(i, 'n');
                if(restart){
                    restart = false
                    return
                }
                document.getElementById(i).innerHTML = '<div class="tile" id="' + i + '"><h1>' + array_[i] + '</h1></div>';
                document.getElementById(i+1).innerHTML = '<div class="tile" id="' + (i+1) + '"><h1>' + array_[i+1] + '</h1></div>';
            }

            CreateRow()
        }


        if(sorted_counter == lenght_){
            sorted = true;
            cycle -= 1
        }
        cycle += 1
        document.getElementById('cycles').innerHTML = '<div id="cycle"><p>Tsükkel nr.' + cycle + '</p></div>'
    }
    document.getElementById('cycles').innerHTML = '<div id="cycle"><p>Lahendamiseks kulus ' + cycle + ' tsüklit</p></div>'
    solving = false
}   


function CreateArray(){
    var array = [];
    for(let i = 0; i < row_length; i++){
        let x = Math.floor((Math.random() * 50) + 1);
        array.push(x);
    }

    return array;
}

function CreateRow(){
    if(row_exists){
        row = array_;
    }
    else{
        row = CreateArray();
    }
    row_exists = true
    var row_container = document.getElementById('row_container');
    var html_array = [];
    var id = 0;
    for(number of row){
        html_array.push('<div class="tile" id="' + id + '"><h1>' + number + '</h1></div>');
        id += 1
        }
    row_container.innerHTML = html_array.join('');
    
    
}

function StartSort(){
    if(solving){
        return
    }
    solving = true
    restart = false
    document.getElementById('cycles').innerHTML = '<div id="cycle"><p>Tsükkel nr.' + cycle + '</p></div>'
    Bubblesort(row);
}

async function ShowStep(index, swap){
    if(swap == 'y'){
        var tile_1 = document.getElementById(index);
        var tile_2 = document.getElementById(index+1);
        tile_1.innerHTML = '<div class="tile_swap" id="' + index + '"><h1>' + array_[index] + '</h1></div>';
        tile_2.innerHTML = '<div class="tile_swap" id="' + (index+1) + '"><h1>' + array_[index+1] + '</h1></div>';
    }
    else if(swap == 'n'){
        var tile_1 = document.getElementById(index);
        var tile_2 = document.getElementById(index+1);
        tile_1.innerHTML = '<div class="tile_noswap" id="' + index + '"><h1>' + array_[index] + '</h1></div>';
        tile_2.innerHTML = '<div class="tile_noswap" id="' + (index+1) + '"><h1>' + array_[index+1] + '</h1></div>';
    }
    await new Promise(r => setTimeout(r, ms));
}

function Restart(){
    solving = false
    row_exists = false
    cycle = 1
    restart = true
    document.getElementById('cycles').innerHTML = '<div id="cycle"></div>'
    CreateRow()
}


