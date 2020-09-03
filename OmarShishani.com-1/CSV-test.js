let text1;

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                text1 = allText;
            }
        }
    }
    rawFile.send(null);
}

const file1 = "http://omarshishani.com/CSV-test.txt";
readTextFile(file1);
console.log(text1);
//Text now exists as text1.
//Use regex to seperate the text and push the chunks to an array.
const chunkArr = [];
const chunkRegex = /~.+~/g;