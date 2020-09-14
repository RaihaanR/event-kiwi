import React, { Component, createRef } from 'react';
import ExploreEventCard from './ExploreEventCard';
import {Container, Row, Col} from "react-grid-system";
import SkeletonTextEventCard from './SkeletonTextEventCard';
import { fetchEventCards } from "../data/actions/actions";
import "./ExploreEventsList.css";
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = (state: RootState) => {
   return {
      events: state.eventCards.events
   }
};

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type ExploreEventsListProps = PropsFromRedux;


class ExploreEventsList extends Component<ExploreEventsListProps> {
   render() {
      return (
         <Container>
            <Row>
               {this.props.events.length === 0  && [1,2,3,4,5,6].map(x =>
                  <Col lg={4} md={6} key={"skeleton" + x.toString()}>
                      <SkeletonTextEventCard />
                  </Col>
                  )
               }

               {this.props.events.length > 0  &&
                  this.props.events.map(event => 
                     <Col key={"eventCardCol-" + event.id} lg={4} md={6}>
                        <ExploreEventCard key={"eventCard" + event.id}
                           id={event.id} 
                           name={event.name}
                           datetimeStart={event.datetimeStart}
                           datetimeEnd={event.datetimeEnd}
                           location={event.location}
                           image={event.image}
                           tags={event.tags}
                           organiser={event.organiser}
                        />
                     </Col>
                  )
               }
            </Row>
         </Container>
      );
   }
}

export default connector(ExploreEventsList);