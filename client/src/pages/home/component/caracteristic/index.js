import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Characteristics = () => {
  const { t } = useTranslation(); // Access the translation function for home.characteristic
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust as needed
  });

  return (
    <div className={`caracteristique ${inView ? 'animation-visible' : ''}`} ref={ref}>
      <h1 className="h1">
        {t('home.characteristic.committedToChanging')}
      </h1>
      <h5>{t('home.characteristic.wePractice')}</h5>
      <div className="crt">
        <div className={`crt1 ${inView ? 'animation-visible' : ''}`}>
          <img src="sustainability.png" className="sustainability" alt={t('home.characteristic.sustainabilityAlt')} />
          <p>{t('home.characteristic.sustainability')}</p>
        </div>
        <div className={`crt1 ${inView ? 'animation-visible' : ''}`}>
          <img src="punctuality.png" className="punctuality" alt={t('home.characteristic.punctualityAlt')} />
          <p>{t('home.characteristic.punctuality')}</p>
        </div>
        <div className={`crt1 ${inView ? 'animation-visible' : ''}`}>
          <img src="Modern.png" className="modern" alt={t('home.characteristic.modernAlt')} />
          <p>{t('home.characteristic.modernTechnology')}</p>
        </div>
        <div className={`crt1 ${inView ? 'animation-visible' : ''}`}>
          <img src="quality.png" className="quality" alt={t('home.characteristic.qualityAlt')} />
          <p>{t('home.characteristic.quality')}</p>
        </div>
      </div>
    </div>
  );
};

export default Characteristics;
