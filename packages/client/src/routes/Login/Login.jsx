import { login, logout, userGetters } from './../../bll/reducers/reducerUser';
import { connect } from 'react-redux';
import './Login.scss';

function Login(props) {


	const submitLogin = (e) => {
		e.preventDefault();
		let loginFormElements = e.currentTarget.elements
		props.login(loginFormElements.nickname.value, loginFormElements.password.value)
	}

	const submitLogout = () => {
		props.logout()
	}

	return (
		<div className='login-page'>
			<div className="form-container">
				{props.authorization ? (
					<div className='logout-block'>
						<p>Выйти из аккаунта?</p>
						<button onClick={submitLogout}>Выйти</button>
					</div>
				) : (
					<form onSubmit={submitLogin} className="form-block" action="#">
						<label htmlFor="input-login">Логин</label>
						<input id="input-login" name="nickname" type="text" />
						<label htmlFor="input-password">Пароль</label>
						<input type="password" name="password" id="input-password" />
						{props.loginError ? <div className='form-block__error'>{props.loginError}</div> : null}
						<button>Войти</button>
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
