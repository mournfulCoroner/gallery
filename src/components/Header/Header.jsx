import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
	return (
		<header>
			<NavLink to="/"><h1>Большой Ник</h1></NavLink>
			<div className="menu">
				<div className="header-block">
					<NavLink className={({isActive}) => "header-block__link" + (isActive ? " active" : "")} to="/category/1">
						Категория раз
					</NavLink>
					<NavLink className={({isActive}) => "header-block__link" + (isActive ? " active" : "")} to="/category/2">
						Категория два
					</NavLink>
					<NavLink className={({isActive}) => "header-block__link" + (isActive ? " active" : "")} to="/category/3">
						Категория три
					</NavLink>
					<NavLink className={({isActive}) => "header-block__link" + (isActive ? " active" : "")} to="/category/4">
						Категория четыре
					</NavLink>
					<NavLink className={({isActive}) => "header-block__link" + (isActive ? " active" : "")} to="/category/5">
						Категория пять
					</NavLink>
				</div>
			</div>
		</header>
	);
}

export default Header;
