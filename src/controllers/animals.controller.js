import { Animals } from "../moduls/animal.js";
import { animalsList } from "../moduls/animalsList.js";

const instancia = new animalsList();

export const buscarTodosAnimais = (req, res) => {
    
    const animals = instancia.getAllAnimals();

    const {tipo} = req.query;
    
    if(tipo){
        const filter = animals.filter((animal) => animal.tipo == tipo);
        if(!filter.length){
            return res.status(404).send({message: "Não há animais cadastrados com esse tipo!", origem:"Not Found!"});
        }
        filter.forEach((animal) => {
            if(animal.vacinado == true){
                animal.vacinado = "Sim";
            }
            else{
                animal.vacinado = "Não";
            }
        });
        return res.status(200).send({message: `Número de animais cadstrados por esse tipo é ${filter.length}`, origem:"Controller!", data: filter });
    }
    if(!animals.length ){
        return res.status(404).send({message: "Não há animais cadastrados!", origem:"Not Found!"});
    }
    return res.status(200).send({message: `Numero de animais cadastrados é ${animals.length}`, origem:"Controller!", data: animals });

    //  const {tipoanimal} = req.query;

    // if(tipoanimal){
    //      const filterAnimals = animals.filter((animal) => animal.tipoanimal === tipoanimal);
    //      if(!filterAnimals.length){
    //          return res.status(404).send({message: "Não há animais cadastrados com esse tipo!", origem:"Not Found!"});
    //      }
    //      return res.status(200).send({message: `Numero de animais cadastrados por esse tipo é ${filterAnimals.length}`, contador: `${animals.length}` });
    //  }

    // const animalzinhos = instancia.getAllAnimals();
    
    // const contadorPorTipo = {};
    // animalzinhos.forEach((animal) => {
    //     if (!contadorPorTipo[animal.tipo]) {
    //         contadorPorTipo[animal.tipo] = 1;
    //     } else {
    //         contadorPorTipo[animal.tipo]++;
    //     }
    // });
    return res.status(200).send({message: "Todos animais via controller!", status: "Ok!", data: animals, contadorPorTipo: contadorPorTipo, contadorTotal: animals.length 
    });

    // if(!animals.length){
    //     return res.status(404).json({message: "Animal não cadastrado!", origem:"Not Found!"});
    // }


    // return res.status(200).send({ message: "Todos animais via controller!", status:"Ok!", data: animals, contador: `${animals.length}` });
};

export const buscarAnimalPorId = (req, res) => {

    const { id } = req.params;

    const animal = instancia.getAnimalsById(id);

    if(!animal){
        return res.status(400).send({message: "Animal não encontrado!", origem:"Controller!"});
    }

    return res.status(200).send({message: `Animal com ID ${id}!`, origem:"Controller!", data: animal});

}

export const criarAnimal = (req, res) => {

 const isURLValid = (url) => {
        if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
            return true;
        } else {
            return false;
        }
    }


    const { nome, idade, tipo, cor, imagem, vacinado } = req.body;

    if(!nome || !idade || !tipo || !cor || !imagem ){
        return res.status(400).send({message: "Dados inválidos!", origem:"Controller!"});
    } 
    if(nome.length <= 3 || nome.length >= 50){
        return res.status(400).send({message: "Nome inválido! O nome deve conter no mínimo 3 caracteres e no máximo 50!", origem:"Controller!"});
    } 
    if(!Number.isInteger(Number(idade)) || idade < 0){
        return res.status(400).send({message: "Idade inválida! A idade deve ser maior que 0", origem:"Controller!"});
    }
    if(tipo.length >=  30){
        return res.status(400).send({message: "Tipo inválido! O tipo deve conterno máximo 30 caracteres!", origem:"Controller!"});
    } 
    if(cor.length >= 20){
        return res.status(400).send({message: "Cor inválida! A cor deve conter no máximo 20 caracteres!", origem:"Controller!"});
    } 
    if(typeof vacinado != 'boolean'){
        return res.status(400).send({message: "Vacinado inválido! O valor deve ser verdadeiro ou falso!", origem:"Controller!"});
    }
    if(isURLValid(imagem) === false) {
        return res.status(400).send({ message: "URL da imagem é inválida!", origem:"Controller!" });
    }

    const animal = new Animals (nome, idade, tipo, cor, imagem, vacinado);
    instancia.createAnimal(animal);

    return res.status(201).send({message: "Animal cadastrado!", origem:"Controller!", data: animal})
};


export const atualizarAnimal = (req, res) => {
    const { id } = req.params;
    const { nome, idade, tipo, cor, imagem, vacinado } = req.body;

    if(!nome || !idade || !tipo || !cor || !imagem || !vacinado){
        return res.status(400).send({message: "Dados inválidos!", origem:"Controller!"});
    }

    const animal = instancia.updateAnimal(id, nome, idade, tipo, cor, imagem, vacinado);

    if(!animal){
        return res.status(400).send({ message: "Nenhum animal encontrado!", origem:"Controller!" });
    }

    return res.status(200).send({message: `Rota PUT animal com ID ${id}!`, origem:"Controller!", data: animal});
};
export const deletarAnimal = (req, res) => {

    const { id } = req.params;

    const animal = instancia.removeAnimal(id);

    if(!animal){
        return res.status(200).send({ message: `Animal ${id} excluído!`, origem:"Controller!" });
    }

    instancia.removeAnimal(id);
    return res.status(200).send({message: `Rota DELETE animal com ID ${id}!`, origem:"Controller!", data: animal});
}




