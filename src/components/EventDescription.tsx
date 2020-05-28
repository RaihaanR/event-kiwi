import React, { Component, createRef } from 'react';
import { IonText, IonCard, IonCardSubtitle, IonButton, IonActionSheet, IonFabButton, IonIcon, IonFab } from '@ionic/react';
import { helpOutline, close, starOutline, checkmark } from 'ionicons/icons'
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from './ExpandTextView';
import { EventDetails } from '../constants/types';
import ItemSlider from './ItemSlider';
import EventMiniCard from './EventMiniCard';
<<<<<<< HEAD
import { getTime, getLongDate, getDateRange } from '../utils/DateTimeTools';
=======
import { getDateRange } from '../utils/DateTimeTools';
>>>>>>> d14b14081a93af80326c26b1a4fd0f4dd077baa1

interface EventDescriptionProps extends EventDetails {
   hide: boolean;
}

interface EventDescriptionState {
   attending: string;
   showActionSheet: boolean
}

class EventDescription extends Component<EventDescriptionProps, EventDescriptionState> {

   constructor(props: EventDescriptionProps) {
      super(props);
      this.state = {
         attending: helpOutline,
         showActionSheet: false
      }
   }

   render() {   

      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         <Container>
            <IonText><h1>{this.props.name}</h1></IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <img className="eventImage" src={this.props.images[0]} alt={this.props.name}></img>
                  </IonCard>
               </Col>
               
               <Col md={6} sm={12}>
                  <IonCardSubtitle>By {this.props.organiser.name},</IonCardSubtitle>
                  <IonCardSubtitle>{`${getDateRange(this.props.datetimeStart, this.props.datetimeEnd)},`}</IonCardSubtitle>
                  <IonCardSubtitle>{this.props.location}</IonCardSubtitle>
                  <ExpandTextView limit={450} text={this.props.description} />
               </Col>
            </Row>

            {this.props.sameSocEvents.length > 0 && 
            <div>
               <IonText><h2>More from {this.props.organiser.name}</h2></IonText>
               <div className="suggestedEvents">
                  
                  <ItemSlider width={250}>
                     {this.props.sameSocEvents.map(event => {
                        return <EventMiniCard 
                                 eventId={event.id}
                                 eventName={event.name}
                                 eventStart={event.datetimeStart}
                                 eventEnd={event.datetimeEnd}
                                 organiser={event.organiser.name}
                                 image={event.image} />
                        })}
                  </ItemSlider>
               </div>
            </div>}

            {this.props.sameSocEvents.length > 0 && 
            <div>
               <IonText><h2>Suggested events</h2></IonText>
               <div className="suggestedEvents">
                  <ItemSlider width={250}>
                     {this.props.similarEvents.map(event => {
                        return <EventMiniCard 
                                 eventId={event.id}
                                 eventName={event.name}
                                 eventStart={event.datetimeStart}
                                 eventEnd={event.datetimeEnd}
                                 organiser={event.organiser.name}
                                 image={event.image} />
                        })}
                  </ItemSlider>
               </div>
            </div>}
            
            <IonFab vertical="top" horizontal="end" slot="fixed">
               <IonFabButton onClick={() => this.setState({showActionSheet: true})}>
                  <IonIcon icon={this.state.attending}/>
               </IonFabButton>
            </IonFab>
            <IonActionSheet 
               isOpen={this.state.showActionSheet}
               onDidDismiss={() => this.setState({showActionSheet: false})}
               buttons={[
                  {
                     text: "Going",
                     icon: checkmark,
                     handler: () => {
                        this.setState({attending: checkmark})
                     }
                  },
                  {
                     text: "Interested",
                     icon: starOutline,
                     handler: () => {
                        this.setState({attending: starOutline})
                     }
                  },
                  {
                     text: "Not Going",
                     role: "destructive",
                     icon: close,
                     handler: () => {
                        this.setState({attending: close})
                     }
                  },
                  {
                     text: "Cancel",
                     role: "cancel"
                  }
               ]}
            />
         </Container>

      </div>
      )
   }
}

export default EventDescription;
