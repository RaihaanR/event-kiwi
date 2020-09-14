import React, { useState, MouseEvent } from 'react';
import { IonLabel, IonSearchbar, IonButton, IonToast, IonTitle, IonContent, IonList } from '@ionic/react';
import { RootState } from '../../data/reducers';
import { fetchSearchInterests } from '../../data/actions/actions'
import { ConnectedProps, connect } from 'react-redux';
import './AddTagSearch.css'
import TagItem from './TagItem';

interface OwnProps {
  currentTags: string[],
  addTag: (tag: string) => void,
  removeTag: (tag: string) => void
}

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
type AddTagSearchProps = OwnProps & PropsFromRedux

const AddTagSearch: React.FC<AddTagSearchProps> = ({ currentTags, addTag, removeTag, searchResults, userToken, fetchSearchInterests }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchBarUpdate = (e: CustomEvent) => {
    if (e.detail.value === undefined) {
      setSearchTerm("");
      fetchSearchInterests("", userToken)
    } else {
      const newSearchTerm = e.detail.value!.trim().toLowerCase();
      setSearchTerm(newSearchTerm);
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
            <TagItem 
              tag={{
                name: searchTerm,
                numInterested: 0,
              }}
              currentTags={currentTags}
              addTag={addTag}
              removeTag={removeTag}
            />
          }
          {searchResults.map(interest => (
            <TagItem tag={interest} currentTags={currentTags} addTag={addTag} removeTag={removeTag} key={interest.name} />
          ))}
        </IonList>
      </div>
    </IonContent>
  );
}

export default connector(AddTagSearch);
