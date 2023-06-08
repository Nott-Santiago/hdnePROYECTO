const Roles = require('./Rol')

const Rol = {
    list: async (req,res) => {
        const roles = await Roles.find()
        res.status(200).send(roles)
    },
    create: async (req,res) =>{
        const rol = new Roles(req.body)
        const rolSaved = await rol.save()
        res.status(201).send(rolSaved._id)
    },
    update: async (req,res) =>{
        const {id} = req.params
        const rol = await Roles.findOne({ _id: id })
        Object.assign(rol, req.body)
        await rol.save()
        res.sendStatus(204)
    },
    destroy: async (req,res) =>{
        const {id} = req.params
        const rol = await Roles.findOne({_id: id})
        //console.log(user);
        if (rol) {
            rol.deleteOne()
        }
        res.sendStatus(204)

    }
}
module.exports = Rol