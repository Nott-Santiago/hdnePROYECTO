const Files = require('./File')

const File = {
    list: async (req,res) => {
        const files = await Files.find()
        res.status(200).send(files)
    }
}

module.exports = File