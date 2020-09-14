import React, { MouseEvent } from 'react';
import { IonGrid, IonCol, IonRow, IonLabel, IonItem, IonButton } from '@ionic/react';
import { Row, Col } from 'react-grid-system';
import "./ExploreSocietyCard.css"
import { connect, ConnectedProps } from 'react-redux';
import { SocietyCard } from '../constants/types';
import { RootState } from '../data/reducers';
import { followSociety, unfollowSociety } from '../data/actions/actions'
import { FOLLOWING } from '../constants/constants';


const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken
  }
}

const connector = connect(mapStateToProps, { followSociety, unfollowSociety });

interface OwnProps {
  soc: SocietyCard
}

type PropsFromRedux = ConnectedProps<typeof connector>
type ExploreSocietyCardProps = OwnProps & PropsFromRedux

const ExploreSocietyCard: React.FC<ExploreSocietyCardProps> = ({ soc, userToken, followSociety, unfollowSociety }) => {
  
  const toggleFollow = (e: MouseEvent) => {
    e.preventDefault();
    
    if (soc.following >= FOLLOWING) {
      unfollowSociety(soc.id, userToken);
    } else {
      followSociety(soc.id, userToken);
    }
    
  }
  return (
    <IonItem className="socItem fadeIn">
      <IonGrid>
        <IonRow>
          <IonCol size="3">
            <img src={soc.imageSrc} className="socLogo"/>
          </IonCol>
          <IonCol size="9">
            <IonLabel className="ion-text-wrap">
              <h2>{soc.name}</h2>
            </IonLabel>
            <Row>
              <Col xs={6} className="followerText">
                <IonLabel>
                  <p>{`${soc.followers} followers`}</p>
                </IonLabel>
              </Col>
              <Col xs={6}>
                {soc.following >= FOLLOWING ? 
                  <IonButton className="followBtn" fill="outline" onClick={toggleFollow}>Following</IonButton> :
                  <IonButton className="followBtn" fill="solid" onClick={toggleFollow}>Follow</IonButton>
                }
              </Col>
            </Row>             
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default connector(ExploreSocietyCard);
