import React from 'react';
import './EventResource.css';
import { IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faLink, faFileArchive, faFileImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { faPython, faJava } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface EventResourceProps {
  name: string
}

const EventResource: React.FC<EventResourceProps> = ({ name }) => {
  const icon = () => {
    const fileType = name.split('.');

    switch (fileType[fileType.length - 1]) {
      case "pdf":
        return faFilePdf
      case "py":
        return faPython
      case "java":
        return faJava
      case "doc":
      case "docx":
        return faFileWord
      case "xslx":
        return faFileExcel
      case "pptx":
        return faFilePowerpoint
      case "link":
        return faLink
      case "zip":
        return faFileArchive
      case "jpeg":
      case "png":
      case "jpg":
        return faFileImage
      default:
        return faFile
    }
  }

  return (
      <IonGrid>
        <IonRow>
          <IonCol size="auto">
              <FontAwesomeIcon icon={icon()} size="3x" />
          </IonCol>
          <IonCol>
              <IonText className="filename">
              <h5>{name}</h5>
            </IonText>
          </IonCol>
        </IonRow>
    </IonGrid>
  )
}

export default EventResource;
