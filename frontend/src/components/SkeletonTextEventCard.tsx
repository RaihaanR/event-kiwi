import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonSkeletonText } from '@ionic/react';
import { time, pricetags, location } from 'ionicons/icons';
import "./ExploreEventCard.css";


const SkeletonTextEventCard: React.FC= ({}) => {
  return (
      <IonCard>

      <img className="banner" />

      <IonCardHeader>
        <IonCardSubtitle><IonSkeletonText animated style={{ width: '40%' }} /></IonCardSubtitle>
        <IonCardTitle><IonSkeletonText animated style={{ width: '80%' }} /></IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        
        <IonGrid className="grid">

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={location} size="small"/> 
            </IonCol>
            <IonCol size="11">
              <IonSkeletonText animated style={{ width: '70%' }} />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={time} size="small"/> 
            </IonCol>
            <IonCol size="11">
              <IonSkeletonText animated style={{ width: '60%' }} />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={pricetags} />
            </IonCol>
            <IonCol size="11">
              <IonSkeletonText animated style={{ width: '50%' }} />
            </IonCol>

          </IonRow>

        </IonGrid>
      </IonCardContent>

    </IonCard>
  );
}


export default SkeletonTextEventCard;