const Users = require('./User')
const User = {
    list: async (req,res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async (req,res) =>{
        const user = new Users(req.body)
        const userSaved = await user.save()
        res.status(201).send(userSaved._id)
    },
    update: async (req,res) =>{
        const {id} = req.params
        const user = await Users.findOne({ _id: id })
        Object.assign(user, req.body)
        await user.save()
        res.sendStatus(204)
    },
    destroy: async (req,res) =>{
        const {id} = req.params
        const user = await Users.findOne({_id: id})
        //console.log(user);
        if (user) {
            user.deleteOne()
        }
        res.sendStatus(204)

    }
}
module.exports = User