import React, { useState } from 'react';
import './EventPostsList.css';
import EventPost from './EventPost';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonAlert } from '@ionic/react';
import CentredTextContainer from '../CentredTextContainer';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { getLongDate, getTime } from '../../utils/DateTimeTools';
import { Post, blankPost } from '../../constants/types';
import { deleteEventPost } from '../../data/actions/eventPosts/eventPostsActions';
import { Container } from 'react-grid-system';

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps, { deleteEventPost })

interface OwnProps {
   hide: boolean,
   posts: Post[],
   numPosts: number,
   isPoster: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventPostsListProps = PropsFromRedux & OwnProps;

const EventPostsList: React.FC<EventPostsListProps> = (props) => {

   const [deleteAlert, showDeleteAlert] = useState<boolean>(false);
   const [selectedPost, setSelectedPost] = useState<Post>(blankPost);

   const deleteClicked = (post: Post) => {
      setSelectedPost(post);
      showDeleteAlert(true);
   }

   const removeFile = () => {
      props.deleteEventPost(selectedPost.id, selectedPost.eventId, props.userToken);
      showDeleteAlert(false);
   }


   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {props.posts.length === 0 &&
            <CentredTextContainer name={"No posts for this event"} />
         }
         {props.posts.length > 0 &&
            <Container className="postContainer">
               <IonList>
                  {props.posts.map(post => {
                     return (
                        <IonItemSliding key={`event-post-${post.id}`} disabled={!props.isPoster}>
                           <IonItem>
                              <div className="restrictedWidth">
                                 <EventPost
                                    postContent={post.body}
                                    postTime={`${getLongDate(post.time)}, ${getTime(post.time)}`}
                                    organiserName={post.organiser.name}
                                    organiserLogo={post.organiser.image}
                                 />
                              </div>
                           </IonItem>

                           <IonItemOptions side="end">
                              <IonItemOption color="danger" onClick={() => deleteClicked(post)}>Delete</IonItemOption>
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
            header={`Delete post`}
            subHeader={`Are you sure you want to delete this post?`}
            buttons={['Cancel', {
               text: 'Ok',
               handler: removeFile
            }]}
         />
      </div>
   )
}

export default connector(EventPostsList);
