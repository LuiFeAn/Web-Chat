const socket = io();

const All = (element)=>document.querySelectorAll(element);
const Only = (element)=>document.querySelector(element);

const usersArea = Only("header");

const client = Only("#chat-input-section input");
const submit = Only("#chat-input-section button");
const inputComp = Only("#chat-input-section");

const chatComp = Only("#chat-section");
const msgArea = Only("#msg-area");

const msgSendArea = Only("#msg-send-area");
const type = Only("#msg-send-area input");
const submitMsg = Only("#msg-send-area button");

const clients = Only("#users");

const App = () =>{
    const Events = ()=>{
        submit.onclick = ()=>{
           if(client.value != ""){
            usersArea.style.display = "block";
            inputComp.classList.add("hidden-class");
            chatComp.classList.add("look-class");

            socket.emit('join-request',client.value)
            
            SystemMsg("system",client.value);
           }
        }

        submitMsg.onclick = ()=>{
            if(type.value != ""){
                socket.emit("send-msg",type.value);
                type.value = "";
            }
        }
    }
    const SystemMsg = (type,user,msg)=>{
        let p = document.createElement("p");
        msgArea.appendChild(p);
        p.classList.add("msg-chat");
        switch(type){
            case "system":
                p.innerHTML = `Sistema: O usuário ''${user}'' acaba de entrar na conversa`;
            break;
            case "msg":
                p.innerHTML = `${user}: ${msg}`;
            break;
        }
    } 
    const Render = (data)=>{
        clients.innerText = `Membros: ${data}`
    }
    const socketF = ()=>{

        socket.on('login-user',(users)=>{
            Render(users);
        })

        socket.on('list-update',(data)=>{
            Render(data.list);
            SystemMsg("system",data.joined);
        })

        socket.on("show-msg",(data)=>{
            SystemMsg("msg",data.user,data.msg);
        })
    }
    Events();
    socketF();
}
App();