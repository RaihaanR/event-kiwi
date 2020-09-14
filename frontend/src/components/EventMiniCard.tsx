import React from 'react';
import './EventMiniCard.css';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { getDateRange } from '../utils/DateTimeTools';
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { connect, ConnectedProps } from 'react-redux';


const connector = connect(null, {loadBlankEvent})

type PropsFromRedux = ConnectedProps<typeof connector>
type EventMiniCardProps = PropsFromRedux & {
  eventId: string,
  eventName: string, 
  organiser: string, 
  image: string, 
  eventStart: Date,
  eventEnd: Date,
  tab: string
};

const EventMiniCard: React.FC<EventMiniCardProps> = ({ eventName, organiser, image, eventStart, eventEnd, eventId, loadBlankEvent, tab}) => {
  const urlPrefix = tab !== "" ? `/${tab}` : "";
  return (
    <IonCard onClick={() => loadBlankEvent(tab)}  className="mini_card" routerLink={`${urlPrefix}/event/${eventId}`}>

      <img src={image} className="mini_banner"/>

      <IonCardContent className="mini_description">
        <IonGrid>
          <IonRow>
            <IonCardSubtitle className="mini_organiser_name">By {organiser}</IonCardSubtitle>
          </IonRow>
          <IonRow>
            <IonCardTitle className="mini_header ion-text-wrap">
            {eventName}
            </IonCardTitle>
          </IonRow>
            <IonRow className="mini_time">
                {getDateRange(eventStart, eventEnd)}
            </IonRow>


        </IonGrid>
        
      </IonCardContent>

    </IonCard>
  );
};

export default connector(EventMiniCard);
