/**************************************************************************************************
 * Objetivo: Fazer uma busca nos dados do json, apartir do texto de um nome de personagem inserido 
 *                  pelo usuário, caso retorne como verdadeiro ele cria o card do personagem, 
 *                      e apaga os restantes.
 * Data: 30/05/2024
 * Autor: Alejandro e Lucas
 * Versão: 1.8
 **************************************************************************************************/

// Cria as variaveis para receber os dados da barra de pesquisa do HTML, e do click no botão pesquisar.
const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')

//Recebe a div container, com o espaço separados para os cards do HTML (Principal)
const divContainer = document.getElementById('container')

//função para receber os dados da API.
const getDadosAPI = async function () {
    let url = `https://apisimpsons.fly.dev/api/personajes?limit=680&page=1`

    //Realizar a requisição na API.
    const response = await fetch(url)

    //Converte a resposta da API para o formato json, e salva na variavel dados e objDados.
    const dados = await response.json()
    const objDados = dados.docs
    return objDados

}

// Função que verifica se os dados inseridos na barra de pesquisa existe no json, caso haja ele dá como verdadeiro para a criação ds cards.
const searchCard = async (dados) => {
    const dadosSearch = [];

    dados.forEach(async function (card) {

        if (card.Nombre.includes(searchInput.value)) {

            const dadosCard = card
            dadosSearch.push(dadosCard)

        }

        criarCards(dadosSearch)

    })

}

// Função para criar os cards de forma automática.
const criarCards = function (dadosAPI) {

    // Repetição para deixar apenas os card com dados verdadeiros, e remover os restantes.
    while (divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
    }

    // Cria a repetição para criar os cards enquanto ele percorrer o json.
    dadosAPI.forEach(function (card) {

        // Cria os elementos HTML.
        let img = document.createElement('img')
        let divcard = document.createElement('div')
        let h2nome = document.createElement('h2')
        let textnome = document.createElement("p")
        let textgenero = document.createElement("p")
        let textocupacao = document.createElement("p")

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

// Função que chama ao click a função de pesquisa no json, após o recebimento dos dados da API.
searchButton.addEventListener('click', async () => {
    const dados = await getDadosAPI()
    searchCard(dados)
})

