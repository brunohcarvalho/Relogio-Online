// Variáveis

const barraMenu = document.querySelector('.menu__exibir')
const menu = document.querySelector('aside')
const barraUm = document.getElementById('barra__menu__um')
const barraDois = document.getElementById('barra__menu__dois')
const barraTres = document.getElementById('barra__menu__tres')
const chave = '3a874e1d32d30a339c28e68892907ff0'
const fundo = document.querySelector('body')
const relogio = document.querySelector('h1')
const exibirData = document.querySelector('.exibir__data')
const exibirCitacao = document.querySelector('.exibir__citacao')
const exibirLocal = document.getElementById('local')
const exibirTemperatura = document.getElementById ('temperatura')
const imagem = document.querySelector('.icone')
const climaDescricao = document.getElementById('clima')

let horas
const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]
const semana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]
const frase = [
    'O poder da imaginação faz-nos infinitos.',
    'O ponto de partida de qualquer realização é o desejo.',
    'Tente sempre ser melhor do que a pessoa que você foi ontem.',
    'O aprendizado é um presente. Inclusive quando a dor é o seu professor.',
    'Até mesmo a noite mais escura terminará com o nascer do Sol.',
    'Lembre-se de que às vezes não conseguir o que deseja é um maravilhoso golpe de sorte.',
    'O amor é uma pura poesia composta por versos escritos em beijos.'
]
const imagens = [
    'https://images2.imgbox.com/d9/e9/5VtmIIbd_o.jpg',
    'https://images2.imgbox.com/c0/7d/1PZ6uyXE_o.jpg',
    'https://images2.imgbox.com/3c/96/mzp12iwf_o.jpg',
    'https://images2.imgbox.com/ad/64/dIRij3by_o.jpg',
    'https://images2.imgbox.com/c1/5a/sZrfFNHu_o.jpg',
    'https://images2.imgbox.com/f1/76/VteRwZKA_o.jpg',
    'https://images2.imgbox.com/3c/a3/GwbSmF9p_o.jpg',
    'https://images2.imgbox.com/f8/e9/ry4DLL4w_o.jpg'
]

// Funções

function atualizarTempo(){
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const diaSemana = data.getDay()
    const mes = data.getMonth()
    const ano = data.getFullYear()
    horas = String(data.getHours()).padStart(2, '0')
    const minutos = String(data.getMinutes()).padStart(2, '0')
    const segundos = String(data.getSeconds()).padStart(2, '0')
    relogio.innerHTML = `${horas}:${minutos}:${segundos}`
    exibirData.innerHTML = `${semana[diaSemana]}, ${dia} de ${meses[mes]} de ${ano}`    
    exibirCitacao.innerHTML = frase[diaSemana] 

    return horas
}
setInterval(atualizarTempo,1000)
atualizarTempo()

function atualizarFundo(){
    let n
    if(horas >=21){
        n=5
    } else if(horas >=18){
        n=4
    } else if(horas >=15){
        n=3
    } else if(horas >=12){
        n=2
    } else if(horas >=9){
        n=1
    } else if(horas >=6){
        n=0
    } else if(horas >=3){
        n=7
    } else if(horas>=0){
        n=6
    }
    fundo.style.backgroundImage = `url(${imagens[n]})`
}
setInterval(atualizarFundo,1000)
atualizarFundo()

function mostrarClima(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async function (position){
            const lat = position.coords.latitude
            const lon = position.coords.longitude    
            
            const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&lang=pt_br&units=metric`).then(res => res.json())
            
            exibirLocal.innerHTML = `${dados.name} `
            exibirTemperatura.innerHTML = `${Math.floor(dados.main.temp)}°`
            imagem.setAttribute('src', `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`)
            climaDescricao.innerHTML = `${dados.weather[0].description}`
        })
    } 
}
setInterval(mostrarClima,1800000)
mostrarClima()


barraMenu.addEventListener('click', () => {
    menu.style.display = 'block'
})

document.querySelector('svg').addEventListener('click', ()=>{
    menu.style.display = 'none'
} )

