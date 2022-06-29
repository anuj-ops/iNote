
showNotes()


let addbtn=document.getElementById('addbtn')
addbtn.addEventListener('click',function(e){
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');

    let singleNote=localStorage.getItem("allNotes");
    if(singleNote==null){
        notesObj=[];

    }
    else{
        notesObj=JSON.parse(singleNote);
    }

    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj)
    localStorage.setItem('allNotes',JSON.stringify(notesObj));
    addTxt.value=''
    addTitle.value=''
    showNotes();
})

function showNotes() {

    let singleNote=localStorage.getItem("allNotes");
    if(singleNote==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(singleNote);
    }


    let html = ''
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"> ${element.text} </p>
                    <button id=${index} onclick='deleteNote(this.id)' class="btn btn-primary">Delete Node</button>
                </div>
            </div>
            `
    })

    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show, please add a Note`
    }
}


function deleteNote(index){
    let singleNote=localStorage.getItem("allNotes");
    if(singleNote==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(singleNote);
    }
    notesObj.splice(index,1);
    localStorage.setItem('allNotes', JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt')
search.addEventListener('input',function(){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})