const Turism = require('../models/turism')

//Criando um usaraio
exports.createTurism = async (req, res) => {
    try{
        const {name, country,city,price,responsible} = req.body;
        const turism = new Turism({name,country,city,price,responsible});
        await turism.save();
        res.status(201).json(turism);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//listar os usuarios

exports.getTurism = async (req, res) => {
    try{
        const turism = await Turism.find();
        res.status(200).json(turism);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Busca um usuario específico pleo id
exports.getTurismById = async (req, res) => {
    try{
        const turism = await Turism.findById(req.params.id);
        if (!turism) {
            return res.status(404).json({ message: 'Usuário não encontrado'});
        }
        res.status(200).json(turism);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
};  

exports.updateTurism = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, country,city,price,responsible } = req.body;

        const updatedTurism = await Turism.findByIdAndUpdate(
            id,
            {name, country,city,price,responsible },
            { new: true }
        );

        if (!updatedTurism) {
            return res.status(404).json({ message: 'Plano não encontrado' });
        }

        res.status(200).json(updatedTurism);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir plantação
exports.deleteTurism = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTurism = await Turism.findByIdAndDelete(id);
        if (!deleteTurism) return res.status(404).json({ message: 'turismo não encontrado' });

        res.status(200).json({ message: 'Turismo excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}