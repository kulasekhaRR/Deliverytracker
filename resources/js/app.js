let addToCart=document.querySelectorAll('.add-to-cart')
console.log('hhh')
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log('jj')
        console.log(e)  
    })
})
