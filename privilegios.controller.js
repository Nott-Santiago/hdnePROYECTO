const Privilegios = require('./Privilegios');


const Privilegio = {
    list: async (req,res) => {
        const privilegios = await Privilegios.find()
        res.status(200).send(privilegios)
        console.log(privilegios);
    },
    create: async (req,res) =>{
        const privilegios = new Privilegios(req.body)
        const privilegioSaved = await privilegio.save()
        res.status(201).send(privilegioSaved._id)
    },
    update: async (req,res) =>{
        const {id} = req.params
        const privilegio = await Privilegios.findOne({ _id: id })
        Object.assign(user, req.body)
        await privilegios.save()
        res.sendStatus(204)
    },
    destroy: async (req,res) =>{
        const {id} = req.params
        const privilegio = await privilegios.findOne({_id: id})
        if (privilegio) {
            privilegio.deleteOne()
        }
        res.sendStatus(204)

    }

};

module.exports = Privilegio