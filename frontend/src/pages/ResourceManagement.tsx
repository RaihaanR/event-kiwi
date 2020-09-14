import React, { useEffect, useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonRow, IonCol, IonItem, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonItemSliding, IonItemOptions, IonItemOption, IonText, IonAlert } from '@ionic/react';
import { loadSocResources, uploadFile, deleteFile } from '../data/actions/resourceManagement/resourceManagementActions';
import "./ResourceManagement.css";
import EventResource from '../components/ViewEventComponents/EventResource';
import EmptySectionText from '../components/EmptySectionText';
import { add } from 'ionicons/icons';
import { Container, Row, Col } from 'react-grid-system';
import { resp_resource } from '../constants/RequestInterfaces';
import { resourceDownloadURL } from '../constants/endpoints';

interface OwnProps { }

const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEvent.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  isSoc: state.userDetails.isSoc,
  resources: state.resourceManagement.resources
})

const connector = connect(mapStateToProps, { loadSocResources, uploadFile, deleteFile })
type PropsFromRedux = ConnectedProps<typeof connector>

type ResourceManagementProps = OwnProps & PropsFromRedux;

const ResourceManagement: React.FC<ResourceManagementProps> = (props) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteAlert, showDeleteAlert] = useState<boolean>(false);

  const [resourceModal, showResourceModal] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<resp_resource>({ display_name: "", bucket_key: "", download_count: 0, events: [] });

  useEffect(() => {
    if (props.userToken !== "") {
      props.loadSocResources(props.userToken);
    }
  }, [props.userToken])

  const resourceSelected = (resource: resp_resource) => {
    setSelectedResource(resource);
    showResourceModal(true);
  }

  const modalDeleteClicked = (resource: resp_resource) => {
    setSelectedResource(resource);
    showDeleteAlert(true);
  }

  const slidingDeleteClicked = (resource: resp_resource) => {
    setSelectedResource(resource);
    showDeleteAlert(true);
  }


  const deleteFile = (bucket_key: string) => {
    props.deleteFile(bucket_key, props.userToken);
    showDeleteAlert(false);
    showResourceModal(false);
  }

  const uploadFiles = (files: FileList) => {
    props.uploadFile(files, props.userToken);
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/profile" />
          </IonButtons>
          <IonTitle>My Resources</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {props.resources.length > 0 ?
          <Container className="resourceContainer">
            <Row>
              {props.resources.map(r =>
                <Col key={`soc-resource-${r.bucket_key}`} lg={6} md={12} sm={12}>
                  <IonItemSliding>
                    <IonItem detail button onClick={() => resourceSelected(r)}>
                      <EventResource name={r.display_name} />
                    </IonItem>

                    <IonItemOptions side="end">
                      <IonItemOption color="danger" onClick={() => slidingDeleteClicked(r)}>Delete</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                </Col>)}
            </Row>
          </Container>
          : <EmptySectionText mainText="No resources" subText="Add some resources to use for your events" />}
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => fileInputRef.current!.click()}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <input
        ref={fileInputRef}
        hidden
        type="file"
        multiple
        onChange={e => uploadFiles((e.nativeEvent.target as HTMLInputElement).files!)}>
      </input>


      <IonModal
        isOpen={resourceModal}
        swipeToClose={true}
        onDidDismiss={() => showResourceModal(false)}>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="primary" onClick={() => showResourceModal(false)}>Done</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Container>
            <IonText>
              <h3>{selectedResource.display_name}</h3>
              <h5>Downloaded {selectedResource.download_count} time{selectedResource.download_count !== 1 ? "s" : ""}</h5>
              {selectedResource.events.length > 0 ?
                <>
                  <h5>Used in:</h5>
                  {selectedResource.events.map(e => <h6 id={e.name}>- {e.name}</h6>)}
                </>
                : <h5>Not used in any events</h5>}

            </IonText>
            <IonRow>
              <IonCol>
                <IonButton expand="block" href={resourceDownloadURL(selectedResource.bucket_key)} download={selectedResource.display_name}>Download</IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" color="danger" onClick={() => modalDeleteClicked(selectedResource)}>Delete</IonButton>
              </IonCol>
            </IonRow>
          </Container>
        </IonContent>
      </IonModal>


      <IonAlert
        isOpen={deleteAlert}
        onDidDismiss={() => showDeleteAlert(false)}
        header={`Delete resource`}
        subHeader={`Are you sure you want to delete "${selectedResource.display_name}"?`}
        message="This action cannot be undone"
        buttons={['Cancel', {
          text: 'Ok',
          handler: () => {
            deleteFile(selectedResource.bucket_key);
          }
        }]}
      />
    </IonPage>
  );
};
export default connector(ResourceManagement);