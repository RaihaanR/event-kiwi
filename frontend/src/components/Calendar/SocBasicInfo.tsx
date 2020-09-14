import React from 'react';
import { SocietyCal } from '../../constants/types';
import { IonItem, IonChip, IonLabel } from '@ionic/react';
import './SocBasicInfo.css';

interface OwnProps {
  society: SocietyCal
}

type SocBasicInfoProps = OwnProps;

const SocBasicInfo: React.FC<SocBasicInfoProps> = ({ society }) => {
  const socCol = {"--background" : society.colour}

  return (
    <IonItem>
      <IonChip style={socCol} />
      <IonLabel className="ion-text-wrap socName">{society.name}</IonLabel>
    </IonItem>
  );
}

export default SocBasicInfo;
