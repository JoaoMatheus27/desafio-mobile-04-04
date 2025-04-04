const Turism = require('../models/turism')

//Criando um usaraio
exports.createTurism = async (req, res) => {
    try{
        const {country,city,price,responsible} = req.body;
        const turism = new Turism({country,city,price,responsible});
        await turism.save();
        res.status(201).json(turism);
    } catch (err) {
        res.status(400).json({ error: err.messgae });
    }
};

//listar os usuarios

exports.getTurisms = async (req, res) => {
    try{
        const turisms = await Turism.find();
        res.status(200).json(turisms);
    }catch (err) {
        res.status(400).json({ error: err.messgae });
    }
};

// Busca um usuario específico pleo id
exports.getTurismById = async (res, req) => {
    try{
        const turism = await turism.findById(req.params.id);
        if (!turism) {
            return res.status(404).json({ message: 'Usuário não encontrado'});
        }
        res.status(200).json(turism);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
};  
