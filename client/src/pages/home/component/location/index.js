import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Locations = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust as needed
  });

  const { t } = useTranslation(); // Access the translation function

  return (
    <div className={`m ${inView ? 'visible' : ''}`} ref={ref}>
      <h1 className="h1">{t('home.location.ourLocations')}</h1>
      <div className="ma">
        <div className="map1">
          
          <p className="p3">{t('home.location.tunisia')}</p>
          <p className="p4">{t('home.location.tunisiaAddress')}</p>
        </div>
        <div className="map1">
          <img src="map1.png" alt="Map" />
          <p className="p3">{t('home.location.bulgaria')}</p>
          <p className="p4">{t('home.location.bulgariaAddress')}</p>
        </div>
        <div className="map1">
          <img src="map1.png" alt="Map" />
          <p className="p3">{t('home.location.worldwide')}</p>
          <p className="p4">{t('home.location.worldwideAddress')}</p>
        </div>
      </div>
    </div>
  );
};

export default Locations;
