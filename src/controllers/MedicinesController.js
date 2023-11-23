const knex = require("../database/knex");

class MedicinesController{
    async create(request, response){
        const userId = request.user.id;

        const {name , dose, frequency,  type} = request.body;
        const { id } = request.params;

        const [medicine_id] = await knex("medicines").insert({
            name,
            dose, 
            frequency,  
            type,
            pet_id: id,
            user_id: userId
        });


        response.json(medicine_id);
    }

    async show( request, response){
        const user_id = request.user.id;

        const { id } = request.params;

        const medicines = await knex("medicines").where({user_id: user_id});

        return response.json({
            medicines
        });
    }

    async update(request, response){
        const {name , dose, frequency,  type} = request.body;
        const { id } = request.params;
        
        const medicine = await knex("medicines").where({ pet_id: id }).where({user_id: user_id}).first();
        if(!medicine){
            throw new AppError("Medicamento não encontrado")
        }

        if(name){
            medicine.name = name;
        }

        if(dose){
            medicine.dose = dose;
        }

        if(frequency){
            medicine.frequency = frequency;
        }

        if(type){
            medicine.type = type;
        }

        await knex("medicines").update(medicine).where({ pet_id: id});

        return response.status(200).json();

    }

    async delete(request, response){
        const {id} = request.params;

        await knex("medicines").where({id}).delete(); 

        return response.json();

    }


}

module.exports = MedicinesController;