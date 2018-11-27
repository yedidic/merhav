const QUEST_URL = '/data/quest'
const QuestService = require('../services/QuestService')

module.exports = (app) => {

    //Query
    app.get(QUEST_URL, (req, res) => {
        QuestService.query()
            .then(quests => res.json(quests))
    })


    //getById
    app.get(QUEST_URL + '/:questId', (req, res) => {
        const questId = req.params.questId
        QuestService.getById(questId)
            .then(quest => res.json(quest))
    })

    //updateQuest
    app.put(QUEST_URL, (req, res) => {
        var updatedQuest = req.body;
        QuestService.update(updatedQuest)
            .then(quest => res.json(quest))
    })

    //deleteQuest
    app.delete(QUEST_URL + '/:questId', (req, res) => {
        const questId = req.params.questId;
        console.log({questId});
        
        QuestService.remove(questId)
            .then(() => res.end(`Quest ${questId} was Deleted successfully`));
    })

    //add
    app.post(QUEST_URL, (req, res) => {
        const quest = req.body;
        QuestService.add(quest)
            .then(quest => res.json(quest))
    })
}