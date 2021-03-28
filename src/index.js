import './styles.css'

console.log("working")

if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('./sw.js')
    .then(()=>{
        console.log("Service Worker registered")
    })
}

var showInstallPrompt = null;

window.addEventListener("beforeinstallprompt" , (event)=>{
    console.log("Install prompt fired")
    event.preventDefault()
    showInstallPrompt = event 
    return false
})


var addToHomeScreen = document.querySelector('#add_to_home_screen')
addToHomeScreen.addEventListener('click' , ()=>{
    console.log(showInstallPrompt)
    if(showInstallPrompt){
        showInstallPrompt.userChoice.then((choice)=>{
            console.log(choice.outcome)
            if(choice.outcome === "dismissed")
            console.log("User Do not want to add to homescreen")
            else 
            console.log("user added pwa to homescreen")
        })
        showInstallPrompt = null
    }
} )


var nextPage = document.querySelector('#clickme')

nextPage.addEventListener('click' , (event)=>{
event.preventDefault()
location.href = "/second.html"
})


var button  = document.querySelector('#fetchname')

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

