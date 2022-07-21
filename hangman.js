//keyboard press
window.addEventListener('keypress', e=>{
    let code = e.keyCode - 97;
    if (code >= 0 & code < 26 && alphabet_on === true){
        check(code);
    }
    if (code === 17 && alphabet_on === false){
        location.reload();
    }
})
//data
var categoryArr = [];
var proverbsArr = [];
var fruitsArr = [];
var jobsArr = [];
var moviesArr = [];
proverbsArr.push("Love is blind", "Practise makes perfect", "East or west, home is best", "There is no place", "Easy come, easy go",
                    "Where there is a will, there is a way", "Better late than never", "Time heals all wounds",
                    "Time heals all wounds", "Time is money", "All is well that ends well",
                    "Every man has his faults", "Never judge a book by its cover", "Chill, relax, unwind",
                    "All roads lead to Rome", "Every country has its customs", "The early bird catches the worm", "Easier said than done");
fruitsArr.push("Apple", "Apricot", "Avocado", "Blackcurrant", "Blackberry", "Blueberry", "Coconut", "Fig", "Grape", "Lemon", "Lime", "Lychee",
                "Nectarine", "Orange", "Papaya", "Peach", "Pear", "Pineapple", "Quince", "Raspberry", "Strawberry");
jobsArr.push("Teacher", "Soldier", "Scientist", "Waiter", "Waitress", "Worker", "Painter", "Policeman", "Cleaner", "Cook", "Doctor", "Driver", "Engineer",
            "Explorer", "Farmer", "Fireman", "Footballer", "Hairdresser", "Housemaid", "Judge", "Lawyer", "Musician", "News reporter",
            "Nurse", "Director", "Photographer", "Pilot", "Politician", "Postman", "Receptionist", "Repairman", "Sailor", "Tour guide");
moviesArr.push("The Shawshank Redemption", "The Godfather", "The Dark Night", "Pulp Fiction", "Forrest Gump", "Fight CLub", "Inception", "The Matrix",
                "Goodfellas", "City of God", "Star Wars", "Terminator", "The Pianist", "Parasite", "Gladiator", "The Prestige", "Whiplash", "Ice Age", "Frozen");
categoryArr.push(proverbsArr, fruitsArr, jobsArr, moviesArr);

//variables
var catchphrase = proverbsArr[Math.floor(Math.random()*proverbsArr.length)];
catchphrase = catchphrase.toUpperCase();
var errors = 0;
var covered_catchphrase = "";
for (let i=0; i<catchphrase.length; i++){
    if (catchphrase.charAt(i) === " ") covered_catchphrase += " ";
    else covered_catchphrase += "_";
}
var alphabet_on = true;
var alphabet_checked = false;


//func
function write_catchphrase(){
    document.getElementById("board").innerHTML = covered_catchphrase;
}
function write_new_catchphrase(nr) {
    catchphrase = categoryArr[nr][Math.floor(Math.random() * categoryArr[nr].length)].toUpperCase();
    covered_catchphrase ="";
    for (let i = 0; i < catchphrase.length; i++) {
        if (catchphrase.charAt(i) === " ") covered_catchphrase += " ";
        else covered_catchphrase += "_";
    }
        document.getElementById("board").innerHTML = covered_catchphrase;
    if (alphabet_on !== true || alphabet_checked === true){
        let content_div = "";
        for (let i = 0; i < 26; i++) {
            content_div += '<div class="letter" id="lett' + i + '" onclick="check(' + i + ')">' + String.fromCharCode(65 + i) + '</div>';
        }
        document.getElementById("alphabet").innerHTML = content_div;
        alphabet_on = true;
        errors = 0;
        document.getElementById("gibbet").innerHTML = '<img src="img/s0.jpg" alt="" />';

    }
    }

    function write_category() {
        let catchphrases_div = '<div class="category" id="cat0" onclick="write_new_catchphrase(0)">catchphrases</div>';
        let fruits_div = '<div class="category" id="cat1" onclick="write_new_catchphrase(1)">fruits</div>';
        let jobs_div = '<div class="category" id="cat2" onclick="write_new_catchphrase(2)">jobs</div>';
        let movies_div = '<div class="category" id="cat3" onclick="write_new_catchphrase(3)">movies</div>';
        let categories_divs = catchphrases_div + fruits_div + jobs_div + movies_div;
        document.getElementById("board").innerHTML = '<div class ="categories">' + categories_divs + '</div>';
    }

    window.onload = start;

    function start() {
        let content_div = "";
        for (let i = 0; i < 26; i++) {
            content_div += '<div class="letter" id="lett' + i + '" onclick="check(' + i + ')">' + String.fromCharCode(65 + i) + '</div>';
        }
        document.getElementById("alphabet").innerHTML = content_div;
        write_catchphrase();
    }

    String.prototype.setChar = function (position, char) {
        if (position > this.length - 1) return this.toString();
        else return this.substr(0, position) + char + this.substr(position + 1);
    }

    function check(nr) {
        let tmp = String.fromCharCode(65 + nr);
        let flag = false;
        for (let i = 0; i < catchphrase.length; i++) {
            if (catchphrase.charAt(i) === tmp) {
                covered_catchphrase = covered_catchphrase.setChar(i, tmp);
                flag = true;
            }
        }
        let element = "lett" + nr;
        if (flag) {
            alphabet_checked = true;
            document.getElementById(element).style.background = "#003300";
            document.getElementById(element).style.color = "#00C000";
            document.getElementById(element).style.border = "3px solid #00C000";
            document.getElementById(element).style.cursor = "default";
            write_catchphrase();
        } else {
            alphabet_checked = true;
            document.getElementById(element).style.background = "#7e2020";
            document.getElementById(element).style.color = "#fe4040";
            document.getElementById(element).style.border = "3px solid #fe4040";
            document.getElementById(element).setAttribute("onclick", ";");
            if (document.getElementById(element).style.cursor.valueOf() !== "default"){
            changeImg();}
            document.getElementById(element).style.cursor = "default";
        }
        //win
        if (catchphrase === covered_catchphrase) {
            alphabet_on = false;
            document.getElementById("alphabet").innerHTML = "You win! <br/>The answer was:</br> " + catchphrase + '<br/><br/><span class="reset" onclick="location.reload()">Play again?</span>';
        }
        //loose
        if (errors >= 9) {
            alphabet_on = false;
            document.getElementById("alphabet").innerHTML = "You loose! <br/>The answer was:<br/> " + catchphrase + '<br/><br/><span class="reset" onclick="location.reload()">Play again?</span>';
        }

        function changeImg() {
            let image = "img/s" + (++errors) + ".jpg";
            document.getElementById("gibbet").innerHTML = '<img src="' + image + '" alt="" />';
        }
}