import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Employer = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust as needed
  });

  const { t } = useTranslation(); // Access the translation function

  return (
    <div className={`e ${inView ? 'visible' : ''}`} ref={ref}>
      <h1 className="h1">
        {t('home.employer.employerTitle')}
      </h1>
      <div className="em">
        <div className="emp">
          <img src="employeur1.jpg" alt="Mourad Gherab" className="img1" />
          <p className="p5">{t('home.employer.mouradGherab')}</p>
          <p className="p6">
            {t('home.employer.ceo')}
          </p>
        </div>
        <div className="emp">
          <img src="employeur2.jpg" alt="Admir Kolasinac" />
          <p className="p5">{t('home.employer.admirKolasinac')}</p>
          <p className="p6">
            {t('home.employer.coo')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Employer;
