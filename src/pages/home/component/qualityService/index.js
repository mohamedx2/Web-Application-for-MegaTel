import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// Import statements

const QualityService = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div className={`q ${inView ? 'visible' : ''}`} ref={ref}>
      <h1 className="h1" dangerouslySetInnerHTML={{ __html: t('home.qualityService.title') }} />
      <div className="qlt">
        <div className="qlt1">
          <img src="qlt2.png" alt="Quality Service" className="img1" />
          <p className="p1" dangerouslySetInnerHTML={{ __html: t('home.qualityService.expertise') }} />
          <p className="p2" dangerouslySetInnerHTML={{ __html: t('home.qualityService.expertiseDescription') }} />
        </div>
        <div className="qlt1">
          <img src="qlt1.png" alt="Quality Service" />
          <p className="p1" dangerouslySetInnerHTML={{ __html: t('home.qualityService.flexibility') }} />
          <p className="p2" dangerouslySetInnerHTML={{ __html: t('home.qualityService.flexibilityDescription') }} />
        </div>
        <div className="qlt1">
          <img src="qlt3.png" alt="Quality Service" />
          <p className="p1" dangerouslySetInnerHTML={{ __html: t('home.qualityService.technology') }} />
          <p className="p2" dangerouslySetInnerHTML={{ __html: t('home.qualityService.technologyDescription') }} />
        </div>
      </div>
    </div>
  );
};



export default QualityService;
