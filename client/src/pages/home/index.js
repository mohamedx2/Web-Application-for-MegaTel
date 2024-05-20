import React from 'react';
import './style.css';
import { useInView } from 'react-intersection-observer';
import {Par,QualityService,AboutUs,Locations,Employer,Characteristics  } from "./component";

const Home = () => {
  const { ref: aboutUsRef, inView: aboutUsInView } = useInView({
    threshold: 0.5,
  });

  const { ref: qualityServiceRef, inView: qualityServiceInView } = useInView({
    threshold: 0.5,
  });

  const { ref: characteristicsRef, inView: characteristicsInView } = useInView({
    threshold: 0.5,
  });

  const { ref: locationsRef, inView: locationsInView } = useInView({
    threshold: 0.5,
  });

  const { ref: employerRef, inView: employerInView } = useInView({
    threshold: 0.5,
  });
  
  return (
    <div className="d1">
      <Par/>

      <AboutUs refProp={aboutUsRef} isVisible={aboutUsInView} />
      <QualityService refProp={qualityServiceRef} isVisible={qualityServiceInView} />
      <Characteristics refProp={characteristicsRef} isVisible={characteristicsInView} />
      <Locations refProp={locationsRef} isVisible={locationsInView} />
      <Employer refProp={employerRef} isVisible={employerInView} />
    </div>
  );
};

export default Home;
