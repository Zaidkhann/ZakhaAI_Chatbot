let imgsenddiv = document.querySelector("#imgsenddiv")
let userinputdiv = document.querySelector(".userinputdiv")
let heythere = document.querySelector("#heythere")
let input = document.querySelector("#input")
let botdiv = document.querySelector("#botdiv")
let main = document.querySelector(".main")
userinputdiv.style.transition = "transform 1.8s ease"; 

function sendMessage(){
    userinputdiv.style.transform = "translateY(4vh)"
    main.style.height = "70vh"
    heythere.style.display = "none"
    let inputText = input.value
    let usertextdiv = document.createElement("div")
    botdiv.appendChild(usertextdiv)
    usertextdiv.className = "usertext"
    usertextdiv.innerHTML = inputText
    usertextdiv.style.backgroundColor = "#b455fcff"
    usertextdiv.style.padding = "8px"
    usertextdiv.style.borderRadius = "8px "
    usertextdiv.style.color = "white"
    usertextdiv.style.fontSize = "1.1rem"
    usertextdiv.style.display = "inline-block"
    usertextdiv.style.maxWidth = "20vw"
    usertextdiv.style.minWidth = "3vw"
    // usertextdiv.style.height = "4vh"
    usertextdiv.style.marginLeft = "40vw"
    usertextdiv.style.marginTop = "3vh"

    fetch("http://127.0.0.1:8000/chat",{
        method : "POST",
        headers :  { "Content-Type": "application/json" },
        body : JSON.stringify({message:inputText}),
    })
    .then(res => res.json())
    .then((data)=> {
        let botMessage = data.reply
        console.log(botMessage)
        let innerbotdiv = document.createElement("div")
        innerbotdiv.className = "innerbotdiv"
        innerbotdiv.innerHTML = marked.parse(botMessage)
        innerbotdiv.style.color = "white"
        innerbotdiv.style.backgroundColor = "#212121"
        innerbotdiv.style.padding = "3px"
        innerbotdiv.style.fontSize = "1.1rem"
        innerbotdiv.style.borderRadius = "8px"
        innerbotdiv.style.marginRight = "10vw"
        innerbotdiv.style.marginLeft = "10vw"
        innerbotdiv.style.marginTop = "4vh"

        botdiv.appendChild(innerbotdiv)

    })
    .catch(err => console.error("Error:", err));
    console.log({message:inputText})

    input.value = ""
    
}

imgsenddiv.addEventListener("click",sendMessage)

input.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        sendMessage()
    }
})



