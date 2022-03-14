import { connect } from 'react-redux';
import { agreementGetters, setAgreement } from '../../bll/reducers/reducerAgreement';
import './Home.scss';

function Home(props) {


	let onClick = (e) => {
		props.changeAgreement(e.target.checked)
	}
	return (
		<div className="home">
			<form action="#">
				<div className="form__text">
					<div className="form__title">Важное соглашение о продаже души</div>
					<div className="form__description">
						<p>
							Нажимая на кнопку "Я принимаю", вы подтверждаете, что находясь в здравом уме, твердой
							памяти, при ясном сознании, действуя добровольно, понимая значение своих действий,
							принимаете нижеследующие условия:
						</p>
						<p>
							- Получение всего что прописано в ТЗ в полном объёме с возможностью запросить недостающих
							компонентов
						</p>
						<p>- Избавление предоставителей от дальнейшей ответственности за использование полученного</p>
						<p>- Оплатой за вышеозначенное имущество является душа</p>
					</div>
				</div>
				<div className="form__btns">
					<div>
						<input type="checkbox" name="agreed" id="agreed_checkbox" onChange={onClick} />
						<label htmlFor="agreed_checkbox">Я прочитал и понял условия</label>
					</div>

					<button disabled={props.agreement} className="agreed-btn" type="button">
						Я принимаю
					</button>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => ({
    agreement: agreementGetters.getAgreement(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeAgreement(isChecked) {
        dispatch(setAgreement(isChecked));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
