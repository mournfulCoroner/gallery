import s from './Header.module.css';
import logo from './../../static/pngwing.com.png';

function Header() {
    return (
        <header className={s.header}>
            <div className={s.header_icon}>
                <img src={logo} className={s.header_img} alt="" />
            </div>
            <div className={s.header_block}>
                <a href="#">Фиксированный хедер</a>
            </div>
        </header>
    );
}

export default Header;