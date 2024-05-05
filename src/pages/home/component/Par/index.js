import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Par = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjust as needed
  });

  const { t } = useTranslation(); // Access the translation function

  return (
    <div className={`par ${inView ? 'visible' : ''}`} ref={ref}>
      <div>
        <p className="p1" dangerouslySetInnerHTML={{ __html: t('home.par.redefiningCustomerService') }}></p>
        <p className="p2" dangerouslySetInnerHTML={{ __html: t('home.par.partnerWithMegaTel') }}></p>
        <div className="baaa">
          <button className="bouton" dangerouslySetInnerHTML={{ __html: t('home.par.contactUs') }}></button>
        </div>
      </div>
    </div>
  );
};

export default Par;
