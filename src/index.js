import './styles.css'

console.log("working")

if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('./sw.js')
    .then(()=>{
        console.log("Service Worker registered")
    })
}




fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))