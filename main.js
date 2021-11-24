const modalOpenBtn = document.getElementById("addBtn");
const modal = document.getElementById("modalContainer");
const modalClostBtn = document.getElementById("close");

const date = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const day = document.querySelector(".dayOfWeek");

//modal form
const todoForm = document.querySelector(".inputForm");
const contents = document.getElementById("todoContent");
const submitBtn = document.getElementById("addContent");

//list 
const listForm = document.querySelector(".todoList");

//set month & day
let months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
let week = ["SUNDAY","MONDAY","TUEDAY","WEDDAY","THUDAY","FRIDAY","SATDAY"];
let now = new Date();

date.innerText = String(now.getDate()).padStart(2,"0");
month.innerText= months[now.getMonth()];
year.innerText = now.getFullYear();
day.innerText = week[now.getDay()];

//todos save array
let todoArray = [];

// open modal
function openModal(){
    modal.style.display = "block";
}
modalOpenBtn.addEventListener("click",openModal);

// close modal
function closeModal(){
    modal.style.display = "none";
}
modalClostBtn.addEventListener("click",closeModal);

function saveList(todoArray){
    localStorage.setItem("list",JSON.stringify(todoArray));
}

function deleteList(event){
    const btn = event.target.parentElement;
    const li = btn.parentElement;
    todoArray = todoArray.filter((todo) => todo.id != parseInt(li.id));
    saveList(todoArray);
    li.remove();
}


//check checkbox
function handleCheck(e) {
    if(e.target.checked){ //check되었을 때
        todoArray.map((todo) => {
            if(todo.id == parseInt(e.target.id)){
                todo.check = true;
                console.log("good!!");
            }
        });
    }
    else{ //check가 해지되었을 때
        todoArray.map((todo) => {
            if(todo.id == parseInt(e.target.id)){
                todo.check = false;
                console.log("bad!!");
            }
        });
    }
    saveList(todoArray);
}

// add contents to list
function addList(todos){
    const newList = document.createElement("li");
    newList.id = todos.id;
    const newSpanContain = document.createElement("span");
    newSpanContain.className = "content";
    const newLabel = document.createElement("label");
    newLabel.className="forCheck";

    //checkbox 확인 설정
    const newCheck = document.createElement("input");
    newCheck.setAttribute("type","checkbox");
    newCheck.setAttribute("id",todos.id);
    newCheck.setAttribute("name","check");
    if(todos.check){
        newCheck.setAttribute("checked",true);
    }
    newCheck.addEventListener('change',handleCheck);
    
    const newIcon = document.createElement("span");
    newIcon.className="check_icon";
    const newImg = document.createElement("img");
    newImg.setAttribute("src","check.png");
    newImg.setAttribute("width","12px");
    const newText = document.createElement("span");
    newText.className="check_text";
    newText.innerText = todos.content;
    const newDel = document.createElement("button");
    newDel.className = "delete";
    const icon = document.createElement("i");
    icon.setAttribute("class","far fa-window-close");

    newDel.addEventListener("click",deleteList);
    newList.appendChild(newSpanContain);
    newList.appendChild(newDel);
    newDel.appendChild(icon);
    newSpanContain.appendChild(newLabel);
    newLabel.appendChild(newCheck);
    newLabel.appendChild(newIcon);
    newIcon.appendChild(newImg);
    newLabel.appendChild(newText);
    listForm.appendChild(newList);
}

function handleForm(event){
    event.preventDefault();
    const newTodos = contents.value;
    const newObj = {
        "id":Date.now(),
        "content":newTodos,
        "check":false,
    };
    addList(newObj);
    todoArray.push(newObj);
    saveList(todoArray);
    contents.value="";
    closeModal();
}
todoForm.addEventListener("submit",handleForm);


const saveTodoArray = localStorage.getItem("list");
//localstorage에 저장된 todo들 첫 화면에 띄워주기
if(saveTodoArray != null){
    const tempArray = JSON.parse(saveTodoArray);
    todoArray = tempArray;
    for(todos of tempArray){
        addList(todos);
    }
}



