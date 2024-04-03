let start = document.getElementById("start");

let title;
let input;
let preTitle;
let img1;
let img2;

let body = document.body;

start.addEventListener("click", ()=>{
    //удалить элемент
    start.parentNode.removeChild(start);

    title = document.createElement("h1");
    input = document.createElement("input");

    title.textContent = "Введите Ваше имя!";

    body.append(title);
    body.append(input);


    input.addEventListener("keyup", (event)=>{
        //event - объект, в котором хранится информация о событии
        if(event.code == "Enter"){
            title.textContent = "Добро пожаловать, " + input.value;

            input.parentNode.removeChild(input);

            setTimeout(() =>{
                title.parentNode.removeChild(title);
                //запускаем сл. уровень
                iLoveMath();
            }, 2000);
        }
    })
})


//вопрос, ответ, следующий уровень
function createTextLevel(question, answer, nextLevel){
    title = document.createElement("h1");
    input = document.createElement("input");
    preTitle = document.createElement("p");

    title.textContent = question;

    body.append(title);
    body.append(input);
    body.append(preTitle);


    input.addEventListener("keyup", (event)=>{
        if(event.code == "Enter"){
            if(input.value.toLowerCase() == answer){
                input.parentNode.removeChild(input);
                preTitle.textContent = "Верно";
                //через 2 секунды запускаем новый уровень
                setTimeout(()=>{
                    title.parentNode.removeChild(title);
                    preTitle.parentNode.removeChild(preTitle);
                    //запускаем новый уровень
                    if(nextLevel != null){
                        nextLevel();
                    }
                }, 2000)
            } else{
                preTitle.textContent = "Неверно!";
                input.value = "";
            }
        }
    })
}


function iLoveMath(){
    createTextLevel("Сколько будет 2*8?", 16, iLoveGeograph);
}

function iLoveGeograph(){
    createTextLevel("Назовите столицу Грузии", "тбилиси", iLoveBiology);
}

function iLoveBiology(){
    createTextLevel("Из какого дерева делают спички?", "осина", iLoveMount);
}




function createIMGLevel(question, trueLink, falseLink, nextLevel){
    title = document.createElement("h1");
    preTitle = document.createElement("p");

    img1 = document.createElement("img");
    img2 = document.createElement("img");


    if(Math.floor(Math.random()*10)%2 == 1){
        img1.src = trueLink;
        img2.src = falseLink;

        img1.addEventListener("click", falseAns);
    
        img2.addEventListener("click", trueAns);
    } else{
        img1.src = falseLink;
        img2.src = trueLink;

        img1.addEventListener("click", trueAns);
    
        img2.addEventListener("click", falseAns);
    }


    title.textContent = question;

    body.append(title);
    body.append(preTitle);
    body.append(img1);
    body.append(img2);


    function trueAns(){
        img1.parentNode.removeChild(img1);
        img2.parentNode.removeChild(img2);
        preTitle.textContent = "Верно!";
        //запустить следующий уровень
        setTimeout(()=>{
            title.parentNode.removeChild(title);
            preTitle.parentNode.removeChild(preTitle);
            //запускаем новый уровень
            if(nextLevel != null){
                nextLevel();
            }
        }, 2000)
    }

    function falseAns(){
        preTitle.textContent = "Неверно!";
    }


}

function iLoveMount(){
    createIMGLevel("На какой картинке Эверест?", "./img/elbrus.jpg", "./img/everest.jpg", iLoveMount);
}