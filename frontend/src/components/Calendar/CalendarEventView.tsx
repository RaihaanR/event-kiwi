import React from 'react';
import { IonList, IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react'
import './CalendarEventView.css'
import { CalendarEvent, EventGroupByDate } from '../../constants/types';
import { sameDay, getLongDate } from '../../utils/DateTimeTools';
import CalendarEventItem from './CalendarEventItem';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import EmptySectionText from '../EmptySectionText';
import { Container } from 'react-grid-system';
import { groupByDate } from '../../utils/EventFilterTootls';

interface OwnProps {
  hide: boolean,
  groupedEvents: EventGroupByDate[],
  socEvents: boolean
}

const mapStateToProps = (state: RootState) => ({
  loadingUser: state.userDetails.loading
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>;
type CalendarEventViewProps = OwnProps & PropsFromRedux;

const CalendarEventView: React.FC<CalendarEventViewProps> = ({hide, groupedEvents, socEvents, loadingUser}) => {
  

  const currDate = new Date(Date.now())
  
  return (
    <div hidden={hide} className="calContent">
      {(!loadingUser && groupedEvents.length === 0) ?
        (socEvents ?
          <EmptySectionText mainText="No Events Created" subText="Press the plus in the button's menu to create a new event for your society!" /> :
          <EmptySectionText mainText="No Events Found" subText="Find some events and societies in the Discover tab!" />) :
        (<Container className="calendarContainer">
          <IonList>
            {groupedEvents.map((eventGroup) => (
              <IonItemGroup key={`date-${eventGroup.date.getDate()}-${eventGroup.date.getMonth() + 1}`}>
                <IonItemDivider sticky color="imperial">
                <IonLabel>
                  {(sameDay(eventGroup.date, currDate) ? "Today - " : "") + getLongDate(eventGroup.date)}
                </IonLabel>
              </IonItemDivider>
              {eventGroup.events.map((eventOnDay) => (
                <CalendarEventItem key={eventOnDay.id} event={eventOnDay} myEvent={socEvents} />
                ))}
            </IonItemGroup>
            ))}
          </IonList>
        </Container>)
      }
    </div>
  )
}


export default connector(CalendarEventView);