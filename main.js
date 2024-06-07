


let tbody=document.getElementById('data-tbody')



function display(){
    
    var contain="";
    let sites=JSON.parse(window.localStorage.getItem("lists")) || [];

    for(var i=0 ; i<sites.length ; ++i){
    
        contain=contain+`
    
        <tr data-id="${i}">
        <td>${i+1}</td>
        <td>${sites[i].siteName}</td>
        <td><button class="view_bt" onclick="view(${i})"> <i class="fa-solid fa-eye pe-2"></i><a href="${sites[i].site_url}">vist</a></button></td>
        <td><button class="del_bt" onclick="delete_row(${i})"  ><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
    
        </tr>
        
        `
    
      

        
    }

    tbody.innerHTML=contain

}

// display(0)   
display()   

let bookName_input=document.getElementById("bookmark_name")
let url_input=document.getElementById("url")



// var expression = (https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}
// const expression = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(?:\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}$/;
var expression =/^(?:https?:\/\/)?(?:[\w\-]+(?:\.[\w\-]+)+(?:\/[\w\-\/thumbs]*)*(?:\?(?:[\w\-&=]+))?|(?:www(?:\.[\w\-]+)*(?:\/[\w\-\/thumbs]*)*(?:\?(?:[\w\-&=]+))?)|(?:[\w\-]+(?:\.[\w\-]+)+))(?::\d+)?$/;

// /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);



function bookName_valid(x){


    if(x.length<3)
        return false;

    return true;

}


function url_valid(x){


     
    if(! x.match(regex))
        return false;

    return true;

}



bookName_input.onkeyup=function(){

   

 

    let current=bookName_input.value


    if(bookName_valid(current)==false){
        bookName_input.style.borderColor="red"
        bookName_input.style.outlineColor="rgb(255, 0, 0,0.3)"
    }
    
   else{
            bookName_input.style.borderColor="green "
            bookName_input.style.outlineColor="rgba(25,194,00,0.3) "
        }


}

url_input.onkeyup=function(){


    let current_url=url_input.value

   
    
    if(!url_valid(current_url)){

        url_input.style.borderColor="red"
        url_input.style.outlineColor="rgb(255, 0, 0,0.3)"

    }

    else{
        url_input.style.borderColor="green"
        url_input.style.outlineColor="rgba(25,194,00,0.3) "

    }

}


let pop_div=document.getElementById("pop")

let submitButton=document.getElementById("submit")

let close_button=document.getElementById("closeBtn")

close_button.onclick=function(){

    pop_div.style.visibility="hidden"


}

function clear(){

    bookName_input.value="";
    url_input.value=""


}

submitButton.onclick=function(){

    let current_name=bookName_input.value
    let current_url=url_input.value


    if(bookName_valid(current_name)==false || url_valid(current_url)==false){

        pop_div.style.visibility="visible"
      
    }

    else{

     var obj={

        siteName:current_name,
        site_url:current_url
     }

     var arr=[]
     arr = JSON.parse(localStorage.getItem("lists")) || [];
     arr.push(obj)
     localStorage.setItem("lists",JSON.stringify(arr))
     tbody.innerHTML=tbody.innerHTML+`
     <tr data-id="${arr.length-1}">
    <td>${arr.length}</td>
    <td>${obj.siteName}</td>
    <td><button class="view_bt"  onclick="view(${arr.length})"> <i class="fa-solid fa-eye pe-2"></i><a href="${obj.site_url}">vist</a></button></td>
    <td><button class="del_bt" onclick="delete_row(${arr.length-1})" ><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>

    </tr>
    
    `


    clear();
 

    
    }


}




function view(i){

    let sites=JSON.parse(localStorage.getItem("lists")) || [];
    var link=sites[i].site_url
    open(link, "_blank")
    
}





function delete_row(i){

    var arr=[]
    arr = JSON.parse(localStorage.getItem("lists")) || [];

    arr.splice(i,1)

    localStorage.setItem("lists",JSON.stringify(arr))
    // display(0)
    display()


}





