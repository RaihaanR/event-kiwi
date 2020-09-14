import React, { useEffect, useState, MouseEvent, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRefresher, IonRefresherContent, useIonViewDidEnter, IonFab, IonFabButton, IonIcon, IonFabList, IonSegment, IonSegmentButton, IonLabel, IonToast, IonButtons, IonButton, IonPopover, IonList, IonSelect, IonSelectOption, IonItem } from '@ionic/react';
import { options, calendar, add, informationCircleOutline, ellipsisVerticalSharp } from 'ionicons/icons'
import { isFuture } from 'date-fns'
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { fetchCalEvents } from '../data/actions/actions'
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';
import { editEventLoad } from '../data/actions/editEventActions';
import { groupByDate, myEvent, getSocs, applyFilters } from '../utils/EventFilterTootls';
import { CalendarEvent } from '../constants/types';
import SocBasicInfo from '../components/Calendar/SocBasicInfo';
import { FILTER_FOLLOWING, FILTER_GOING, FILTER_INTERESTED } from '../constants/constants';

const mapStateToProps = (state: RootState) => ({
  events: state.calEvents.events,
  viewEvents: state.viewEvent.events,
  isLoggedIn: state.userDetails.isLoggedIn,
  isLoading: state.userDetails.loading,
  isSociety: state.userDetails.isSoc,
  socId: state.userDetails.profile.society,
  userToken: state.userDetails.userToken,
  profileSocs: state.profileDetails.profileDetails.societies
})

const connector = connect(mapStateToProps, { fetchCalEvents, loadBlankEvent, editEventLoad });

type PropsFromRedux = ConnectedProps<typeof connector>;
type EventsProps = PropsFromRedux

const Events: React.FC<EventsProps> = (props) => {
  const [segment, setSegment] = useState<'my events' | 'upcoming' | 'past'>('upcoming');
  const [myEventsY, setMyEventsY] = useState(0);
  const [upcomingY, setUpcomingY] = useState(0);
  const [pastY, setPastY] = useState(0);

  const [eventSocs, setEventSocs] = useState(getSocs(props.events));

  const [showInfo, setShowInfo] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });
  const filterRef = useRef<HTMLIonSelectElement>(null);
  const [filters, setFilters] = useState<number[]>([FILTER_FOLLOWING, FILTER_INTERESTED, FILTER_GOING]);
  const updateFilter = (e: CustomEvent) => {
    setFilters(e.detail.value as number[]);
  }

  const [socEvents, futureEvents, pastEvents]:CalendarEvent[][] = props.events.reduce(([s, f, p]: CalendarEvent[][], e) => (
    myEvent(e, props.socId) ?
      [[...s, e], f, p] :
      (isFuture(e.datetimeEnd) ?
        [s, [...f, e], p] :
        [s, f, [...p, e]]
      )
  ), [[], [], []]);

  const myEvents = segment === 'my events'
  const upcoming = segment === 'upcoming';
  const past = segment === 'past';


  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [gridViewToast, setGridViewToast] = useState(false);
  
  const contentRef = React.useRef<HTMLIonContentElement>(null);
  const refresherRef = React.useRef<HTMLIonRefresherElement>(null);
  
  const refresh = () => {
    props.fetchCalEvents(refresherRef.current!, props.userToken);
    resetView();
  }

  useEffect(() => {
    props.fetchCalEvents(refresherRef.current!, props.userToken);
  }, [props.userToken, props.viewEvents]);

  useEffect(() => {
    const newEventSocs = getSocs(props.events);
    setFilters([...filters.filter(n => [...newEventSocs.map(soc => parseInt(soc.id)), FILTER_FOLLOWING, FILTER_INTERESTED, FILTER_GOING].includes(n)),
     ...newEventSocs.map(s => parseInt(s.id)).filter(n => !eventSocs.map(soc => parseInt(soc.id)).includes(n))]);
    setEventSocs(newEventSocs);
  }, [props.events]);

  useIonViewDidEnter(() => {
    props.loadBlankEvent("events");
  });

  const changeTab = (e: { detail: { value: any; }; }) => {
    const nextSegment = e.detail.value as any;

    switch (nextSegment) {
      case 'my events':
        contentRef.current!.scrollToPoint(0, myEventsY);
        break;
      case 'upcoming':
        contentRef.current!.scrollToPoint(0, upcomingY);
        break;
      case 'past':
        contentRef.current!.scrollToPoint(0, pastY);
        break;
    }
    setSegment(nextSegment);

  }

  const resetView = () => {
    setMyEventsY(0);
    setUpcomingY(0);
    setPastY(0);
    try {
      contentRef.current!.scrollToTop();
    } catch { /* contentRef has not yet loaded */ }
  }

  const saveY = (y: number) => {
    switch (segment) {
      case 'my events':
        setMyEventsY(y);
        break;
      case 'upcoming':
        setUpcomingY(y);
        break;
      case 'past':
        setPastY(y);
        break;
    }
  }

  const showGridView = (e: MouseEvent) => {
    e.preventDefault();

    // To be implemented
    // setViewType('grid');
    setGridViewToast(true);
  }

  if (!props.isLoggedIn && !props.isLoading) {
    return <Redirect to="/auth" />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonSegment value={segment} onIonChange={changeTab}>
            {props.isSociety &&
              <IonSegmentButton value="my events">
                <IonLabel>My Events</IonLabel>
              </IonSegmentButton>
            }
            <IonSegmentButton value="upcoming">
              <IonLabel>Upcoming</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="past">
              <IonLabel>Past</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonButtons slot="end">
            <IonButton onClick={(e) => setShowInfo({
                open: true,
                event: e.nativeEvent
              })}
            >
              <IonIcon icon={informationCircleOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Change isLoading state to be custom isLoading prop for calendar */}
      <IonContent ref={contentRef} scrollEvents onIonScroll={(e) => saveY(e.detail.currentY)} className={!props.isLoading ? 'fadeIn' : 'fadeOut'}>
        
        <IonRefresher ref={refresherRef} slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {props.isSociety &&
          <CalendarEventView hide={!myEvents} groupedEvents={groupByDate(socEvents)} socEvents={true} />
        }
        <CalendarEventView hide={!upcoming} groupedEvents={groupByDate(applyFilters(filters, futureEvents))} socEvents={false} />
        <CalendarEventView hide={!past} groupedEvents={groupByDate(applyFilters(filters, pastEvents)).reverse()} socEvents={false} />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={ellipsisVerticalSharp} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={() => filterRef.current!.open()}>
              <IonIcon icon={options}/>
            </IonFabButton>
            <IonFabButton onClick={showGridView}>
              <IonIcon icon={calendar}/>
            </IonFabButton>
            {props.isSociety &&
              <IonFabButton routerLink="/events/add">
                <IonIcon icon={add} />
              </IonFabButton>
            }
          </IonFabList>
        </IonFab>

        <IonToast 
          isOpen={gridViewToast}
          onDidDismiss={() => setGridViewToast(false)}
          message="Grid view coming soon!"
          position="bottom"
          duration={2000}
          cssClass="ion-text-center"
          animated
        />
        <IonPopover
          isOpen={showInfo.open}
          event={showInfo.event}
          onDidDismiss={() => setShowInfo({open: false, event: undefined})}
        >
          <IonList>
            {eventSocs.map(org => (
              <SocBasicInfo society={org} key={org.id}/>
            ))}
          </IonList>
        </IonPopover>
        <IonItem hidden>
          <IonLabel>Filter Calendar</IonLabel>
          <IonSelect interface="alert" value={filters} defaultChecked okText="Apply" multiple onIonChange={updateFilter} ref={filterRef}>
            <IonSelectOption value={FILTER_FOLLOWING}>Following</IonSelectOption>
            <IonSelectOption value={FILTER_INTERESTED}>Interested</IonSelectOption>
            <IonSelectOption value={FILTER_GOING}>Going</IonSelectOption>
            {eventSocs.map(soc => (
              <IonSelectOption value={parseInt(soc.id)} key={soc.id}>{soc.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}

export default connector(Events);
