import './Header.scss';

function Header() {
    return (
        <>
            <header className="general-header">
                <div className="general-header__top g-top-header">
                    <div className="g-top-header__content _container">
                        <div className="g-top-header__column g-header-info">
                            <div className="g-header-info__logo">
                                <picture>
                                    <source srcSet="img/logo-img.webp" type="image/webp" className="g-header-info__logo_img" />
                                    <img src="img/logo-img.png" alt="logo-img" className="g-header-info__logo_img" />
                                </picture>
                            </div>
                            <div className="g-header-info__text">
                                <div className="g-header-info__text_username">
                                    Poteryaev<br /> Aleksandr
                                </div>
                                <div className="g-header-info__text_userprof">
                                    Front-End Developer
                                </div>
                            </div>
                        </div>
                        <div className="g-top-header__column g-header-nav">
                        <div className="g-header-nav__content">
                <nav className="g-header-nav__column">
                    <ul className="g-header-nav__actions g-actions-header">
                        <li><a href='/' className="g-actions-header__link"><span>GitHub</span></a></li>
                        <li><a href='/' className="g-actions-header__link"><span>My Portfolio</span></a></li>
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
