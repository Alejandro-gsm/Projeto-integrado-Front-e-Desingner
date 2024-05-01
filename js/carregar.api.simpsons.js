/******************************************************************************
 * Objetivo: Criar CARDS de forma dinâmica no HTML, tendo como base um 
 *              ForEach de personagens dos Simpsons forneciso por uma API.
 * Data: 30/05/2024
 * Autor: Alejandro e Lucas
 * Versão: 1.8
 *****************************************************************************/

//função para receber os dados da API.
const getDadosAPI = async function(){
    let url = `https://apisimpsons.fly.dev/api/personajes?limit=680&page=1` 

    //Realizar a requisição na API.
    const response = await fetch(url)

    //Converte a resposta da API para o formato json, e salva na variavel dados e objDados.
    const dados = await response.json()
    const objDados = dados.docs
    return objDados

}
    // Função para criar os cards de forma automática.
    const criarCards = function (dadosAPI){

        //Recebe a div container, com o espaço separados para os cards do HTML (Principal)
        let divContainer = document.getElementById('container')

        // Cria a repetição para criar os cards enquanto ele percorrer o json.
        dadosAPI.forEach(function(card){

            // Mostra os dados percorridos no console.
            console.log(card)

            // Cria os elementos HTML.
            let img          = document.createElement('img')
            let divcard      = document.createElement('div')
            let h2nome       = document.createElement('h2') 
            let textnome     = document.createElement("p")
            let textgenero   = document.createElement("p")
            let textocupacao   = document.createElement("p")

            // Adciona os atributos nos elementos HTML.
            img.setAttribute('src', card.Imagen)
            divcard.setAttribute('class', 'card')

            // Adiciona os valores do json aos elementos.
            h2nome.textContent = card.Nombre
            textgenero.textContent = "Genero:" + card.Genero
            textocupacao.textContent = "Ocupação:" + card.Ocupacion

            // Faz a identação dos elementos HTML.
            divContainer.appendChild(divcard)
            divcard.appendChild(img)
            divcard.appendChild(h2nome)
            h2nome.appendChild(textnome)
            divcard.appendChild(textgenero)
            divcard.appendChild(textocupacao)

        })
    }

// Função que chama ao carregar a página a função criar card, após receber os dados da API.
window.addEventListener('load', async function(){
    const dadosAPI = await getDadosAPI()
    criarCards(dadosAPI)
})

