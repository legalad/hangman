//data
var catchphraseArr = new Array();
catchphraseArr.push("Love is blind", "Practise makes perfect", "East or west, home is best", "There is no place", "Easy come, easy go",
                    "Where there is a will, there is a way", "Better late than never", "Time heals all wounds",
                    "Time heals all wounds", "Time is money", "All is well that ends well",
                    "Every man has his faults", "Never judge a book by its cover", "Chill, relax, unwind",
                    "All roads lead to Rome", "Every country has its customs", "The early bird catches the worm", "Easier said than done");


var catchphrase = catchphraseArr[Math.floor(Math.random()*catchphraseArr.length)];
catchphrase = catchphrase.toUpperCase();
var errors = 0;

var covered_catchphrase = "";
for (let i=0; i<catchphrase.length; i++){
    if (catchphrase.charAt(i) === " ") covered_catchphrase += " ";
    else covered_catchphrase += "_";
}
function write_catchphrase(){
    document.getElementById("board").innerHTML = covered_catchphrase;
}

window.onload = start;
function start(){
    let content_div = "";
    for(let i=0; i < 26; i++){
        content_div += '<div class="letter" id="lett'+ i +'" onclick="check('+i+')">'+String.fromCharCode(65+i)+'</div>'
    }
    document.getElementById("alphabet").innerHTML = content_div;
    write_catchphrase();
}
String.prototype.setChar = function (position, char){
    if(position > this.length -1) return this.toString();
    else return this.substr(0, position) + char + this.substr(position + 1);
}

function check(nr){
    let tmp = String.fromCharCode(65+nr);
    let flag = false;
    for (let i = 0; i<catchphrase.length; i++){
        if(catchphrase.charAt(i) === tmp){
            covered_catchphrase = covered_catchphrase.setChar(i, tmp);
            flag = true;
        }
    }
    let element = "lett" + nr;
    if (flag){
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        write_catchphrase();
    }
    else {
        document.getElementById(element).style.background = "#7e2020";
        document.getElementById(element).style.color = "#fe4040";
        document.getElementById(element).style.border = "3px solid #fe4040";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");

        changeImg();
    }
    //win
    if (catchphrase == covered_catchphrase){
        document.getElementById("alphabet").innerHTML = "You win! The answer was: " + catchphrase + '<br/><br/><span class="reset" onclick="location.reload()">Play again?</span>';
    }
    //loose
    if (errors >= 9){
        document.getElementById("alphabet").innerHTML = "You loose! The answer was: " + catchphrase + '<br/><br/><span class="reset" onclick="location.reload()">Play again?</span>';
    }

    function changeImg(){
        let image = "img/s" + (++errors) + ".jpg";
        document.getElementById("gibbet").innerHTML = '<img src="'+image+'" alt="" />';
        setTimeout("changeImg()", 50000);
    }
}