import React, { MouseEvent, useState, useEffect } from 'react';
import { IonGrid, IonCol, IonItem, IonRow, IonLabel, IonButton, IonToast } from '@ionic/react';
import { InterestDetails } from '../../constants/types';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../data/reducers';
import './TagItem.css'

interface OwnProps {
  tag: InterestDetails,
  currentTags: string[],
  addTag: (tag: string) => void,
  removeTag: (tag: string) => void 
}

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken,
    interestList: state.profileDetails.profileDetails.interests
  }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type TagItemProps = OwnProps & PropsFromRedux

const TagItem: React.FC<TagItemProps> = ({ tag, currentTags,addTag, removeTag }) => {
  const [added, setAdded] = useState(currentTags.includes(tag.name));
  const [tooLongToast, setTooLongToast] = useState(false);
  const [invalidCharacterToast, setInvalidCharacterToast] = useState(false);

  const validTag = (input: string) => {
    const rejectRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (input.length > 32) {
      setTooLongToast(true);
    } else if (rejectRegex.test(input)) {
      setInvalidCharacterToast(true);
    } else {
      return true;
    }
    return false;
  }

  const toggleInterest = (e: MouseEvent) => {
    e.preventDefault();

    if (added) {
      removeTag(tag.name)
      setAdded(false);
    } else {
      if (validTag(tag.name)) {
        addTag(tag.name)
        setAdded(true)
      }
    }
  }
  
  useEffect(() => {
    setAdded(currentTags.includes(tag.name))
  }, [tag]);

  return (
    <>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <IonLabel>
                <div className="tagName">{tag.name}</div>
                <p>{`${tag.numInterested} ${(tag.numInterested == 1) ? "person" : "people"} interested`}</p>
              </IonLabel>
            </IonCol>
            <IonCol size="4">
              {added ?
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

export default connector(TagItem);
