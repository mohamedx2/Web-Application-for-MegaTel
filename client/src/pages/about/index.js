import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import './style.css'; // Import the CSS file

function AboutUs() {
    const { t } = useTranslation(); // Initialize the useTranslation hook

    return (
        <main>
            <section className="about-us-section">
                <div className="about-us-hero">
                    <div><h2 dangerouslySetInnerHTML={{ __html: t('aboutUs.title') }} /></div>
                     {/* Translate the title */}
                </div>
                <h4 dangerouslySetInnerHTML={{ __html: t('aboutUs.subtitle') }} /> {/* Translate the subtitle */}
                <div className="about-us-paragraph">
                    <p dangerouslySetInnerHTML={{ __html: t('aboutUs.description') }} /> {/* Translate the description */}
                </div>
                <br /><br /><br /><br />
                <div className="about-us-info">
                    <div>
                        <img src="./solar_dollar-bold.svg" alt="" />
                        <h4>1.5</h4>
                        <p dangerouslySetInnerHTML={{ __html: t('aboutUs.revenue') }} /> {/* Translate the revenue */}
                    </div>
                    <div>
                        <img src="./Vector.svg" alt="" />
                        <h4>150+</h4>
                        <p dangerouslySetInnerHTML={{ __html: t('aboutUs.colleagues') }} /> {/* Translate the number of colleagues */}
                    </div>
                    <div>
                        <img src="./ep_success-filled.svg" alt="" />
                        <h4>19+</h4>
                        <p dangerouslySetInnerHTML={{ __html: t('aboutUs.projects') }} /> {/* Translate the number of projects */}
                    </div>
                    <div>
                        <img src="./mdi_medal.svg" alt="" />
                        <h4>7+</h4>
                        <p dangerouslySetInnerHTML={{ __html: t('aboutUs.experience') }} /> {/* Translate the years of experience */}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AboutUs;
