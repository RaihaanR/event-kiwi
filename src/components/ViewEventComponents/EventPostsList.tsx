import React from 'react';
import './EventPostsList.css';
import EventPost from './EventPost';
import { IonList, IonItem } from '@ionic/react';
import CentredTextContainer from '../CentredTextContainer';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { getLongDate, getTime } from '../../utils/DateTimeTools';
import { Post } from '../../constants/types';

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean,
   posts: Post[]
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventPostsListProps = PropsFromRedux & OwnProps;

const EventPostsList: React.FC<EventPostsListProps> = (props) => {
   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {props.posts.length === 0 && 
            <CentredTextContainer name={"No posts for this event"} />
         }
         {props.posts.length > 0 &&
            <IonList>
               {props.posts.map(post => {
                  return (
                     <IonItem key={`event-post-${post.id}`}>
                        <div className="restrictedWidth">
                           <EventPost 
                              postContent={post.body} 
                              postTime={`${getLongDate(post.time)}, ${getTime(post.time)}`}
                              organiserName={post.organiser.name} 
                              organiserLogo={post.organiser.image}
                           />
                        </div>
                     </IonItem>
                  )
               })}
            </IonList>
         }
      </div>
   )
}

export default connector(EventPostsList);
