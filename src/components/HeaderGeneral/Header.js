import './Header.scss';

function Header() {
    return (
        <>
            <header className="general-header">
                <div className="general-header__top top-header">
                    <div className="top-header__content _container">
                        <div className="top-header__column header-info">
                            <div className="header-info__logo">
                                <picture>
                                    <source srcSet="img/logo-img.webp" type="image/webp" className="header-info__logo_img" />
                                    <img src="img/logo-img.png" alt="" className="header-info__logo_img" />
                                </picture>
                            </div>
                            <div className="header-info__text">
                                <div className="header-info__text_username">
                                    Poteryaev<br /> Aleksandr
                                </div>
                                <div className="header-info__text_userprof">
                                    Front-End Developer
                                </div>
                            </div>
                        </div>
                        <div className="top-header__column header-nav">
                        <div className="header-nav__content _container">
                <nav className="header-nav__column">
                    <ul className="header-nav__actions actions-header">
                        <li><a href='/' className="actions-header__link"><span>GitHub</span></a></li>
                        <li><a href='/' className="actions-header__link"><span>My Portfolio</span></a></li>
                    </ul >
                </nav >
            </div >
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
