import './Footer.scss';

function Footer(props) {
    return (
        <footer className="general-footer">
            <div className="general-footer__content g-content-footer _container">
                <div className="g-content-footer__block g-block-footer">
                    <div className="g-block-footer__credits">
                        <div className="g-block-footer__copyrights">
                            &copy; 2024 Poteryaev Aleksandr
                        </div>
                        <div className="g-block-footer__project">
                            <h3 className="g-block-footer__project_title">Project: <span>Cart of Goods</span></h3>
                        </div>
                    </div>
                    <nav className="g-block-footer__nav">
                        <ul className="g-block-footer__actions g-actions-footer">
                            <li><a href='https://github.com/NightMareStories/Cart_of_Goods.git' className="g-actions-footer__link" target="_blank" rel="noopener noreferrer"><span>GitHub</span></a></li>
                            <li><a href='http://about-my-portfolio.website' className="g-actions-footer__link" target="_blank" rel="noopener noreferrer"><span>My Portfolio</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );

}
export default Footer;