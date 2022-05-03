const Question = require('../models/Question')

class QuestionController {
    async createQuestion(req, res) {
        try {
            const { email, name, text } = req.body;

            const question = new Question({ name, email, text });
            await question.save();
            return res.json({ message: "Вопрос успешно был создан" })
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async getQuestion(req, res) {
        try {
            let questions;
            if (req.query.questionId) {
                questions = await Question.find({ _id: req.query.questionId })
            }
            else {
                questions = await Question.find({}).sort({ _id: 'desc' })
            }
            return res.json(questions)
        } catch (error) {
            console.log(error);
            return res.status(500).json(e);
        }
    }

    async readQuestion(req, res) {
        try {
            const id = req.params.id

            if (!id ) {
                return res.status(400).json({ message: `Некорректный запрос` })
            }
            Question.findByIdAndUpdate(id, { unread: false }, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    return res.json({ message: `Вопрос был прочитан` })
                }
            }).clone()

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async deleteQuestion(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({ message: `Некорректный запрос` })
            }
            await Question.findByIdAndDelete(id, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    return res.json({ message: `Вопрос успешно удален: ${result}` })
                }
            }).clone()
        } catch (error) {
            console.log(error);
            return res.status(500).json(e);
        }
    }
}

module.exports = new QuestionController()