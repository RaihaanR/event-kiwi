import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonFab, IonFabButton, IonToast, IonModal, IonButton, IonTitle, IonFooter, IonItem, IonInput, IonTextarea } from '@ionic/react'
import EventDescription from '../components/ViewEventComponents/EventDescription';
import "./ViewEvent.css";
import EventPostsList from '../components/ViewEventComponents/EventPostsList';
import EventResourcesList from '../components/ViewEventComponents/EventResourcesList';
import { shareOutline, add, pencil } from 'ionicons/icons';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { loadEventDetails, loadingEvent, loadBlankEvent, goingToEvent, interestedInEvent, notGoingToEvent } from '../data/actions/viewEvent/viewEventActions';
import { loadEventPosts, addEventPost } from '../data/actions/eventPosts/eventPostsActions';
import { RootState } from '../data/reducers';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { blankEventDetails, EventDetails, EventIdAndPosts } from '../constants/types';
import { EVENT_OWNER } from '../constants/constants';
const { Share } = Plugins;

const eventWithId = (state: RootState) => (id: string) => state.viewEvent.events.filter(e => e.id === id);
const postsWithEventId = (state: RootState) => (id: string) => state.eventPosts.posts.filter(e => e.eventId === id);

interface OwnProps {
  eventId: string,
  activeTab: 'events' | 'discover' | '';
}

const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEvent.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  events: state.viewEvent.events
})

const connector = connect(mapStateToProps,
  { loadEventDetails, 
    loadBlankEvent, 
    loadingEvent, 
    goingToEvent, 
    interestedInEvent, 
    notGoingToEvent, 
    loadEventPosts,
    addEventPost })
type PropsFromRedux = ConnectedProps<typeof connector>

type ViewEventProps = OwnProps & PropsFromRedux;


const ViewEvent: React.FC<ViewEventProps> = (props) => {
  const [segment, setSegment] = useState<'details' | 'posts' | 'resources'>('details');

  const [detailsY, setDetailsY] = useState<number>(0);
  const [postsY, setPostsY] = useState<number>(0);
  const [resourcesY, setResourcesY] = useState<number>(0);

  const details = segment === 'details';
  const posts = segment === 'posts';
  const resources = segment === 'resources';

  const [shareUrlToast, showShareUrlToast] = useState<boolean>(false);

  const shareUrlTextRef = useRef<HTMLTextAreaElement>(null);
  const shareUrl = `https://drp.social/event/${props.eventId}`;

  const contentRef = React.useRef<HTMLIonContentElement>(null);

  const eventsWithMatchingId: EventDetails[] = useSelector(eventWithId)(props.eventId)
  const eventDescription = eventsWithMatchingId.length > 0 ? eventsWithMatchingId[0] : blankEventDetails;
  const goingStatus = eventDescription.goingStatus

  const postsWithMatchingId: EventIdAndPosts[] = useSelector(postsWithEventId)(props.eventId)
  const eventPosts = postsWithMatchingId.length > 0 ? postsWithMatchingId[0].posts : [];

  const [postModal, showPostModal] = useState<boolean>(false);
  const [postBody, setPostBody] = useState<string>("");

  const resetView = () => {
    setDetailsY(0);
    setPostsY(0);
    setResourcesY(0);
    try {
      contentRef.current!.scrollToTop();
    } catch { /* contentRef has not yet loaded */ }
    setSegment('details');
  }

  useEffect(resetView, [props.eventId])

  const changeTab = (e: { detail: { value: any; }; }) => {
    const nextSegment = e.detail.value as any;

    switch (nextSegment) {
      case 'details':
        contentRef.current!.scrollToPoint(0, detailsY);
        break;
      case 'posts':
        contentRef.current!.scrollToPoint(0, postsY);
        break;
      case 'resources':
        contentRef.current!.scrollToPoint(0, resourcesY);
        break;
    }
    setSegment(nextSegment);

  }

  const saveY = (y: number) => {
    switch (segment) {
      case 'details':
        setDetailsY(y);
        break;
      case 'posts':
        setPostsY(y);
        break;
      case 'resources':
        setResourcesY(y);
        break;
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
        url: shareUrl,
        dialogTitle: 'Share event'
      });
    }
  }

  const editEvent = () => {
    console.log("edit clicked")
  }

  const showAddPost = () => {
    setPostBody("");
    showPostModal(true);
  }

  const editResources = () => {
    console.log("edit resources clicked")
  }

  const ownerFabIcon = segment === "details" ? pencil : (segment === "posts" ? add : shareOutline);
  const ownerFabOnClick = segment === "details" ? editEvent : (segment === "posts" ? showAddPost : editResources);

  const addPost = () => {
    props.addEventPost(props.eventId, postBody, props.userToken)
    showPostModal(false);
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref={`/${props.activeTab}`} />
          </IonButtons>
          <IonSegment value={segment} onIonChange={changeTab}>
            <IonSegmentButton value="details">
              <IonLabel>Details</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="posts">
              <IonLabel>Posts</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="resources">
              <IonLabel>Resources</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} scrollEvents onIonScroll={(e) => saveY(e.detail.currentY)} className={!props.isLoading ? 'fadeIn' : 'fadeOut'}>

        <EventDescription goingStatus={goingStatus} shareUrl={shareUrl} eventId={props.eventId} eventDescription={eventDescription} tab={props.activeTab} hide={!details} />

        <EventPostsList posts={eventPosts} hide={!posts} numPosts={eventPosts.length} />

        <EventResourcesList resources={eventDescription.resources} tab={props.activeTab} hide={!resources} />

        {goingStatus === EVENT_OWNER && 
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={ownerFabOnClick} color="primary">
              <IonIcon icon={ownerFabIcon} />
            </IonFabButton>
          </IonFab>}

        {goingStatus !== EVENT_OWNER && 
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={shareClicked} color="primary">
              <IonIcon icon={shareOutline} />
            </IonFabButton>
          </IonFab>}

        <IonToast
          isOpen={shareUrlToast}
          onDidDismiss={() => showShareUrlToast(false)}
          message="Event URL copied to clipboard."
          duration={3000} />

        <IonModal
          isOpen={postModal}
          swipeToClose={true}
          onDidDismiss={() => showPostModal(false)}>

          <IonHeader>

            <IonToolbar>
              <IonButtons slot="start">
                <IonButton color="danger" onClick={() => showPostModal(false)}>Cancel</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton color="primary" onClick={addPost} disabled={postBody === ""}>Add post</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonItem>
              <IonLabel position="stacked">Write a post</IonLabel>
              <IonTextarea rows={50} placeholder="Update your followers..." required onIonChange={e => setPostBody(e.detail.value!)} />
            </IonItem>
          </IonContent>
        </IonModal>

        {/* Text area used for copying share url to clipboard */}
        <textarea readOnly hidden={true} ref={shareUrlTextRef} id="shareUrl" value={shareUrl} />
      </IonContent>
    </IonPage>
  );
};

export default connector(ViewEvent);