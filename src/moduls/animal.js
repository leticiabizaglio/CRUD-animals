import {v4 as uuidv4} from 'uuid';

export class Animals {
    constructor(nome, idade, tipo, cor, imagem, vacinado ) {
        this.id = uuidv4();
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
        this.cor = cor;
        this.imagem = imagem;
        this.vacinado = vacinado;
    }
}