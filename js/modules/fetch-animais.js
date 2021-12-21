import AnimaNumeros from './anima-numeros.js'

export default function fetchAnimais(url, target) {
  //Cria a div contendo informações
  //com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div')
    div.classList.add('numero-animal')
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`
    return div
  }
  //Preenche cada animal no DOM
  const numerosGrid = document.querySelector(target)
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal)
    numerosGrid.appendChild(divAnimal)
  }
  //Anima os numeros de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo')
    animaNumeros.init()
  }
  //Puxa os animais atraves de um arquivo json
  //e Cria cada animal usando o create animal
  async function criarAnimais() {
    try {
      //Fetch: espera a resposta e transforma em json
      const animaisResponse = await fetch(url)
      const animaisJSON = await animaisResponse.json()
      //Após a transformação de json, ativa as funcões para
      //preencher e animar os numeros
      animaisJSON.forEach(animal => preencherAnimais(animal))
      animaAnimaisNumeros()
    } catch (erro) {
      console.log(erro)
    }
  }
  return criarAnimais()

  fetchAnimais('./animaisapi.json')
}
