var form = document.getElementById('addForm');
var newitem = document.getElementById('items');
var amount=document.getElementById('amount');
var desc=document.getElementById('desc');
var cat=document.getElementById('categories');
var expense=[]



form.addEventListener('submit',submitForm);


newitem.addEventListener('click',delitem)
function submitForm(e){
    e.preventDefault();

    
    
    var myobj={
        amount : amount.value,
        descrition: desc.value,
        catecgory:cat.value
    }
    
    console.log(expense)
    console.log(typeof expense)
    expense.push(myobj)
    let myobj_serial=JSON.stringify(expense);
    localStorage.setItem('expenses',myobj_serial);
    var li=document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode("Amount: "));
    li.appendChild(document.createTextNode(amount.value));
    li.appendChild(document.createTextNode(" - Descrption :"));
    li.appendChild(document.createTextNode(desc.value));
    li.appendChild(document.createTextNode(" - Catecgory :"));
    li.appendChild(document.createTextNode(cat.value));
    //delete Btn
    var del=document.createElement('button');
    del.className='btn btn-danger btn-sm float-right delete';
    del.appendChild(document.createTextNode('X'));

    //Edit btn
    var edt=document.createElement('button');
    edt.className='btn btn-warning btn-sm float-right edit';
    edt.appendChild(document.createTextNode('Edit'))

    li.appendChild(edt)
    li.appendChild(del)
    newitem.appendChild(li);
    
    
    amount.value=""
    desc.value=""
    cat.value=""

    
    

}

function display(){
    Load();
    for (let i=0;i<expense.length;i++){
        const expitem=expense[i];
        var li=document.createElement('li');
        li.className='list-group-item';
        li.appendChild(document.createTextNode("Amount: "));
        li.appendChild(document.createTextNode(expitem['amount']));
        li.appendChild(document.createTextNode(" - Descrption :"));
        li.appendChild(document.createTextNode(expitem['descrition']));
        li.appendChild(document.createTextNode(" - Catecgory :"));
        li.appendChild(document.createTextNode(expitem['catecgory']));
        //delete Btn
        var del=document.createElement('button');
        del.className='btn btn-danger btn-sm float-right delete';
        del.appendChild(document.createTextNode('X'));

        //Edit btn
        var edt=document.createElement('button');
        edt.className='btn btn-warning btn-sm float-right edit';
        edt.appendChild(document.createTextNode('Edit'))

        li.appendChild(edt)
        li.appendChild(del)
        newitem.appendChild(li);
        
    }
}
display()
function Load(){
    const its=localStorage.getItem('expenses');
    if (its){
        expense=JSON.parse(its)
    }
}

function delitem(e){
    
    if(e.target.classList.contains('delete')){
        if(confirm("Are you Sure, You want to Delete it?")){
            var li=e.target.parentElement;
            var deletitem=li.childNodes[2].textContent;
            let desvalue=li.childNodes[3].textContent;
            newitem.removeChild(li)
            console.log(desvalue)
            for (let i=0;i<expense.length;i++){
                const expitem=expense[i];
                if (expitem['descrition']==desvalue){
                    expense.remove(i)
                }
            }


            localStorage.removeItem(deletitem)

            
        }
    }
    if(e.target.classList.contains('edit')){
        if(confirm("Are you Sure, You want to Edit it?")){
            var li=e.target.parentElement;
            var edititem=li.childNodes[3].textContent;
            amount.value=li.childNodes[1].textContent;
            desc.value=li.childNodes[3].textContent;
            cat.value=li.childNodes[5].textContent;
            newitem.removeChild(li)
            localStorage.removeItem(edititem)
            
        }
    }
}
