let nome = prompt("Qual é o seu nome?");
let element5 = [];
let string = [];
let array = [];




function pegarDados() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(dadosChegaram);
}
pegarDados();

function dadosChegaram(response) {
    renderizarContato(response.data);
    console.log(response.data);
}
function renderizarContato(contatos) {
    let elemento = document.querySelector('.mensagens');
    elemento.scrollIntoView();



    for (let i = 0; i < contatos.length; i++) {
        if (contatos[i].type === 'status') {
            elemento.innerHTML += `
            <div class="cinza">
            <p> <span style="color:#AAAAAA">${contatos[i].time}</span> <span style="font-weight:bold">${contatos[i].from}</span>${contatos[i].text}</p>
            </div>
            `
        } else if (contatos[i].type === 'message') {
            elemento.innerHTML += `
            <div class="branco">
                <p> <span style="color:#AAAAAA">${contatos[i].time}</span> <span style="font-weight:bold">${contatos[i].from}</span> para <span
                    style="font-weight:bold">${contatos[i].to}</span>${contatos[i].text}</p>
            </div>`
        } else if (contatos[i].type === 'private_message') {
            elemento.innerHTML +=
                `<div class="rosa">
                <p> <span style="color:#AAAAAA">${contatos[i].time}</span> <span style="font-weight:bold">${contatos[i].from}</span> reservadamente para
                <span style="font-weight:bold">${contatos[i].to}</span>${contatos[i].text}</p>
            </div>`
        }


    }
}

function entrarSala() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {
        name: nome
    });

    promise.then(quandoSucesso);
    promise.catch(quandoErro);
}
function quandoSucesso(response) {
    console.log(response);
}
function quandoErro(err) {
    console.log(err);
}
entrarSala();

function manterConexao() {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: nome,
    })
    promessa.then(conexaoMantida);
    promessa.catch(erroConexao);
}
function conexaoMantida(response) {
    console.log(response);
}
function erroConexao(erro) {
    console.log(erro);
}



function enviarMensagem() {
    const enviar = document.querySelector('.rodape input');
    let result = [];
    let string1 = string.toString();

    if(array === "publico"){
        result.push("message")
    } else {
        result.push("private_message")
    }
    let result1 = result.toString();

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {
        from: nome,
        to: string1,
        text: enviar.value,
        type: result1,
    });
    promessa.then(comSucesso);
    promessa.catch(comErro);




};


function comSucesso(resposta) {
    console.log(resposta);
}
function comErro(erro) {
    console.log(erro);
}

function buscarParticipantes() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(dadosEncontrados);
    
}
function dadosEncontrados(response) {
    console.log(response.data);
    mostrarMenu(response.data)
}

// function mostrar(){
//     let clicado = document.querySelectorAll('.menuativo div');
//     for(let j = 0; j < clicado.length; j++){
//     element1.push(clicado[j].children[0].innerHTML)
//         };
// }

function mostrarMenu(participantes) {
    let menu = document.querySelector('.menuativo');

  

    menu.innerHTML = '';

    menu.innerHTML += 
    `<p class="titulo">Escolha um contato para enviar mensagem</p>
    <div class="todos" onclick="mostrar(this)" >
        <p>Todos</p>
        <img src="users.jpg" />
    </div>`

    for (let j = 0; j < participantes.length; j++) {
        menu.innerHTML += `
            <div class="participants" onclick="mostrar(this)">
                <p>${participantes[j].name}</p>
                <img src="pessoa.jpg" />
            </div>
        
        `
    }
    menu.innerHTML += 
    `<p class="titulo">Escolha a visibilidade</p>
    <section class="publico" onclick="exibir(this)">
        <img src="cadeado.jpg" />
        <p>Público</p>
    </section>
    <section class="reservado" onclick="exibir(this)">
        <img src="cadeado.jpg" />
        <p>Reservadamente</p>
    </section>

    `
    let cont = document.querySelector('.container');
    let cbl = document.querySelector('.cabecalho');
    let rdp = document.querySelector('.rodape');
    menu.classList.add('ajustado');
    cont.classList.add('sombra');
    cbl.classList.add('sombra');
    rdp.classList.add('sombra');

   
    

}



function retirarMenu() {
    let menu = document.querySelector('.menuativo');
    let cont = document.querySelector('.container');
    let cbl = document.querySelector('.cabecalho');
    let rdp = document.querySelector('.rodape');
    let menu1 = document.querySelector('.menuativo').classList.contains('ajustado');
    if (menu1 === true) {
        menu.classList.remove('ajustado');
        cont.classList.remove('sombra');
        cbl.classList.remove('sombra');
        rdp.classList.remove('sombra');
    }


}
let sim = [];
let array1 = [];
 
// let el = array1[0].children[2];
// console.log(el);    


function mostrar(e){
    console.log(e.children[0].innerHTML);
    string.push(e.children[0].innerHTML);

    e.innerHTML += `
        <img src="nike.jpg" class="ok"/>
    `
    const enviando = document.querySelector('.entrada');
    enviando.innerHTML += `
    <p>Enviando para ${string}</p>`  
}



function exibir(f){
    console.log(f.children[1].innerHTML);
    array.push(f.children[1].innerHTML);
}

 // e.innerHTML += `
    // <img src="nike.jpg" />
    // `
    // let ola= document.querySelector('.rodape');
    // ola.innerHTML += `
    // <p>Enviando para ${string[0]}</p>    
    // `
    
    
    
//     console.log(string);
// }
// var no = document.getElementById("interno");
// if (no.parentNode) {
//   no.parentNode.removeChild(no);
// }


// var botaoAdicionar = document.querySelector("#adicionar-paciente");
// botaoAdicionar.addEventListener("click", function(){
//     console.log("Fui clicado");
// });



// let element4 = menu.querySelectorAll('div');
// for(let j = 0; j < element4.length; j++){
//     element5.push(element4[j].children[0].innerHTML);
// };
// console.log(element5);

// function mostrarOpcao(element){
//     let clicado = element.children[0].innerHTML; 
//     clicado.addEventListener('click', enviarMensagem)
// }






// function mostrar(){
//     for(let k = 0; k < element5.length; k++){
//         console.log(element5[k]);
//     }
// }




// function mostrar(){
//     let element4 = document.querySelectorAll('.menuativo div');
//     for(let j = 0; j < element4.length; j++){
//     element5.push(element4[j].children[0].innerHTML);
//     console.log(element5);

//     };
// }


