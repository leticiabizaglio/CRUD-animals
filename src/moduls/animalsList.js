export class animalsList {
    constructor() {
        this.animals = [];
    }

    getAllAnimals() {
        return this.animals
    }

    getAnimalsById(id){
        return this.animals.find(animal => animal.id === id)
    }

    createAnimal(animal){
        this.animals.push(animal)
    }

    updateAnimal(id, nome, idade, tipo, cor, imagem, vacinado){
        const animal = this.getAnimalsById(id);

        if(!animal){
            return null;
        }

        animal.nome = nome;
        animal.idade = idade;
        animal.tipo = tipo;
        animal.cor = cor;
        animal.imagem = imagem;
        animal.vacinado = vacinado;

        return animal;
        
    }

    removeAnimal(animalId){
        this.animals = this.animals.filter(animal => animal.id !== animalId)
    }

}