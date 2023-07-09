const Note = require('../model/Note')

const handlePutNote = async (req,res) => {
    const subject  = req.body.subject
    const note = { title:req.body.title,content:req.body.content }
    const username = req.params.name

    const findUser = await Note.findOne({ username:username })
    if(!findUser){ return res.status(404).send(`Not_Found: User ${username} not found in the database.`) }

    // if user is found update the notes array
    try {     
        await Note.updateOne(
            { _id:findUser._id, 'subjects.name':subject }, // it is important to specify the subject name as well in the filter query
            { $push: 
                {
                    'subjects.$.notes': note
                }
            }
        )

        res.redirect(`/main/${username}/${subject}`)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)        
    }
}

module.exports = handlePutNote
