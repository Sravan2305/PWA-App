var button  = document.querySelector('#clickme')

console.log("Buttons are "+button)

button.addEventListener('click' , ()=>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json =>{
      var p = document.createElement('p')
      p.innerText = json.title || "No Data"
      console.log(p)
      document.body.appendChild(p)
  } )
})


var nextPage = document.querySelector('#prev')

nextPage.addEventListener('click' , (event)=>{
location.href = "/"
event.preventDefault()

})