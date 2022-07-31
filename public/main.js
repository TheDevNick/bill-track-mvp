
const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBill)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', markPaid)
})

async function deleteBill(){
    const bName = this.parentNode.innerText
    try{
        const response = await fetch('deleteBill', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'billNameS': bName
            })
          })
        const data = await response.json()//this response came from the server
        location.reload()
        console.log(data)
        console.log(`bName is: ${bName} .`)

    }catch(err){
        console.log(err)
    }
}

async function markPaid(){
    const bName = this.parentNode.innerText
    
}