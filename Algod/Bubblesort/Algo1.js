
var row_length = 10

function Bubblesort(array){

    
    let lenght_ = array.length
    const array_ = array
    var sorted = false;

    while(!sorted){
        
        var sorted_counter = 2;
        
        for(let i = 0; i < lenght_ - 1; i++){
            if(array_[i] > array_[i+1]){
                let temp = array_[i]
                array_[i] = array_[i+1]
                array_[i+1] = temp
            }
            else{
                sorted_counter+=1;
            }
        }

        if(sorted_counter == lenght_){
            sorted = true;
        }
    }
    return array_
}   


function CreateArray(){
    var array = [];
    for(let i = 0; i < row_length; i++){
        let x = Math.floor((Math.random() * 20) + 1);
        array.push(x);
    }

    return array;
}

function CreateRow(){
    var row = CreateArray();
    var row_container = document.getElementById('row_container');
    var html_array = [];
    console.log(row)
    for(number of row){
        console.log(number)
        html_array.push('<div class="tile"><h1>' + number + '</h1></div>');

    }
    row_container.innerHTML = html_array.join('')
}