import 'dotenv/config'
import User from '../models/User.js'
import Collections from '../models/Collections.js'







class CollectionsController {
    async createCollections(req, res) {
        try {
            const { name, userId, words } = req.body
            const collections = await Collections.create({ name, userId, words })
            return res.json(collections)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error1' })
        }
    }
    async addWorlds(req, res) {
        try {
            const collectionId = req.params.id
            const { words } = req.body
            await Collections.updateOne({ "_id": collectionId }, { "$push": { "words": { "$each": words } } })
            return res.json("excellent")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error2' })
        }
    }



    async getCollections(req, res) {
        try {
            const { userId } = req.params
            const collections = await Collections.find({ userId })
            return res.json(collections)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error3' })
        }
    }





    async updateCollection(req, res) {
        try {
            const collectionId = req.params.id
            const updateData = req.body
            await Collections.findByIdAndUpdate(collectionId, updateData, { new: true })
            return res.json("update")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error4' })
        }
    }
    async updateWords(req, res) {
        try {
            const { wordId } = req.params
            const { engWord, rusWord } = req.body
            const response = await Collections.findOneAndUpdate({"words._id": wordId}, {$set: {"words.$.engWord":engWord, "words.$.rusWord":rusWord} }, { new: true })
            return res.json(response)
        } catch (e) {
            res.status(500).json({ message: 'Create error5' })
        }
    }



    async deleteOneWord(req, res) {
        try {
            const collectionId = req.params.id
            const { wordId } = req.body
            await Collections.updateOne({ "_id": collectionId }, { "$pull": { "words": { "_id": wordId } } })
            return res.json("word delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error6' })
        }
    }
    async deleteOneCollection(req, res) {
        try {
            const collectionId = req.params.id
            await Collections.findByIdAndDelete(collectionId)
            return res.json("collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error7' })
        }
    }
}




export default new CollectionsController()



