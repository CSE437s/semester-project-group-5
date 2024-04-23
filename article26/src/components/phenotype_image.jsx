import React from 'react';
import IPF from '../assets/IPF.png'
import EOF from '../assets/EOF.png'
import EOI from '../assets/EOI.png'
import EPF from '../assets/EPF.png'
import EPI from '../assets/EPI.png'
import IOF from '../assets/IOF.png'
import IOI from '../assets/IOI.png'
import IPI from '../assets/IPI.png'

const phenotypeImages = {
  IPF: IPF,
  EOF: EOF,
  EOI: EOI,
  EPF: EPF,
  EPI: EPI,
  IOF: IOF,
  IOI: IOI,
  IPI: IPI
};

function PhenotypeImage({ phenotype }) {
      const selectedImage = phenotypeImages[phenotype];

  return (
    
      <img
        src={selectedImage}
        alt="Your Phenotype character image"
        width={230}
        height={320}
        className="center"
      />
    
  );
}

export default PhenotypeImage;