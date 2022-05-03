import './QuestionForm.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuestion } from '../../bll/reducers/reducerQuestion';

function QuestionForm() {
	const dispatch = useDispatch()
    const [successSend, setSuccessSend] = useState(false)
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [question, setQuestion] = useState("")
	const [isError, setIsError] = useState("")

	const sendForm = () => {
		if(question){
			dispatch(createQuestion({email, name, text: question}))
			.then(() => {
				setSuccessSend(true)
			})
			.catch((error) => {
				setSuccessSend(true)
				setIsError(error.response?.data.message)
			})
		}
	}

	return (
		<div className="question-form">
            {!successSend ?
			<form action="#"  className="question-form__form">
				<div className="question-form__header">Задайте вопрос</div>
				<div className="question-form__inputs">
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
					<input type="text" value={name}  onChange={(e) => setName(e.target.value)} placeholder="имя" />
					<textarea value={question}  onChange={(e) => setQuestion(e.target.value)} placeholder="вопрос" required/>
				</div>
				<div className="question-form__btns">
					<button  type="button" onClick={() => sendForm()} className='main-btn'>Отправить</button>
				</div>
			</form> : 
            <div className="question-form__form message">
				{isError ? isError : 'Сообщение успешно отправлено!'}
            </div>
}
		</div>
	);
}

export default QuestionForm;
