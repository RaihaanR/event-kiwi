import React from 'react';
import './ExploreEventCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { time, location as locationIcon, pricetags } from "ionicons/icons";
import { getDateRange } from '../utils/DateTimeTools';
import { Society, blankFilters } from '../constants/types';
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { fetchTagEventCards } from '../data/actions/actions'
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../data/reducers';

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken
  }
}

const connector = connect(mapStateToProps, { loadBlankEvent, fetchTagEventCards })

type PropsFromRedux = ConnectedProps<typeof connector>
type ExploreEventCardProps = PropsFromRedux & {
  name: string, 
  organiser: Society, 
  image: string, 
  location: string, 
  datetimeStart: Date,
  datetimeEnd: Date,
  tags: string[],
  id: string;
};

const ExploreEventCard: React.FC<ExploreEventCardProps> = ({ name, organiser, image, location, datetimeStart, datetimeEnd, tags, id, userToken, loadBlankEvent, fetchTagEventCards }) => {

  const history = useHistory();

  return (
    <IonCard onClick={() => loadBlankEvent("discover")} routerLink={`/discover/event/${id}`}>

      <IonImg src={image} className="banner" alt={name}/>

      <IonCardHeader>
        <IonCardSubtitle>By {organiser.name}</IonCardSubtitle>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        
        <IonGrid className="grid">

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={locationIcon} size="small"/> 
            </IonCol>
            <IonCol size="11">
              {location}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={time} size="small"/> 
            </IonCol>
            <IonCol size="11">
              {getDateRange(datetimeStart, datetimeEnd)}
            </IonCol>
          </IonRow>

          <IonRow>
          <IonCol size="1">
          <IonIcon icon={pricetags} />
          </IonCol>
          {tags.slice(0, 3).map((tag, index) => (
              <IonChip
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  fetchTagEventCards(tag, blankFilters, null, userToken);
                  history.push(`/discover`)
                }}
                key={"tag chip " + index.toString()}
              >
                {tag}
              </IonChip>
          ))}
          </IonRow>

        </IonGrid>
      </IonCardContent>

    </IonCard>
  );
};

export default connector(ExploreEventCard);
