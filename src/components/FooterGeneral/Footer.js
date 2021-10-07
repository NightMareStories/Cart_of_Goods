import './Footer.scss';

function Footer(props) {
    return (
        <footer className="general-footer">
            <div className="general-footer__content content-footer _container">
                <div className="content-footer__block block-footer">
                    <div className="block-footer__credits">
                        <div className="block-footer__copyrights">
                            &copy; 2021 Poteryaev Aleksandr
                        </div>
                        <div className="block-footer__project">
                            <h3 className="block-footer__project_title">Project: <span>Cart of goods</span></h3>
                        </div>
                    </div>
                    <nav className="block-footer__nav">
                    <ul className="block-footer__actions actions-footer">
                        <li><a href='/' className="actions-footer__link"><span>GitHub</span></a></li>
                        <li><a href='/' className="actions-footer__link"><span>My Portfolio</span></a></li>  
                    </ul >
            </nav >
                </div>    
            </div>
        </footer>
  );

}
export default Footer;