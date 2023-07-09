const Note = require('../model/Note')

const removeSubject = async (req,res) => {
    const subject = req.params.subject
    const username = req.params.name

    const findUser = await Note.findOne({username:username})
    if(!findUser){ return res.status(404).send(`NOT_FOUND: User ${username} not found in the database`)}

    try {
        const userNotes = await Note.findOne({username:username})
        const filteredSubjects = userNotes.subjects.filter(item => item.name !== subject)
        await Note.updateOne(
            {_id:findUser._id},
            {
                $set: {
                    'subjects': filteredSubjects
                }
            }
        )
        res.redirect(`/main/${username}`)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

module.exports = removeSubject