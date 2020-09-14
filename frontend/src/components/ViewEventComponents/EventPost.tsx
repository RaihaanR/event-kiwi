import React, { Component } from 'react';
import './EventPost.css';
import { IonGrid, IonRow, IonCardSubtitle, IonText, IonCol, IonCardHeader } from '@ionic/react';
import ExpandTextView from '../ExpandTextView';
import { Container, Col, Row } from 'react-grid-system';

export interface EventPostProps {
  postContent: string,
  postTime: string,
  organiserName: string,
  organiserLogo: string
}

class EventPost extends Component<EventPostProps> {

   constructor(props: EventPostProps) {
      super(props);
   }

   render() {   
      return (
         <IonGrid>
            <IonRow>
               <IonCol size="auto">
                  <img src={this.props.organiserLogo} className="profilePhoto"></img>
               </IonCol>
               <IonCol className="verticalCentre">
                  <IonCardSubtitle>{this.props.postTime}</IonCardSubtitle>
                  <IonCardHeader className="postContent">By {this.props.organiserName}</IonCardHeader>
               </IonCol>
            </IonRow>


            <IonRow className="postContent">
               <ExpandTextView limit={700} text={this.props.postContent}/>
            </IonRow>
         </IonGrid>
      )
   }
}

export default EventPost;
