import React, { MouseEvent, useState, useEffect } from 'react';
import { IonGrid, IonCol, IonItem, IonRow, IonLabel, IonButton, IonToast } from '@ionic/react';
import { InterestDetails } from '../../constants/types';
import { addProfileInterest, removeProfileInterest } from '../../data/actions/actions';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../data/reducers';
import './InterestItem.css'

interface OwnProps {
  interest: InterestDetails,
}

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken,
    interestList: state.profileDetails.profileDetails.interests
  }
}

const connector = connect(mapStateToProps, { addProfileInterest, removeProfileInterest })

type PropsFromRedux = ConnectedProps<typeof connector>
type InterestItemProps = OwnProps & PropsFromRedux

const InterestItem: React.FC<InterestItemProps> = ({ interest, interestList, userToken, addProfileInterest, removeProfileInterest }) => {
  const [interested, setInterested] = useState(interestList.includes(interest.name));
  const [tooLongToast, setTooLongToast] = useState(false);
  const [invalidCharacterToast, setInvalidCharacterToast] = useState(false);

  const validInterest = (intr: string) => {
    const rejectRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (intr.length > 32) {
      setTooLongToast(true);
    } else if (rejectRegex.test(intr)) {
      setInvalidCharacterToast(true);
    } else {
      return true;
    }
    return false;
  }

  const toggleInterest = (e: MouseEvent) => {
    e.preventDefault();

    if (interested) {
      removeProfileInterest(interest.name, userToken)
      setInterested(false);
    } else {
      if (validInterest(interest.name)) {
        addProfileInterest(interest.name, userToken)
        setInterested(true)
      }
    }
  }

  useEffect(() => {
    setInterested(interestList.includes(interest.name))
  }, [interest]);
  
  return (
    <>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <IonLabel>
                <div className="interestName">{interest.name}</div>
                <p>{`${interest.numInterested} ${(interest.numInterested == 1) ? "person" : "people"} interested`}</p>
              </IonLabel>
            </IonCol>
            <IonCol size="4">
              {interested ?
                <IonButton color="danger" fill="outline" className="interestBtn" onClick={toggleInterest}>Remove</IonButton> :
                <IonButton color="primary" fill="solid" className="interestBtn" onClick={toggleInterest}>Add</IonButton>
              }
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonToast
        isOpen={tooLongToast}
        onDidDismiss={() => setTooLongToast(false)}
        message="Interests can not be longer that 32 characters."
        position="bottom"
        duration={2500}
      />
      <IonToast
        isOpen={invalidCharacterToast}
        onDidDismiss={() => setInvalidCharacterToast(false)}
        message={`Interests can not contain the following characters: \`~!@#$%^&*()_|+-=?;:'",.<>{}[]\\/`}
        position="bottom"
        duration={2500}
      />
    </>
  );
}

export default connector(InterestItem);
