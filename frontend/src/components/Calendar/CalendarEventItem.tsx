import React from 'react';
import { CalendarEvent } from '../../constants/types'
import { IonItemSliding, IonGrid, IonCol, IonRow, IonItem, IonText, IonIcon } from '@ionic/react';
import { getDateRangeNoStartDate } from '../../utils/DateTimeTools'
import './CalendarEventItem.css'
import { star, checkmarkCircle } from 'ionicons/icons';

interface CalendarEventItemProps {
  event: CalendarEvent,
  myEvent?: boolean
}

const CalendarEventItem: React.FC<CalendarEventItemProps> = ({ event, myEvent }) => {
  const barCol = {"--socCol" : event.organiser.colour}

  return (
    <IonItem routerLink={`/events/event/${event.id}`} detail={false}>
      <IonGrid className="eventItem" style={barCol}>
        <IonRow className="eventName">
          <IonCol size="11">
            <div>
              {event.name}
            </div>
          </IonCol>
          {!myEvent &&
            <IonCol size="1" className="goingStatusSymbol">
              {event.status === 2 &&
                <IonIcon icon={checkmarkCircle} color="success"/>
              }
              {event.status === 1 &&
                <IonIcon icon={star} color="warning" />
              }
            </IonCol>
          }
        </IonRow>
        <IonRow>
          <IonCol size="6" className="detailCol">
            <IonText color="medium">
              <p className="eventDateTime">
                {getDateRangeNoStartDate(event.datetimeStart, event.datetimeEnd)}
              </p>
            </IonText>
          </IonCol>
          <IonCol size="6" className="detailCol">
            <IonText color="medium">
              <p className="eventLocation">{event.location}</p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}

CalendarEventItem.defaultProps = {myEvent: false};

export default CalendarEventItem