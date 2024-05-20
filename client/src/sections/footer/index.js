import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import './style.css';

function Footer() {
    const { t, i18n } = useTranslation(); // Hook for translation

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <footer>
            <div className="container">
                <div className="A">
                    <div className="a">
                        <p className="bold" dangerouslySetInnerHTML={{ __html: t('footer.customerSupport') }}></p>
                        <p className='p' dangerouslySetInnerHTML={{ __html: t('footer.supportTime') }}></p>
                    </div>
                    <p id="cp" dangerouslySetInnerHTML={{ __html: t('footer.copyright') }}></p>
                </div>
                <div className="A">
                    <div className="a">
                        <p className="bold" dangerouslySetInnerHTML={{ __html: t('services.services') }}></p>
                        <p className="p">
                            <b dangerouslySetInnerHTML={{ __html: t('services.telephony') }}></b><br/>
                            <span dangerouslySetInnerHTML={{ __html: t('services.telephonyDescription') }}></span><br/><br/>
                            <b dangerouslySetInnerHTML={{ __html: t('services.emailProcessing') }}></b><br/>
                            <span dangerouslySetInnerHTML={{ __html: t('services.emailProcessingDescription') }}></span>
                        </p>
                    </div>
                </div>
                <div className="A">
                    <div className="a">
                        <p className="bold" dangerouslySetInnerHTML={{ __html: t('services.officeInBulgaria') }}></p>
                        <p className="p" dangerouslySetInnerHTML={{ __html: t('services.officeAddress') }}></p>
                    </div>
                </div>
                <div className="A">
                    <div className="a">
                        <p className="bold" dangerouslySetInnerHTML={{ __html: t('services.ourLocations') }}></p>
                        <p className='p' dangerouslySetInnerHTML={{ __html: t('services.locationsList') }}></p>
                    </div>
                    <div>
                        <span>
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook-square"></i></a>
                        </span>
                        <span>
                            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                        </span>
                        <span>
                            <a href="https://www.linkedin.com/"><i className="fab fa-linkedin"></i></a>
                        </span>
                    </div>
                </div>
            </div>
            <div className="language-selector">
                <select className="language-select" onChange={changeLanguage} value={i18n.language}>
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                    <option value="de">DE</option>
                    <option value="ar">AR</option>
                    <option value="it">IT</option>
                    <option value="es">ES</option>
                    <option value="tr">TR</option> {/* Add Turkish option */}
                </select>
            </div>
        </footer>
    );
}

export default Footer;
