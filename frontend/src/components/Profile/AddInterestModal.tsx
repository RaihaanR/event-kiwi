import React, { useState, MouseEvent } from 'react';
import { IonSearchbar, IonContent, IonList } from '@ionic/react';
import { RootState } from '../../data/reducers';
import { fetchSearchInterests } from '../../data/actions/actions'
import { ConnectedProps, connect } from 'react-redux';
import './AddInterestModal.css'
import InterestItem from './InterestItem';

const mapStateToProps = (state: RootState) => {
  return {
    searchResults: state.interestSearch.interests,
    userToken: state.userDetails.userToken
  }
}

const connector = connect(
  mapStateToProps,
  { fetchSearchInterests }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type AddInterestModalProps = PropsFromRedux

const AddInterestModal: React.FC<AddInterestModalProps> = ({ searchResults, userToken, fetchSearchInterests }) => {
  const [searchTerm, setsearchTerm] = useState("");
  
  const searchBarUpdate = (e: CustomEvent) => {
    if (e.detail.value === undefined) {
      setsearchTerm("");
      fetchSearchInterests("", userToken)
    } else {
      const newSearchTerm = e.detail.value!.trim().toLowerCase();
      setsearchTerm(newSearchTerm);
      fetchSearchInterests(newSearchTerm, userToken);
    }
  }

  return (
    <IonContent>
      <div className="modalContainer">
        <h3 className="subtitle">Find an interest</h3>
        <IonSearchbar placeholder="e.g. hockey, finance, dance" onIonChange={searchBarUpdate} debounce={500} enterkeyhint="search" type="search" />
        <IonList hidden={searchTerm === ""}>
          {searchTerm !== "" && searchResults.filter(intr => (intr.name === searchTerm)).length === 0 &&
            <InterestItem 
              interest={{
                name: searchTerm,
                numInterested: 0,
              }}
            />
          }
          {searchResults.map(interest => (
            <InterestItem interest={interest} key={interest.name} />
          ))}
        </IonList>
      </div>
    </IonContent>
  );
}

export default connector(AddInterestModal);
