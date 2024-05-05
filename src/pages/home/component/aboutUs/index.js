import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer'; // Import your translations JSON file

const AboutUs = () => {
  const { t } = useTranslation(); // Hook for translation
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div className={`contaner ${inView ? 'visible' : ''}`} ref={ref}>
      <div className="content">
        <h1 className="h1">{t('home.aboutUs.title')}</h1>
        <p>{t('home.aboutUs.yearsOfSuccess')}</p>
        <p className="b">
          {t('home.aboutUs.aboutDescription')}
        </p>
        <div className="circle-container">
          <div className="circle">
            <p>19+</p>
            <div className="label">{t('home.aboutUs.projects')}</div>
          </div>
          <div className="circle">
            <p>7+</p>
            <div className="label">{t('home.aboutUs.experience')}</div>
          </div>
          <div className="circle">
            <p>10+</p>
            <div className="label">{t('home.aboutUs.partnerWithMegaTel')}</div>
          </div>
          <div className="circle">
            <p>150+</p>
            <div className="label">{t('home.aboutUs.colleagues')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
