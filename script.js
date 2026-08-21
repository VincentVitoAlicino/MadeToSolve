//Login
let SubmitButton = document.getElementById("SubmitButton");
let NameInput = document.getElementById("NameInput");
let SurnameInput = document.getElementById("SurnameInput");
let EmailInput = document.getElementById("EmailInput");


//Main
let ButtonA = document.getElementById("ButtonA");
let ButtonB = document.getElementById("ButtonB");
let ButtonC = document.getElementById("ButtonC");
let ButtonD = document.getElementById("ButtonD");

let StarterPoints = 0 //a
let TrainerPoints = 0 //b
let RevealerPoints = 0 //c
let MerchantPoints = 0 //d
let ConnectorPoints = 0 //e
let LeaderPoints = 0 //f
let SolverPoints = 0 //g
let TotalPoints = 0
let PointList = []
let CreativeTypes = []
let Maxes = []
let TypesArr = [];
let QuestionsArr = [];
let GlobalCounter = 0;
let NumberOfQuestions;
let FileFound = false;


const testButton = document.getElementById("testButton");
if (testButton){
testButton.addEventListener("click", function() {

    fetch("https://script.google.com/macros/s/AKfycbw50gxzBfWtKGZaBfVYQgVNBbdbOz-JU62KPJwX7UwfUISlPDF-Izap8OdCSHMg8fY2/exec", {
        method: "POST",
        body: "Hello from my website"
    });

});
}


console.log('HEllo')
//alert("JavaScript is Running")
main();

async function main() {
    await GetTextFile();
    //alert(GlobalCounter)
    //alert(NumberOfQuestions)
    //TextFile
    if (SubmitButton) {
        SubmitButton.addEventListener("click", function () {
            console.log('Hi');
            validation();
        })
    }
    else if (ButtonA) {
        UpdateQuestion();
    }

    if (ButtonA) {
        ButtonA.addEventListener("click", function () {
            console.log('A')
            run('a');

        })
        ButtonB.addEventListener("click", function () {
            console.log('B')
            run('b')
        })
        ButtonC.addEventListener("click", function () {
            console.log('C')
            run('c')
        })
        ButtonD.addEventListener("click", function () {
            console.log('D')
            run('d')
        })
    }
    if (document.getElementById("Stats")) {
        //alert('Test')
        Print();

    }
        //alert('Test2')
}

//Testing
function run(answer) {
    if (GlobalCounter < NumberOfQuestions - 1) {
        UpdateScore(TypesArr[GlobalCounter], answer)
        GlobalCounter++;
        UpdateQuestion();
    }
    else {


        ending();
    }
}

function ending() {
    Rank();
    CreateResult();
    window.location.href = "results.html";
}

//Functions
/*async function Test() {

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Hello!");

}
*/

async function GetTextFile() {

    try {

        const response = await fetch("./Questions.txt");

        console.log("Status:", response.status);

        console.log("OK:", response.ok);

        const text = await response.text();

        console.log(text);
        let lines = text.split("\n");
        //console.log(lines);
        for (let i = 0; i < lines.length; i++) {
            if (i % 2 === 1) {
                TypesArr.push(lines[i])
                //console.log(lines[i]) 
            }
        }
        QuestionsArr = lines.filter((line, i) => i % 2 === 0)
        console.log(QuestionsArr)
        console.log(TypesArr)
        NumberOfQuestions = QuestionsArr.length;
        FileFound = true;

    } catch (error) {

        console.error("ERROR:", error);

    }

}

function validation() {
    if(NameInput.value === ''){
    document.getElementById("Warning").textContent = 'Please Enter A Name.'   
    }
    else if(SurnameInput.value === ''){
        document.getElementById("Warning").textContent = 'Please Enter A Surname.'
    }
    else if(EmailInput.value === ''){
        document.getElementById("Warning").textContent = 'Please Enter An Email Address.'
    }
    else if(EmailInput.value.indexOf("@")===-1){
        document.getElementById("Warning").textContent = 'Please Enter A Valid Email Address.'
    }
    else if(EmailInput.value.indexOf(".")===-1){
        document.getElementById("Warning").textContent = 'Please Enter A Valid Email Address.'
    }
    else{
    window.location.href = "main.html";
    }
}

function UpdateQuestion() {
    document.getElementById("Question").textContent = QuestionsArr[GlobalCounter]
}

function UpdateScore(options, answer) {
    let person;
    let points;
    switch (answer) {
        case "a":
            console.log('Selection: A');
            person = options.slice(0, options.indexOf('1'));
            console.log(person)
            points = 2;
            break;

        case "b":
            console.log('Selection: B');
            person = options.slice(options.indexOf('1') + 1, options.indexOf('2'));
            points = 4;
            break;
        case "c":
            console.log('Selection: C');
            person = options.slice(options.indexOf('2') + 1, options.indexOf('3'));
            points = 6;
            break;
        case "d":
            console.log('Selection: D');
            person = options.slice(options.indexOf('3') + 1, options.indexOf('4'));
            points = 8;
            break;
    }
    //console.log(person)
    for (j = 0; j < person.length; j++) {
        TotalPoints = TotalPoints + points
        switch (person[j]) {
            case "a":
                console.log('Starter: ' + points);
                StarterPoints = StarterPoints + points;
                break;
            case "b":
                console.log('Trainer: ' + points);
                TrainerPoints = TrainerPoints + points;
                break;
            case "c":
                console.log('Revealer: ' + points);
                RevealerPoints = RevealerPoints + points;
                break;
            case "d":
                console.log('Merchant: ' + points);
                MerchantPoints = MerchantPoints + points;
                break;
            case "e":
                console.log('Connector: ' + points);
                ConnectorPoints = ConnectorPoints + points;
                break;
            case "f":
                console.log('Leader: ' + points);
                LeaderPoints = LeaderPoints + points;
                break;
            case "g":
                console.log('Solver: ' + points);
                SolverPoints = SolverPoints + points;
                break;

        }

    }


}
function Print() {
    document.getElementById("YourResult").textContent = localStorage.getItem('YourResult');
    document.getElementById("Stats").textContent = localStorage.getItem('Stats');

    console.log('You are a: \t\t' + Maxes.join(' '));
    console.log(localStorage.getItem('Stats'))

    let csv = "Name,Age,Score\n";

    csv += "John,20,85\n";

    csv += "Sarah,22,91\n";

    csv += "Mike,19,78\n";

    let blob = new Blob([csv], { type: "text/csv" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "results.csv";

    link.click();
}

function CreateResult(){
        let Stats = ''
    
    let YourResult = ('You are a: \t\t' + Maxes.join(' '));
    Stats += ('Creative Types\t\tPercentage\n') 
    for (i = 0; i < PointList.length; i++) {
        Stats += (CreativeTypes[i] + ':     \t\t\t' + (Math.round((PointList[i] / TotalPoints) * 100*100)/100)+ '%\n')
    }
    localStorage.setItem('Stats', Stats)
    localStorage.setItem('YourResult', YourResult)
}

function Rank() {
    /*console.log('Starter: ' + StarterPoints + '\n' +
                'Trainer: ' + TrainerPoints + '\n'+
                'Revealer: ' + RevealerPoints + '\n'+
                'Merchant: ' + MerchantPoints + '\n'+
                'Connector: ' + ConnectorPoints + '\n'+
                'Leader: ' + LeaderPoints + '\n'+
                'Solver: ' + SolverPoints + '\n');*/
    let unsorted = true;
    let TopThree = true;
    let iTopThree = 0;
    let MaxCheck = true
    let spare;
    let string;
    PointList = [StarterPoints, TrainerPoints, MerchantPoints, SolverPoints, LeaderPoints, ConnectorPoints, RevealerPoints]
    CreativeTypes = ['Starter', 'Trainer', 'Merchant', 'Solver', 'Leader', 'Connector', 'Revealer']
    //console.log(PointList)
    while (unsorted) {
        unsorted = false
        for (let i = 0; i < PointList.length; i++) {
            if (PointList[i] < PointList[i + 1]) {
                spare = PointList[i]
                PointList[i] = PointList[i + 1]

                PointList[i + 1] = spare

                string = CreativeTypes[i]
                CreativeTypes[i] = CreativeTypes[i + 1]
                CreativeTypes[i + 1] = string

                unsorted = true
            }

        }
    }
    for (let i = 0; i < PointList.length; i++) {
        if (PointList[i] === PointList[0]) {
            Maxes.push(CreativeTypes[i])
        }
    }

    let k=0;
    while (TopThree){
        if (k<PointList.length-1){
        if (PointList[k+1] < PointList[k]){
            iTopThree++;
        }
        if (iTopThree < 3){
            k++;
        }

        else{
            TopThree = false;
            CreativeTypes.splice(k+1)
            PointList.splice(k+1)
        } 
    }
    else{
        TopThree = false;
    }

    }
    //console.log(PointList)
    console.log(PointList)
    console.log(CreativeTypes)
    console.log('')
    console.log(Maxes)
    // alert('Done')
}









//Results


