import React, { useState, useRef } from 'react';
import { IonText, IonCard, IonCardSubtitle, IonCol, IonGrid, IonRow, IonButton, IonIcon, IonToast, IonSkeletonText, IonChip, isPlatform, IonImg } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from '../ExpandTextView';
import EventMiniCard from '../EventMiniCard';
import { getDateRange } from '../../utils/DateTimeTools';
import { RootState } from '../../data/reducers';
import { Plugins } from '@capacitor/core';
import { ConnectedProps, connect } from 'react-redux';
import { checkmarkCircleOutline, starOutline, time, location as locationIcon, shareOutline } from 'ionicons/icons';
import { INTERESTED, GOING, EVENT_OWNER } from '../../constants/constants';
import { goingToEvent, interestedInEvent, notGoingToEvent } from '../../data/actions/viewEvent/viewEventActions';
import { EventDetails, blankFilters } from '../../constants/types';
import { useHistory } from 'react-router';
import { fetchTagEventCards } from '../../data/actions/actions';
import { isBefore } from 'date-fns/fp'
const { Share } = Plugins;

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken,
   isLoggedIn: state.userDetails.isLoggedIn
})

const connector = connect(mapStateToProps, { goingToEvent, interestedInEvent, notGoingToEvent, fetchTagEventCards })

interface OwnProps {
   hide: boolean,
   eventDescription: EventDetails,
   tab: string,
   eventId: string,
   goingStatus: number,
   shareUrl: string
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventDescriptionProps = PropsFromRedux & OwnProps;

const EventDescription: React.FC<EventDescriptionProps> = (props) => {
   const [goingToast, showGoingToast] = useState<boolean>(false);
   const [notGoingToast, showNotGoingToast] = useState<boolean>(false);
   const [interestedToast, showInterestedToast] = useState<boolean>(false);
   const [shareUrlToast, showShareUrlToast] = useState<boolean>(false);

   const shareUrlTextRef = useRef<HTMLTextAreaElement>(null);

   const history = useHistory();

   const interestedClicked = () => {
      if (props.eventDescription.goingStatus !== INTERESTED) {
         props.interestedInEvent(props.eventDescription.id, props.userToken);
         showInterestedToast(true);
      } else {
         props.notGoingToEvent(props.eventDescription.id, props.userToken);
         showNotGoingToast(true);
      }
   }

   const goingClicked = () => {
      if (props.eventDescription.goingStatus !== GOING) {
         props.goingToEvent(props.eventDescription.id, props.userToken);
         showGoingToast(true)
      } else {
         props.notGoingToEvent(props.eventDescription.id, props.userToken);
         showNotGoingToast(true);
      }
   }

   const shareClicked = async () => {
      if (isPlatform("desktop")) {
         try {
            shareUrlTextRef.current!.hidden = false;
            shareUrlTextRef.current!.select();
            var successful = document.execCommand('copy');
            successful ? showShareUrlToast(true) : console.log("Unable to copy URL to clipboard");
         } catch (err) {
            console.error('Fallback: Unable to copy', err);
         } finally {
            shareUrlTextRef.current!.hidden = true;
         }

      } else {
         let shareRet = await Share.share({
            title: `Share event`,
            url: props.shareUrl,
            dialogTitle: 'Share event'
         });
      }
   }

   const isOver = !isBefore(props.eventDescription.datetimeEnd, Date.now()) ;

   return (
      <div style={props.hide ? { display: "none" } : {}}>
         <Container>
            <IonText>
               {props.eventDescription.name === "" && <>
                  <h1><IonSkeletonText style={{ width: '40%', height: '30px' }} animated /></h1>
                  <IonSkeletonText animated />  </>
               }
               {props.eventDescription.name !== "" && <>
                  <h1>{props.eventDescription.name}</h1>
                  <IonCardSubtitle>By {props.eventDescription.organiser.name}</IonCardSubtitle> </>
               }
            </IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <IonImg className="eventImage" src={props.eventDescription.images[0]} alt={props.eventDescription.name} />
                  </IonCard>
               </Col>

               <Col md={6} sm={12}>
                  <Row>
                     <Col lg={5} sm={12}>
                        {props.eventDescription.description === "" && <div>
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                        </div>}
                        {props.eventDescription.description !== "" && <div>
                           <IonCardSubtitle className="detailsText">
                              <IonGrid className="timeLocationGrid">
                                 <IonRow className="timeLocationRow">
                                    <IonCol className="timeLocationCol" size="auto">
                                       <IonIcon icon={time} />
                                    </IonCol>
                                    <IonCol>
                                       {`${getDateRange(props.eventDescription.datetimeStart, props.eventDescription.datetimeEnd)}`}
                                    </IonCol>
                                 </IonRow>
                                 <IonRow className="timeLocationRow">
                                    <IonCol className="timeLocationCol" size="auto">
                                       <IonIcon icon={locationIcon} />
                                    </IonCol>
                                    <IonCol>
                                       {props.eventDescription.location}
                                    </IonCol>
                                 </IonRow>
                              </IonGrid>
                           </IonCardSubtitle>
                        </div>}
                     </Col>

                     {props.isLoggedIn && props.goingStatus !== EVENT_OWNER &&
                        <Col lg={7}>
                           <IonButton onClick={goingClicked} color={props.goingStatus === GOING ? "success" : "medium"}>
                              {isOver ? "Went" : "Going"}&nbsp; <IonIcon icon={checkmarkCircleOutline} />
                           </IonButton>
                           <IonButton onClick={interestedClicked} color={props.goingStatus === INTERESTED ? "warning" : "medium"}>
                              Interested&nbsp; <IonIcon icon={starOutline} />
                           </IonButton>
                        </Col>}

                     {props.isLoggedIn && props.goingStatus === EVENT_OWNER &&
                        <Col lg={7}>
                           <IonButton onClick={shareClicked} color="primary">
                              Share event&nbsp; <IonIcon icon={shareOutline} />
                           </IonButton>
                        </Col>}
                  </Row>
                  <Row>
                     <Col>
                        {props.eventDescription.tags.map(tag => (
                           <IonChip
                              onClick={(e) => {
                                 e.stopPropagation();
                                 e.preventDefault();
                                 props.fetchTagEventCards(tag, blankFilters, null, props.userToken);
                                 history.push('/discover')
                              }}
                              key={`tag-${tag}=${props.eventDescription.id}`}
                           >
                              {tag}
                           </IonChip>)
                        )}
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {props.eventDescription.description === "" && <div>
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                        </div>}
                        {props.eventDescription.description !== "" &&
                           <ExpandTextView limit={455} text={props.eventDescription.description} />
                        }
                     </Col>
                  </Row>

               </Col>
            </Row>
         </Container>

         {props.eventDescription.sameSocEvents.length > 0 &&
            <div>
               <Container>
                  <IonText><h2>More from {props.eventDescription.organiser.shortName}</h2></IonText>
               </Container>
               <Container className="descriptionSuggestedEventsContainer">
                  <div className="suggestedEvents">
                     {props.eventDescription.sameSocEvents.map(event => {
                        return <div className="eventSuggestion">
                           <EventMiniCard
                              key={`sameSocMiniEventCard--${event.id}`}
                              tab={props.tab}
                              eventId={event.id}
                              eventName={event.name}
                              eventStart={event.datetimeStart}
                              eventEnd={event.datetimeEnd}
                              organiser={event.organiser.shortName}
                              image={event.image} /></div>
                     })}
                  </div>
               </Container>
            </div>}

         {props.eventDescription.similarEvents.length > 0 &&
            <div>
               <Container>
                  <IonText><h2>Suggested events</h2></IonText>
               </Container>
               <Container className="descriptionSuggestedEventsContainer">
                  <div className="suggestedEvents">
                     {props.eventDescription.similarEvents.map(event => {
                        return <div className="eventSuggestion">
                           <EventMiniCard
                              key={`similarEventMiniEventCard--${event.id}`}
                              tab={props.tab}
                              eventId={event.id}
                              eventName={event.name}
                              eventStart={event.datetimeStart}
                              eventEnd={event.datetimeEnd}
                              organiser={event.organiser.shortName}
                              image={event.image} /></div>
                     })}
                  </div>
               </Container>
            </div>}

         <IonToast
            isOpen={goingToast}
            onDidDismiss={() => { showGoingToast(false) }}
            message="Added event to calendar."
            duration={3000}
         />

         <IonToast
            isOpen={goingToast || interestedToast}
            onDidDismiss={() => { showInterestedToast(false) }}
            message="Added event to calendar."
            duration={3000}
         />

         <IonToast
            isOpen={notGoingToast}
            onDidDismiss={() => showNotGoingToast(false)}
            message="Removed event from calendar."
            duration={3000}
         />

         <IonToast
            isOpen={shareUrlToast}
            onDidDismiss={() => showShareUrlToast(false)}
            message="Event URL copied to clipboard."
            duration={3000} />

         {/* Text area used for copying share url to clipboard */}
         <textarea readOnly hidden={true} ref={shareUrlTextRef} id="shareUrl" value={props.shareUrl} />
      </div>
   )
}

export default connector(EventDescription);
