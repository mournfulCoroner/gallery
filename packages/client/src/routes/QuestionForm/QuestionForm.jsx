import './QuestionForm.scss';
import { useEffect, useState } from 'react';

function QuestionForm() {
    const [successSend, setSuccessSend] = useState(false)
	useEffect(() => {}, []);

	return (
		<div className="question-form">
            {!successSend ?
			<form action="#" className="question-form__form">
				<div className="question-form__header">Задайте вопрос</div>
				<div className="question-form__inputs">
					<input type="email" placeholder="email" />
					<input type="text" placeholder="имя" />
					<textarea placeholder="вопрос" />
				</div>
				<div className="question-form__btns">
					<button className='main-btn'>Отправить</button>
				</div>
			</form> : 
            <div className="question-form__form message">
                Сообщение успешно отправлено!
            </div>
}
		</div>
	);
}

export default QuestionForm;
