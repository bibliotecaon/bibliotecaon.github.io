let buttonHamburguer = document.getElementById('button-hamburguer')

buttonHamburguer.addEventListener('click', function() {
    buttonHamburguer.classList.toggle('clicado')

    document.querySelector('nav#mob').classList.toggle('aparecido')

})

function mostraFuncionalidadesCliente() {
    document.getElementById('infoClientes').style.display = 'flex';
    document.getElementById('registrarCliente').style.display = 'flex';
}

const botoesCliente = document.querySelectorAll('.botao-cliente')

botoesCliente.forEach(botao => {
    botao.addEventListener('click', mostraFuncionalidadesCliente)
})