function main(){
    // clear text
    document.getElementById("a1").innerHTML = '';
    document.getElementById("a2").innerHTML = '';
    document.getElementById("a3").innerHTML = '';
    document.getElementById("a4").innerHTML = '';

    // get paragraph from textarea
    var p1Content = document.getElementById("p1").value;
    var p2Content = document.getElementById("p2").value;
    var p3Content = document.getElementById("p3").value;

   // remove /n from the paragraphs
    while(p1Content.includes('\n')){
        p1Content = p1Content.replace('\n',' ');
    }
    while(p2Content.includes('\n')){
        p2Content = p2Content.replace('\n',' ');
    }
    while(p3Content.includes('\n')){
        p3Content = p3Content.replace('\n',' ');
    }

    // remove all punctuation and characters from paragraphs
    p1Content = p1Content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    p2Content = p2Content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    p3Content = p3Content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    // Creating an array of individual words from the paragraphs
    const arrayP1raw = p1Content.split(" ");
    const arrayP2raw = p2Content.split(" ");
    const arrayP3raw = p3Content.split(" ");

    // remove empty items from array
    for(let i = 0; i < arrayP1raw.length; i++){
        if(arrayP1raw[i] === '') arrayP1raw.splice(i,1);
    }
    for(let i = 0; i < arrayP2raw.length; i++){
        if(arrayP2raw[i] === '') arrayP2raw.splice(i,1);
    }
    for(let i = 0; i < arrayP3raw.length; i++){
        if(arrayP3raw[i] === '') arrayP3raw.splice(i,1);
    }

    const arrayP1 = arrayP1raw;
    const arrayP2 = arrayP2raw;
    const arrayP3 = arrayP3raw;

    // console.log(arrayP1);
    // console.log(arrayP2);
    // console.log(arrayP3);


    // get the Most common words and their count from each parargraph        
    var par1array = frequentWord(arrayP1raw,arrayP1raw.length);
    var par2array = frequentWord(arrayP2raw,arrayP2raw.length);
    var par3array = frequentWord(arrayP3raw,arrayP3raw.length);

    // print the word and paragrahs
    if(par1array[0].length > 0){
        document.getElementById("a1").innerHTML += "Most frequent word(s): <br>";
        for(let i = 0; i < par1array[0].length; i++){
            if(par1array[0][i] != 0)
                document.getElementById("a1").innerHTML += "<u>" + par1array[0][i] + "</u>" + " was used " + par1array[1] + " times <br>";

        }
    }

    if(par2array[0].length > 0){
        document.getElementById("a2").innerHTML += "Most frequent word(s): <br>";
        for(let i = 0; i < par2array[0].length; i++){
            if(par2array[0][i] != 0)
                document.getElementById("a2").innerHTML += "<u>" + par2array[0][i] + "</u>" + " was used " + par2array[1] + " times <br>";

        }    
    }

    if(par3array[0].length > 0){
        document.getElementById("a3").innerHTML += "Most frequent word(s): <br>";
        for(let i = 0; i < par3array[0].length; i++){
            if(par3array[0][i] != 0)
                document.getElementById("a3").innerHTML += "<u>" + par3array[0][i] + "</u>" + " was used " + par3array[1] + " times <br>";

        }    
    }

    // Making the arrays equal length by adding 0s at the end
    var maxLenArray = Math.max(arrayP1.length,arrayP2.length,arrayP3.length);

    while(arrayP1.length != maxLenArray) arrayP1.push(0);
    while(arrayP2.length != maxLenArray) arrayP2.push(0);
    while(arrayP3.length != maxLenArray) arrayP3.push(0);

    var comWordsArray = commonWords(arrayP1,arrayP2,arrayP3,maxLenArray); // Returns an array with all the common characters
    
    // prints all common characters
    if(comWordsArray.length > 0){
        document.getElementById("a4").innerHTML = "Common words in all 3 paragraphs : "; 

        for(let i = 0; i<comWordsArray.length;i++){
        document.getElementById("a4").innerHTML += "<br>" +( 1+Number(i)) + ": "+ comWordsArray[i];    
        }

        document.getElementById("a4").innerHTML += "<br>";
    }
}



// takes 3 arrays and returns a list of words present in all of them
function commonWords(a1,a2,a3,maxLen){
    var commonArray = [];

    for(let i = 0; i <= maxLen; i++){

        if(a2.includes(a1[i]) && a3.includes(a1[i])){
            if(a1[i] != ''){
                commonArray.push(a1[i]);
            }
        } 
            
        if(a2.includes(a3[i]) && a1.includes(a3[i])){
            if(a3[i] != ''){
                commonArray.push(a3[i]);
            }
        } 

        if(a1.includes(a2[i]) && a3.includes(a2[i])){
            if(a2[i] != ''){
                commonArray.push(a2[i]);
            }
        } 

    }
    let uniqueCommonArray = [...new Set(commonArray)];
    return uniqueCommonArray;
}

// returns the word/s that are most frequent and the count
function frequentWord(arr, len){

    var count;
    var word;
    var visitedCount = [];
    var visitedWord = [];

    console.log(arr);
    
    for(let i = 0; i < len; i++){
        word = arr[i];

        if(visitedWord.includes(word)) continue;
        if(arr[i] === '') continue;

        count = 1;
        for(let j = i + 1; j < len; j++){
            if(arr[j] == word){
                count++;
            }
        }

        visitedCount.push(count);
        visitedWord.push(word);
    }

    var highestFreq = Math.max.apply(Math, visitedCount); 
    console.log(highestFreq);
    var mostFreqWord = [];

    for(let k = 0; k < visitedCount.length; k++){
        
        if(visitedCount[k] == highestFreq){
            mostFreqWord.push(visitedWord[k]);
        }
    }
   
    return [mostFreqWord,highestFreq];

}