import React, { useState } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonAlert, IonToast } from '@ionic/react';
import EventResource from './EventResource';
import CentredTextContainer from '../CentredTextContainer';
import { resourceDownloadURL } from '../../constants/endpoints';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Resource } from '../../constants/types';
import { removeResourceFromEvent } from '../../data/actions/resourceManagement/resourceManagementActions';
import { Container } from 'react-grid-system';

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken,
   isLoggedIn: state.userDetails.isLoggedIn
})

const connector = connect(mapStateToProps, { removeResourceFromEvent })

interface OwnProps {
   hide: boolean,
   tab: string,
   resources: Resource[],
   isOwner: boolean,
   eventId: string
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventResourcesListProps = OwnProps & PropsFromRedux;
const EventResourcesList: React.FC<EventResourcesListProps> = (props) => {

   const [signInToast, showSignInToast] = useState<boolean>(false);
   const [deleteAlert, showDeleteAlert] = useState<boolean>(false);
   const [selectedResource, setSelectedResource] = useState<Resource>({ name: "", id: "" });

   const removeClicked = (resource: Resource) => {
      setSelectedResource(resource);
      showDeleteAlert(true);
   }

   const removeFile = () => {
      props.removeResourceFromEvent(props.eventId, selectedResource.id, props.userToken);
      showDeleteAlert(false);
   }

   const downloadClicked = () => {
      if (!props.isLoggedIn) {
         showSignInToast(true);
      }
   }

   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {props.resources.length === 0 &&
            <CentredTextContainer name={"No resources for this event"} />
         }

         {props.resources.length > 0 &&
            <Container className="resourceContainer" >
               <IonList>
                  {props.resources.map(resource => {
                     return (
                        <IonItemSliding onClick={downloadClicked} disabled={!props.isOwner} key={`event-resource-${resource.id}`}>
                           <IonItem disabled={!props.isLoggedIn} href={resourceDownloadURL(resource.id)} detail download={resource.name}>
                              <div className="restrictedWidth">
                                 <EventResource name={resource.name} />
                              </div>
                           </IonItem>

                           <IonItemOptions side="end">
                              <IonItemOption
                                 color="danger"
                                 onClick={() => removeClicked(resource)}>
                                 Remove
                        </IonItemOption>
                           </IonItemOptions>
                        </IonItemSliding>
                     )
                  })}
               </IonList>
            </Container>
         }

         <IonAlert
            isOpen={deleteAlert}
            onDidDismiss={() => showDeleteAlert(false)}
            header={`Remove resource`}
            message={`Are you sure you want to remove "${selectedResource.name}" from this event?`}
            buttons={['Cancel', {
               text: 'Ok',
               handler: removeFile
            }]}
         />

         <IonToast
            isOpen={signInToast}
            onDidDismiss={() => { showSignInToast(false) }}
            message="Please sign in to download a resource."
            duration={3000}
         />
      </div>
   )
}

export default connector(EventResourcesList);
