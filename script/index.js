import { Biblioteca, Cliente, Livro, Emprestimo } from "./script.mjs";
if(!localStorage.getItem('armazenamento')) {
    localStorage.setItem('armazenamento', JSON.stringify(new Biblioteca([],[],[])))
}

let bibliotecaData = JSON.parse(localStorage.getItem('armazenamento'))
let biblioteca = new Biblioteca(bibliotecaData.livros, bibliotecaData.usuarios, bibliotecaData.emprestimos)

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

/*volta pro menu principal*/
document.getElementById('logo').addEventListener('click', () => {
    location.reload()
})

/*mostrar funcionalidades do cliente*/
function mostraFuncionalidadesCliente() {
    document.getElementById('infoClientes').style.display = 'flex';
    document.getElementById('registrarCliente').style.display = 'flex';
    document.getElementById('mob').style.display = 'none';

    document.getElementById('realizar-emprestimo').style.display = 'none';
    document.getElementById('lista-emprestimos').style.display = 'none';
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

    document.getElementById('realizar-emprestimo').style.display = 'none';
    document.getElementById('lista-emprestimos').style.display = 'none';
    document.getElementById('infoClientes').style.display = 'none';
    document.getElementById('registrarCliente').style.display = 'none';
}
const botoesLivro = document.querySelectorAll('.botao-livro')
botoesLivro.forEach(botao => {
    botao.addEventListener('click', mostraFuncionalidadesLivro)
})

/*mostrar funcionalidades do emprestimo*/
function mostraFuncionalidadesEmprestimo() {
    document.getElementById('realizar-emprestimo').style.display = 'block';
    document.getElementById('lista-emprestimos').style.display = 'block';
    document.getElementById('mob').style.display = 'none';

    document.getElementById('infoClientes').style.display = 'none';
    document.getElementById('registrarCliente').style.display = 'none';
    document.getElementById('delete-book-div').style.display = 'none';
    document.getElementById('lista-livros').style.display = 'none';
    document.getElementById('cadastro-livro').style.display = 'none';
}

const botoesEmprestimo = document.querySelectorAll('.botao-emprestimo')
botoesEmprestimo.forEach(emprestimo => {
    emprestimo.addEventListener('click', mostraFuncionalidadesEmprestimo)
})

/*funcionalidade de mostrar os livros cadastrados*/

function adicionarLivro(titulo, autor, disponivel) {

    let containerLivros = document.getElementById('container-livros');

    const novoLivro = document.createElement('div');
    novoLivro.classList.add('livro');
    if(disponivel) {
        novoLivro.innerHTML = `
        <p class="dado-livro"><strong>Título:</strong> <span>${titulo}</span></p>
        <p class="dado-livro"><strong>Autor:</strong> <span>${autor}</span></p>
        <p class="dado-livro"><strong>Disponível:</strong> <span style="color:green">Sim</span></p>
    ` 
    } else {
        novoLivro.innerHTML = `
        <p class="dado-livro"><strong>Título:</strong> <span>${titulo}</span></p>
        <p class="dado-livro"><strong>Autor:</strong> <span>${autor}</span></p>
        <p class="dado-livro"><strong>Autor:</strong> <span style="color:red">Não</span></p>
    `;
    }
    containerLivros.appendChild(novoLivro);
}
biblioteca.livros.forEach(livro => {
    adicionarLivro(livro.titulo, livro.autor, livro.disponivel);
});
if(biblioteca.livros.length === 0) {
    document.getElementById('container-livros').innerHTML = '<p c >Nenhum livro Cadastrado</p>';
}

/*funcionalidades dos emprestimos*/
// Array para armazenar os empréstimos
const emprestimos = [
    { cliente: "João Silva", livro: "O Pequeno Príncipe" },
    { cliente: "Maria Oliveira", livro: "A Revolução dos Bichos" },
    { cliente: "Pedro Santos", livro: "Dom Quixote" }
];

// Função para adicionar um empréstimo
function adicionarEmprestimo(cliente, livro) {
    if (cliente && livro) {
        const novoEmprestimo = { cliente, livro };
        emprestimos.push(novoEmprestimo);
        atualizarListaEmprestimos();
    } else {
        alert("Por favor, preencha os campos de cliente e livro.");
    }
}

// Função para atualizar a lista de empréstimos na interface
function atualizarListaEmprestimos() {
    const container = document.getElementById('container-emprestimos');

    // Limpa o conteúdo atual
    container.innerHTML = '';

    // Adiciona cada empréstimo
    emprestimos.forEach((emprestimo, index) => {
        const divEmprestimo = document.createElement('div');
        divEmprestimo.classList.add('emprestimo-item');

        const clienteP = document.createElement('p');
        clienteP.textContent = `Cliente: ${emprestimo.cliente}`;
        divEmprestimo.appendChild(clienteP);

        const livroP = document.createElement('p');
        livroP.textContent = `Livro: ${emprestimo.livro}`;
        divEmprestimo.appendChild(livroP);

        const finalizarBtn = document.createElement('button');
        finalizarBtn.textContent = 'Finalizar Empréstimo';
        finalizarBtn.classList.add('btn-finalizar');
        finalizarBtn.onclick = () => finalizarEmprestimo(index);
        divEmprestimo.appendChild(finalizarBtn);

        container.appendChild(divEmprestimo);
    });
}

// Função para finalizar um empréstimo
function finalizarEmprestimo(index) {
    emprestimos.splice(index, 1); // Remove o empréstimo do array
    atualizarListaEmprestimos(); // Atualiza a interface
}

// Lógica para capturar o clique do botão de adicionar empréstimo
document.addEventListener('DOMContentLoaded', () => {
    // Preenche a lista com os empréstimos iniciais
    atualizarListaEmprestimos();

    document.querySelector('#realizar-emprestimo input[type="button"]').addEventListener('click', () => {
        const cliente = document.getElementById('clienteEmprestimo').value;
        const livro = document.getElementById('livroEmprestimo').value;

        adicionarEmprestimo(cliente, livro);

        // Limpa os campos após adicionar
        document.getElementById('clienteEmprestimo').value = '';
        document.getElementById('livroEmprestimo').value = '';
    });
});

/*-------------------------------------------------------------*
/*INICIO DAS FUNCIONALIDADES LIVRO*/

/*CADASTRAR LIVRO*/
function CadastrarLivro() {

    try {
        let titulo = document.getElementById('titulo').value
        let autor = document.getElementById('autor').value

        if(!titulo || !autor) {
            throw new Error('Campos Obrigatórios!')
        }

        let livro = new Livro(titulo, autor)

        /*verifica se o livro já está cadastrado*/
        biblioteca.livros.forEach((book) => {
            if(book.titulo === livro.titulo) {
                throw new Error('Livro já cadastrado!')
            }
        })

        biblioteca.adicionarLivro(livro)

        localStorage.setItem('armazenamento', JSON.stringify(biblioteca))

        document.getElementById('respostaCadastroLivro').style.display = 'block';
        document.getElementById('respostaCadastroLivro').innerHTML = 'Livro Adicionado!';
        document.getElementById('respostaCadastroLivro').style.color = 'green';
        
        /*atualizar a lista de livros*/
        document.getElementById('container-livros').innerHTML = '';
        biblioteca.livros.forEach(livro => {
            adicionarLivro(livro.titulo, livro.autor, livro.disponivel);
        })

    } catch (error) {
        document.getElementById('respostaCadastroLivro').style.display = 'block'
        document.getElementById('respostaCadastroLivro').innerHTML = error;
        document.getElementById('respostaCadastroLivro').style.color = 'red';
    }
}
document.getElementById('botaoCadastroLivro').addEventListener('click', () => {
    CadastrarLivro()
})

/*DELETAR LIVRO*/
function deletarLivro() {
    try {
        let tituloLivroDeletar = document.getElementById('bookName').value
        if(!tituloLivroDeletar) {
            throw new Error('Preencha corretamente')
        }

        if(!biblioteca.livros.find(livro => livro.titulo === tituloLivroDeletar)) {
            throw new Error('Livro não encontrado')
        }

        biblioteca.livros.forEach((livro) => {
            if(livro.titulo === tituloLivroDeletar) {
                biblioteca.removerLivro(livro)
                localStorage.setItem('armazenamento', JSON.stringify(biblioteca))

                document.getElementById('respostaDeletarLivro').style.display = 'block'
                document.getElementById('respostaDeletarLivro').innerHTML = 'Livro Deletado com sucesso!';
                document.getElementById('respostaDeletarLivro').style.color = 'green';
            }
        })

        /*atualizar a lista de livros*/
        document.getElementById('container-livros').innerHTML = '';
        biblioteca.livros.forEach(livro => {
            adicionarLivro(livro.titulo, livro.autor, livro.disponivel);
        })

    }  catch(error) {
        document.getElementById('respostaDeletarLivro').style.display = 'block'
        document.getElementById('respostaDeletarLivro').innerHTML = error;
        document.getElementById('respostaDeletarLivro').style.color = 'red';
    }
}
document.getElementById('botaoDeletarLivro').addEventListener('click', deletarLivro)
/*FIM das funcionalidades livro*/

/*INICIO das funcionalidades Cliente*/

async function cadastrarCliente() {
    try {
        let nome = document.getElementById('nomeCliente').value
        let cpf = document.getElementById('cpfCliente').value

        if(!nome || !cpf) {
            throw new Error('Campos Obrigatórios!')
        }

        let usuario = await Cliente.criar(nome, cpf)
        biblioteca.registrarUsuario(usuario)

        localStorage.setItem('armazenamento', JSON.stringify(biblioteca))

        document.getElementById('respostaCadastroCliente').style.display = 'block'
        document.getElementById('respostaCadastroCliente').innerHTML = 'Cadastrado com sucesso!';
        document.getElementById('respostaCadastroCliente').style.color = 'green';

    } catch(error) {
        document.getElementById('respostaCadastroCliente').style.display = 'block'
        document.getElementById('respostaCadastroCliente').innerHTML = error;
        document.getElementById('respostaCadastroCliente').style.color = 'red';
    }

}
document.getElementById('botaoRegistroCliente').addEventListener('click', cadastrarCliente)

/*FUNCIONALIDADE de popular tabela clientes*/

  // Referência ao corpo da tabela
const tbody = document.querySelector('#tabelaClientes tbody');

// Percorre o array e cria as linhas da tabela
biblioteca.usuarios.forEach(cliente => {

    const tr = document.createElement('tr'); // Cria uma nova linha

    // Cria as células para cada propriedade do cliente
    const tdNome = document.createElement('td');
    tdNome.textContent = cliente.nome;

    const tdCpf = document.createElement('td');
    tdCpf.textContent = cliente.cpf;

    const tdLivros = document.createElement('td');

    tdLivros.textContent = tdLivros.textContent ? cliente.livrosEmprestados : '-'

    // Adiciona as células à linha
    tr.appendChild(tdNome);
    tr.appendChild(tdCpf);
    tr.appendChild(tdLivros);

    // Adiciona a linha ao tbody
    tbody.appendChild(tr);
});

/*Funcionalidade Filtrar Cliente*/

document.getElementById('botaoFiltrarCliente').addEventListener('click', () => {
    let cpfFiltrar = document.getElementById('cpfClienteFiltrar').value

    const tbody = document.querySelector('#tabelaClientes tbody');
    tbody.innerHTML = '';

    let usuarioEncontrado = biblioteca.usuarios.find(usuario => usuario.cpf == cpfFiltrar)

    if(usuarioEncontrado) {
        document.getElementById('respostaFiltrarCliente').style.display = 'none';
        const tr = document.createElement('tr'); // Cria uma nova linha
        // Cria as células para cada propriedade do cliente
        const tdNome = document.createElement('td');
        tdNome.textContent = usuarioEncontrado.nome;
        const tdCpf = document.createElement('td');
        tdCpf.textContent = usuarioEncontrado.cpf;
        const tdLivros = document.createElement('td');
        tdLivros.textContent = tdLivros.textContent ? usuarioEncontrado.livrosEmprestados : '-'
        // Adiciona as células à linha
        tr.appendChild(tdNome);
        tr.appendChild(tdCpf);
        tr.appendChild(tdLivros);
        // Adiciona a linha ao tbody
        tbody.appendChild(tr);
        return
    }
    document.getElementById('respostaFiltrarCliente').style.display = 'block';
    document.getElementById('respostaFiltrarCliente').style.color = 'red';
    document.getElementById('respostaFiltrarCliente').innerHTML = 'Usuário não encontrado!';
})

/*FIM das funcionalidades Cliente*/