import s from './Footer.module.css';

function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.footer_block}>
                <a href="#">А внизу футер</a>
            </div>
        </footer>
    );
}

export default Footer;