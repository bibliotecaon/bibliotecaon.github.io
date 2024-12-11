/*botao hamburguer*/
let buttonHamburguer = document.getElementById('button-hamburguer')
buttonHamburguer.addEventListener('click', function() {
    let navMobile = document.querySelector('nav#mob')
    buttonHamburguer.classList.toggle('clicado')
    if(buttonHamburguer.classList.contains('clicado')) {
        navMobile.style.display = 'flex';
        return
    }
    navMobile.style.display = 'none';
})

/*mostrar funcionalidades do cliente*/
function mostraFuncionalidadesCliente() {
    document.getElementById('infoClientes').style.display = 'flex';
    document.getElementById('registrarCliente').style.display = 'flex';
    document.getElementById('mob').style.display = 'none';

    document.getElementById('delete-book-div').style.display = 'none';
    document.getElementById('lista-livros').style.display = 'none';
    document.getElementById('cadastro-livro').style.display = 'none';
}
const botoesCliente = document.querySelectorAll('.botao-cliente')
botoesCliente.forEach(botao => {
    botao.addEventListener('click', mostraFuncionalidadesCliente)
})

/*mostrar funcionalidades do livro*/
function mostraFuncionalidadesLivro() {
    document.getElementById('delete-book-div').style.display = 'block';
    document.getElementById('lista-livros').style.display = 'block';
    document.getElementById('cadastro-livro').style.display = 'block';
    document.getElementById('mob').style.display = 'none';

    document.getElementById('infoClientes').style.display = 'none';
    document.getElementById('registrarCliente').style.display = 'none';
}
const botoesLivro = document.querySelectorAll('.botao-livro')
botoesLivro.forEach(botao => {
    botao.addEventListener('click', mostraFuncionalidadesLivro)
})


/*funcionalidade de mostrar os livros cadastrados*/
const containerLivros = document.getElementById('container-livros');

const livrosExistentes = [
    { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', disponivel: 'sim' },
    { titulo: '1984', autor: 'George Orwell', disponivel: 'nao' },
    { titulo: 'Dom Casmurro', autor: 'Machado de Assis', disponivel: 'sim' }
];

function adicionarLivro(titulo, autor, disponivel) {
    const novoLivro = document.createElement('div');
    novoLivro.classList.add('livro');
    novoLivro.innerHTML = `
        <strong>Título:</strong> ${titulo}<br>
        <strong>Autor:</strong> ${autor}<br>
        <strong>Disponível:</strong> ${disponivel}
    `;
    containerLivros.appendChild(novoLivro);
}

window.addEventListener('DOMContentLoaded', () => {
    livrosExistentes.forEach(livro => {
        adicionarLivro(livro.titulo, livro.autor, livro.disponivel);
    });
});