const url = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false'

const botaoProximo = document.querySelector('.btn-next')
const botaoAnterior = document.querySelector('.btn-prev')

const input = document.querySelector('.input')

const filmes = document.querySelector('.movies')

let array1 = []
let array2 = []

let inicio = 0
let arrayTeste = ''

async function API() {
    try {
        const Response = await axios.get(url)
        const arrayFilmes = Response.data.results
        return arrayFilmes
    } catch (error) {
        return error
    }
}

async function init() {
    array1 = await API()
    listarFilmes(array1)
}

init()

function listarFilmes(array) {

    filmes.innerHTML = ''

    arrayTeste = array.slice(inicio, inicio + 6)


    for (let item of arrayTeste) {

        const filme = document.createElement('div')
        filme.classList.add('movie')
        filme.style.backgroundImage = `url(${item.poster_path})`
        filmes.appendChild(filme)

        const fimeInfo = document.createElement('div')
        fimeInfo.classList.add('movie__info')
        filme.appendChild(fimeInfo)

        const filmetitulo = document.createElement('span')
        filmetitulo.classList.add('movie__title')
        filmetitulo.textContent = item.title
        fimeInfo.appendChild(filmetitulo)

        const filmeNota = document.createElement('span')
        filmeNota.classList.add('movie__rating')
        filmeNota.textContent = item.vote_average.toFixed(1)
        fimeInfo.appendChild(filmeNota)

        const img = document.createElement('img')
        img.src = './assets/estrela.svg'
        filmeNota.appendChild(img)

        filme.addEventListener('click', () => {
            initModal(item.id)
        })
    }

}


botaoProximo.addEventListener('click', () => {
    if (arrayTeste.length < 6) {
        return
    }
    inicio += 6
    listarFilmes(array1)
})

botaoAnterior.addEventListener('click', () => {
    if (inicio == 0) {
        return
    }
    inicio -= 6
    listarFilmes(array1)
})



async function filtro(filme) {
    try {
        const Response = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${filme}`)
        const resultado = Response.data.results
        return resultado
    } catch (error) {
        return error
    }
}

async function initBusca(busca) {
    array2 = await filtro(busca)
    listarFilmes(array2)
}



input.addEventListener('keypress', (event) => {

    if (event.key !== 'Enter') {
        return
    }

    if (event.target.value == '') {
        listarFilmes(array1)
        return
    }

    initBusca(event.target.value)

    event.target.value = ''
})





const urlFime = 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR'
const urlVideo = 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR'

const videDestaque = document.querySelector('.highlight__video')
const tituloVideo = document.querySelector('.highlight__title')
const raqueVideo = document.querySelector('.highlight__rating')
const generoVideo = document.querySelector('.highlight__genres')
const lançamentoVideo = document.querySelector('.highlight__launch')
const descricaoVideo = document.querySelector('.highlight__description')
const linkTrailer = document.querySelector('.highlight__video-link')

async function APIFilme() {
    try {
        const Response = await axios.get(urlFime)
        const filmeDoDia = Response.data
        return filmeDoDia
    } catch (error) {
        return error
    }
}

function filmeDestaque(data) {

    let genero = ''

    videDestaque.style.backgroundSize = 'cover'
    videDestaque.style.backgroundImage = `url(${data.backdrop_path})`
    tituloVideo.textContent = data.title
    raqueVideo.textContent = data.vote_average.toFixed(1)
    for (let item of data.genres) {
        genero = genero + `${item.name}, `
        generoVideo.textContent = genero
    }
    lançamentoVideo.textContent = new Date(data.release_date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
    descricaoVideo.textContent = data.overview
}

async function trailer() {
    try {
        const Response = await axios.get(urlVideo)
        const trailer = Response.data.results
        return trailer
    } catch (error) {

    }
}

function trailerdestaque(dado) {
    linkTrailer.href = `https://www.youtube.com/watch?v=${dado[0].key}`
}

async function initDestaque() {
    const DestaqueFilme = await APIFilme()
    filmeDestaque(DestaqueFilme)

    const tarilerDestaque = await trailer()
    trailerdestaque(tarilerDestaque)
}

initDestaque()





const modal = document.querySelector('.modal')
const fechaModal = document.querySelector('.modal__close')
const tituloModal = document.querySelector('.modal__title')
const imageModal = document.querySelector('.modal__img ')
const descricaoModal = document.querySelector('.modal__description')
const notaModal = document.querySelector('.modal__average')
const generoModal = document.querySelector('.modal__genres')

let dadosModal = ''

async function APIModal(filme) {
    try {
        const Response = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${filme}?language=pt-BR`)
        console.log(Response.data)
        const Modal = Response.data
        return Modal
    } catch (error) {
        return error
    }
}

async function initModal(id) {
    dadosModal = await APIModal(id)
    modalDados(dadosModal)
}

function modalDados(dados) {

    modal.classList.remove('hidden')

    tituloModal.textContent = dados.title
    imageModal.src = dados.backdrop_path
    descricaoModal.textContent = dados.overview
    notaModal.textContent = dados.vote_average.toFixed(1)

    let html = ''

    for (let item of dados.genres) {
        html +=
            `<span class="modal__genre">${item.name}</span>`

        generoModal.innerHTML = html
    }
}

fechaModal.addEventListener('click', () => {
    modal.classList.add('hidden')
})





const mudaTema = document.querySelector('.btn-theme')
const root = document.querySelector(':root')
const logo = document.querySelector('.logo')

mudaTema.addEventListener('click', (event) => {

    if (event.target.src == 'http://127.0.0.1:5500/assets/dark-mode.svg') {

        logo.src = './assets/logo-dark.png'
        mudaTema.src = './assets/light-mode.svg'
        botaoProximo.src = './assets/arrow-right-dark.svg'
        botaoAnterior.src = './assets/arrow-left-dark.svg'
        fechaModal.src = './assets/close-dark.svg'
        root.style.setProperty('--background', '#FFFFFF')
        root.style.setProperty('--text-color', '#1B2028')
        root.style.setProperty('--bg-secondary', '#ededed')

    } else {

        logo.src = './assets/logo.svg'
        mudaTema.src = './assets/dark-mode.svg'
        botaoAnterior.src = './assets/arrow-left-light.svg'
        botaoProximo.src = './assets/arrow-right-light.svg'
        fechaModal.src = './assets/close.svg'
        root.style.setProperty('--background', '#1B2028')
        root.style.setProperty('--text-color', '#FFFFFF')
        root.style.setProperty('--bg-secondary', '#2D3440')
    }
})