import './QuestionAdminPage.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion, getQuestions, readQuestion } from '../../bll/reducers/reducerQuestion';
import cross from '../../assets/images/cancel.png';

function QuestionAdminPage(props) {
	const dispatch = useDispatch();
	let questions = useSelector((store) => store.reducerQuestion.questions);
	useEffect(() => {
		dispatch(getQuestions());
	}, []);

	const read = (unread, questionId) => {
		if (unread) {
			dispatch(readQuestion(questionId));
		}
	};

	return (
		<div className="question-admin-page">
			{questions.map((question, index) => (
				<div
					onMouseEnter={() => read(question.unread, question._id)}
					key={question._id}
					className={
						question.unread ? (
							'question-admin-page__question-card question-card unread'
						) : (
							'question-admin-page__question-card question-card'
						)
					}
				>
					<div className="question-card__header">
						<p className="question-card__time">{question.date.slice(0, 10)}</p>
						<p>
							{index + 1}. {question.name}
						</p>
						<p>{question.email}</p>
						<button onClick={() => dispatch(deleteQuestion(question._id))} className="question-card__close">
							<img src={cross} alt="" />
						</button>
					</div>
					<div className="question-card__content">{question.text}</div>
				</div>
			))}
		</div>
	);
}

export default QuestionAdminPage;
