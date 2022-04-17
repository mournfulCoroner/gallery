import { login, logout, userGetters } from './../../bll/reducers/reducerUser';
import { connect, useSelector } from 'react-redux';
import './Login.scss';
import { useEffect, useState } from 'react';

function Login(props) {
	useEffect(() => {
		setShowError(props.loginError);
			setTimeout(() => {
				setShowError(null);
			}, 1000);
	}, [props.loginError])
	const [ showError, setShowError ] = useState(null);
	const user = useSelector((state => state.reducerUser.user))

	const submitLogin = async (e) => {
		e.preventDefault();
		let loginFormElements = e.currentTarget.elements;
		await props.login(loginFormElements.nickname.value, loginFormElements.password.value)
	};

	const submitLogout = () => {
		props.logout();
	};

	return (
		<div className="login-page">
			<div className="form-container">
				{user.nickname ? (
					<div className="logout-block">
						<p>Выйти из аккаунта?</p>
						<button className='main-btn mt-25' onClick={submitLogout}>Выйти</button>
					</div>
				) : (
					<form onSubmit={submitLogin} className="form-block" action="#">
						<label htmlFor="input-login">Логин</label>
						<input id="input-login" name="nickname" type="text" />
						<label htmlFor="input-password">Пароль</label>
						<input type="password" name="password" id="input-password" />
						{showError ? <div className="form-block__error">{showError}</div> : null}
						<button className='main-btn mt-25'>Войти</button>
					</form>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	authorization: userGetters.getAuthorization(state),
	loginError: userGetters.getLoginError(state)
});

export default connect(mapStateToProps, {
	login,
	logout
})(Login);
