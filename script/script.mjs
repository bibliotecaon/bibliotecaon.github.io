import {verificaCPF} from './module.mjs'

export class Livro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = true;
    }

    emprestar() {
        this.disponivel = false;
    }

    devolver() {
        this.disponivel = true;
    }
}

export class Cliente {

    #cpf

    constructor(nome, cpf) {
        this.nome = nome;
        this.#cpf = cpf;
        this.livrosEmprestados = [];
    }

    pegarLivro(livro) {
        if (this.livrosEmprestados.length >= 2) {
            return 'Limite de empréstimos atingido!';
        }
        if(livro.disponivel) {
            this.livrosEmprestados.push(livro);
            livro.emprestar();
            return 'Livro Alugado com sucesso!'
        }
        return 'Livro não disponível para empréstimo.';
    }

    devolverLivro(livro) {
        let indice = this.livrosEmprestados.findIndex(item => item.titulo === livro.titulo)
        if(indice != -1) {
            this.livrosEmprestados.splice(indice, 1)
            livro.devolver()
            return 'Livro devolvido com sucesso!'
        }
        return 'Este livro não foi emprestado por você.'
    }

    get_cpf() {
        return this.#cpf
    }

    static async criar(nome, cpf) {
        let cliente = new Cliente(nome, cpf)
        try {
            await verificaCPF(cpf)
            return cliente;
        } catch(error) {
            console.log(error)
            return 'Erro: CPF inválido.';
        }
    }

}

export class Biblioteca {
    constructor() {
        this.livros = [];
        this.usuarios = [];
        this.emprestimos = [];
    }

    adicionarLivro(livro) {
        this.livros.push(livro)
    }
    
    removerLivro(livro) {
        if (!livro.disponivel) {
            return 'Não é possível remover um livro que está emprestado.';
        }
        let indice = this.livros.indexOf(livro)
        if(indice != -1) {
            this.livros.splice(indice, 1)
            return 'Livro deletado com sucesso!'
        }
        return 'O livro que desejas remover não está cadastrado'
    }

    listarLivrosDisponiveis() {
        return this.livros.filter(livro => livro.disponivel)
    }

    registrarUsuario(novo_usuario) {
        if(!this.usuarios.find(usuario => novo_usuario.get_cpf() === usuario.get_cpf())) {
            this.usuarios.push(novo_usuario)
            return 'Usuário registrado com sucesso!'
        }
        return 'Usuário já registrado!'
    }

    emprestarLivro(livro, cliente) {

        if(!livro.disponivel) {
            return 'Este livro já está emprestado'
        }

        if(this.usuarios.find(usuario => usuario.get_cpf() === cliente.get_cpf())) {

            let novoEmprestimo = new Emprestimo(cliente, livro);

            this.emprestimos.push(novoEmprestimo)
            cliente.pegarLivro(livro)
            return 'Livro emprestado com sucesso!'
        } 
        return 'Usuário não cadastrado!'
    }

    fecharEmprestimo(livro, cliente) {
        let emprestimo = this.emprestimos.find(emprestimo => cliente.get_cpf() === emprestimo.cliente.get_cpf() && livro.titulo === emprestimo.livro.titulo);
        let indice = this.emprestimos.indexOf(emprestimo);
        if(indice != -1) {
            this.emprestimos.splice(indice, 1)
            cliente.devolverLivro(livro)
            return 'Emprestimo fechado com sucesso!'
        }
        return 'Emprestimo não encontrado!'
    }
}

export class Emprestimo {
    constructor(cliente, livro) {
        this.cliente = cliente;
        this.livro = livro;
        this.data = new Date().toLocaleString('pt-BR');
    }

    getInfo() {
        return `
        Cliente: ${this.cliente.nome}
        CPF: ${this.cliente.get_cpf()}
        Livro: ${this.livro.titulo}
        Autor: ${this.livro.autor}
        Data: ${this.data}`;
    }
}