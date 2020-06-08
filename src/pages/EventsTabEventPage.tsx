import React, { Component, useEffect } from 'react';
import ViewEvent from './ViewEvent';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../data/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { loadEventDetails, loadingEvent, loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { loadEventPosts } from '../data/actions/eventPostsActions';

interface OwnProps extends RouteComponentProps<{ id: string }> { };

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken,
   isLoading: state.viewEvent.loading,
   isLoggedIn: state.userDetails.isLoggedIn
})

const connector = connect(mapStateToProps, { loadEventDetails, loadBlankEvent, loadingEvent, loadEventPosts })
type PropsFromRedux = ConnectedProps<typeof connector>
type EventsTabEventPageProps = OwnProps & PropsFromRedux;

const tab = "events"

const EventsTabEventPage: React.FC<EventsTabEventPageProps> = (props) => {
   useEffect(() => {
      props.loadEventDetails(props.match.params.id, tab, props.userToken);
      props.loadEventPosts(props.match.params.id, tab, props.userToken);
   }, [props.match.params.id, props.userToken]);

   return (
      <ViewEvent eventId={props.match.params.id} activeTab={tab} />
   )
}

export default connector(EventsTabEventPage);