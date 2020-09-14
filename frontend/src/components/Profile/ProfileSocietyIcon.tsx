import React from 'react';
import './ProfileSocietyIcon.css';
import { IonCardHeader, IonText } from '@ionic/react';

interface ProfileSocietyIconProps {
  logo: string,
  name: string;
}

const ProfileSocietyIcon: React.FC<ProfileSocietyIconProps> = ({ logo, name }) => {
  return (
    <IonCardHeader className="socBody">
      <img src={logo} className="socLogo" />
      <IonText>
        <h6 className="truncate">{name}</h6>
      </IonText>
    </IonCardHeader>
  );
};

export default ProfileSocietyIcon;
