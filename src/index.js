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


var post  = document.querySelector('#post')
var box = document.querySelector('#box')
const post_data = ()=>{
        fetch('http://localhost:8000/user' , {
            method:'POST',
            body: JSON.stringify({name: document.getElementById("box").value }),
        })
        .then((res)=>console.log("success",res))
        .catch(err=>console.log(err))
}
post.addEventListener('click' , ()=>{

    console.log("vcal",document.getElementById("box").value)

        if('serviceWorker' in navigator && 'SyncManager' in window)
            {
                navigator
                .serviceWorker
                .ready
                .then(sw => {
                  return  sw.sync.register('sync-new-post')
                })
                .catch(err=>{ 
                    console.log("An error occured while posting the data")
                    post_data()
                })
            }
            else 
                post_data()
})


