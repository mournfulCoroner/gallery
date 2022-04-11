import { NavLink, useLocation} from 'react-router-dom';
import './Header.scss';
import burger from './../../assets/images/burger.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import { userGetters } from '../../bll/reducers/reducerUser';
import { useEffect } from 'react';
import { getCategories } from '../../bll/reducers/reducerCategory';

function Header() {
	const user = useSelector((state) => state.reducerUser.user)
	const categories = useSelector(state => state.reducerCategory.categories)
	const dispatch = useDispatch()
	
	const params = useLocation()
	useEffect(() => {
		document.querySelector("#nav-toggle").checked = false
	}, [params])
	useEffect(() => {
		dispatch(getCategories())
	}, [])
	
	return (
		<header>
			<input type="checkbox" id="nav-toggle" hidden />
			<label htmlFor="nav-toggle" className="nav-toggle">
				<img src={burger} alt="" />
			</label>
			<NavLink to="/">
				<h1 className="author-title">sillysea</h1>
			</NavLink>
			<nav className="menu">
				{categories.map((category) => (
					<NavLink
						key={category._id}
						className={({ isActive }) => 'menu__link' + (isActive ? ' active' : '')}
						to={`/category/${category.id}`}
					>
						{category.name}
					</NavLink>
				))}
			</nav>

			<nav className="mobile-menu">
				<div className="mobile-menu__container">
					<div className='mobile-menu__nickname'>{user.nickname}</div>
					<NavLink
						className={({ isActive }) => 'mobile-menu__link' + (isActive ? ' active' : '')}
						to="/login"
					>
						Аутентификация
					</NavLink>

					<NavLink
						className={({ isActive }) => 'mobile-menu__link' + (isActive ? ' active' : '')}
						to="/donut"
					>
						Задонатить
					</NavLink>

					<NavLink
						className={({ isActive }) => 'mobile-menu__link' + (isActive ? ' active' : '')}
						to="/question"
					>
						Задать вопрос
					</NavLink>
					{user.role === "Admin" && (
						<NavLink
							className={({ isActive }) => 'mobile-menu__link' + (isActive ? ' active' : '')}
							to="/admin"
						>
							Редактировать
						</NavLink>
					)}

					<div className="mobile-menu__categories">
						{categories.map((category) => (
							<NavLink
								key={category._id}
								className={({ isActive }) => 'mobile-menu__link' + (isActive ? ' active' : '')}
								to={`/category/${category.id}`}
							>
								{category.name}
							</NavLink>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}

const mapStateToProps = (state) => ({
	authorization: userGetters.getAuthorization(state)
});

export default connect(mapStateToProps, null)(Header);
