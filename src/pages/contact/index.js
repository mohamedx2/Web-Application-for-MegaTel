import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

export default function Contact() {
    const { t } = useTranslation(); // Specify the namespace 'contact'

    return (
        <>
            <div className="contact">
                <div className="hero">
                    <h1>{t('contact.contactUs')}</h1> {/* Access translation with 'contact.contactUs' */}
                </div>
                <div>
                    <div>
                        <h1>{t('contact.mainBranch')}</h1>
                        <p>{t('contact.mainBranchDescription')}</p>
                    </div>
                    <img src="map1.png" alt="" />
                </div>
                <div>
                    <div>
                        <img src="mdi_location.svg" alt="" />
                        <h1>{t('contact.address')}</h1>
                        <p>{t('contact.addressValue')}</p>
                    </div>
                    <div>
                        <img src="ic_baseline-phone.svg" alt="" />
                        <h1>{t('contact.phone')}</h1>
                        <p>{t('contact.phoneValue')}</p>
                    </div>
                    <div>
                        <img src="material-symbols_mail.svg" alt="" />
                        <h1>{t('contact.email')}</h1>
                        <p>{t('contact.emailValue')}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
