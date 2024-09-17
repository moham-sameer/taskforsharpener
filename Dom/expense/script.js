

function submitHandler(event){
    event.preventDefault();
    const expense = document.getElementById('expense').value
    const desc = document.getElementById('description').value
    const cat = document.getElementById('category').value
    const container = document.getElementById('container')
    var form = document.querySelector('form')
    let ul = document.createElement('ul')
    ul.className = "details"
    let li = document.createElement('li')
    li.className = "list-detail"
    li.innerHTML = `${expense} - ${desc} - ${cat} - <button class="delete-btn">Delete Expense</button> - <button class="edit-btn">Edit Expense</button>`
    ul.appendChild(li)
    container.appendChild(ul)
    form.reset()
    let tracking = {
        expense: expense,
        desc: desc,
        cat: cat,
    }
    let storedUser = localStorage.getItem('User Details')
     let usersArray = storedUser ? JSON.parse(storedUser):[]
        usersArray.push(tracking)
    localStorage.setItem('User Details',JSON.stringify(usersArray))
  
}

document.body.addEventListener('click',(event)=>{
    if(event.target.classList.contains('delete-btn')){
        let listToRemove = event.target.parentElement
        let listInfo = listToRemove.innerHTML.split(" - ")
        let expense = listInfo[0].trim()
        let desc = listInfo[1].trim()
        let cat = listInfo[2].trim()
        let userArray = JSON.parse(localStorage.getItem('User Details')) || []
         userArray = userArray.filter((user)=>{
            return  !(user.expense === expense && user.desc === desc && user.cat === cat)
        })
         localStorage.setItem('User Details',JSON.stringify(userArray))
        listToRemove.remove()
        
    }else if(event.target.classList.contains('edit-btn')){
        let listToRemove = event.target.parentElement
        let listInfo = listToRemove.innerHTML.split(" - ")
        let expense = listInfo[0].trim()
        let desc = listInfo[1].trim()
        let cat = listInfo[2].trim()
          document.getElementById('expense').value = expense
          document.getElementById('description').value = desc
          document.getElementById('category').value = cat
          let userArray = JSON.parse(localStorage.getItem('User Details')) || []
          userArray = userArray.filter((user)=>{
             return  !(user.expense === expense && user.desc === desc && user.cat === cat)
         })
          localStorage.setItem('User Details',JSON.stringify(userArray))
         listToRemove.remove()
    }
})