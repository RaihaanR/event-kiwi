import React, { Component } from 'react';
import './EventResource.css';
import { IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardHeader, IonCardTitle, IonText } from '@ionic/react';
import ExpandTextView from './ExpandTextView';
import { faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faLink, faFileArchive, faFileImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { faPython, faJava } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface EventResourceProps {
  type: string,
  name: string,
  url: string
}

class EventResource extends Component<EventResourceProps> {

   constructor(props: EventResourceProps) {
      super(props);
   }

   icon = () => {
      switch (this.props.type) {
        case "pdf":
          return faFilePdf
        case "py":
          return faPython
        case "java":
          return faJava
        case "doc":
          return faFileWord
        case "xslx":
          return faFileExcel
        case "pptx":
          return faFilePowerpoint
        case "link":
          return faLink
        case "zip":
          return faFileArchive
        case "img":
          return faFileImage
        default:
          return faFile
      }
    }

   render() {   
      return (
         <IonGrid>
         <IonRow>
            <IonCol size="auto">
               <FontAwesomeIcon icon={this.icon()} size="3x" />
            </IonCol>
            <IonCol>
               <IonText className="filename">
                <h5>{this.props.name}</h5>
              </IonText>
            </IonCol>
         </IonRow>
      </IonGrid>
      )
   }
}

export default EventResource;
