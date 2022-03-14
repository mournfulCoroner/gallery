import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
	return (
		<header>
			<input type="checkbox" id="nav-toggle" hidden />
			<label htmlFor="nav-toggle" onclick class="nav-toggle">
				=
			</label>
			<NavLink to="/">
				<h1 className="author-title">Большой Ник</h1>
			</NavLink>
			<nav className="menu">
				<NavLink className={({ isActive }) => 'menu__link' + (isActive ? ' active' : '')} to="/category/1">
					Категория раз
				</NavLink>
				<NavLink className={({ isActive }) => 'menu__link' + (isActive ? ' active' : '')} to="/category/2">
					Категория два
				</NavLink>
				<NavLink className={({ isActive }) => 'menu__link' + (isActive ? ' active' : '')} to="/category/3">
					Категория три
				</NavLink>
				<NavLink className={({ isActive }) => 'menu__link' + (isActive ? ' active' : '')} to="/category/4">
					Категория четыре
				</NavLink>
				<NavLink className={({ isActive }) => 'menu__link' + (isActive ? ' active' : '')} to="/category/5">
					Категория пять
				</NavLink>
			</nav>

			<nav className="mobile-menu">
				<ul>
					<li>Раз</li>
					<li>Два</li>
					<li>Три</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
