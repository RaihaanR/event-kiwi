import React, { useRef, useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent, IonList, IonCol, IonRow, IonGrid, IonButton, IonIcon, IonButtons, IonModal } from '@ionic/react';
import { add, options } from 'ionicons/icons'
import './Discover.css';
import { connect, ConnectedProps } from 'react-redux';
import { fetchEventCards, fetchSearchEventCards, fetchMoreEventCards, fetchMoreSearchEventCards, fetchSearchSocietyCards, fetchTagEventCards, fetchMoreTagEventCards } from "../data/actions/actions";
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-grid-system';
import SkeletonTextEventCard from '../components/SkeletonTextEventCard';
import ExploreEventCard from '../components/ExploreEventCard';
import EmptySectionText from '../components/EmptySectionText';
import ExploreSocietyCard from '../components/ExploreSocietyCard';
import { SocietyCard } from '../constants/types';
import { MAX_SOCS_DISPLAY, EVENT_SEARCH_BATCH_SIZE } from '../constants/constants';
import SearchFilterModal from '../components/SearchFilterModal';


const mapStateToProps = (state: RootState) => {
  return {
    societies: state.societyCards.societies,
    events: state.eventCards.events,
    moreResults: state.eventCards.moreResults,
    tagSearch: state.eventCards.isTagSearch,
    tagName: state.eventCards.tagName,
    filters: state.searchFilters,
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading,
    userToken: state.userDetails.userToken,
    interests: state.profileDetails.profileDetails.interests
  }
}

const connector = connect(
  mapStateToProps,
  { fetchSearchSocietyCards, fetchEventCards, fetchMoreEventCards, fetchSearchEventCards, fetchMoreSearchEventCards, fetchTagEventCards, fetchMoreTagEventCards }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type DiscoverProps =  PropsFromRedux;

const Discover: React.FC<DiscoverProps> = (props) => {
  const refresherRef = useRef<HTMLIonRefresherElement>(null);
  const searchBar = useRef<HTMLIonSearchbarElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBatchNum, setSearchBatchNum] = useState(0);
  const [socExpanded, setSocExpanded] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [isTagSearch, setIsTagSearch] = useState(props.tagSearch);

  useEffect(() => {
    search("", props.tagSearch)
  }, [props.userToken]);

  useEffect(() => {
    setIsTagSearch(props.tagSearch);
  }, [props.tagSearch])

  useEffect(() => {
    search(searchTerm, isTagSearch);
  }, [props.filters])

  useEffect(() => {
    search(searchTerm, isTagSearch);
  }, [props.interests])

  const searchBarUpdate = (e: CustomEvent) => {
    const newTerm = (e.detail.value == undefined) ? "" : e.detail.value!.trim()
    setIsTagSearch(false);
    setSearchTerm(newTerm);
    setSocExpanded(false);
    search(newTerm);
  }

  const search = (searchTerm: string, tagSearch: boolean = false) => {
    if (tagSearch) {
      props.fetchTagEventCards(props.tagName, props.filters, refresherRef.current!, props.userToken);
    } else if (searchTerm == "") {
      props.fetchEventCards(props.filters, refresherRef.current!, props.userToken);
    } else {
      setSearchBatchNum(0);
      props.fetchSearchSocietyCards(searchTerm, refresherRef.current!, props.userToken)
      props.fetchSearchEventCards(searchTerm, props.filters, refresherRef.current!, props.userToken);
    }
  }

  const loadMoreEvents = (searchTerm: string) => {
    if (isTagSearch) {
      props.fetchMoreTagEventCards(props.tagName, props.filters,(searchBatchNum + 1) * EVENT_SEARCH_BATCH_SIZE, props.userToken)
    }
    if (searchTerm == "") {
      props.fetchMoreEventCards(props.filters, (searchBatchNum + 1) * EVENT_SEARCH_BATCH_SIZE, props.userToken);
    } else {
      props.fetchMoreSearchEventCards(searchTerm, props.filters, (searchBatchNum + 1) * EVENT_SEARCH_BATCH_SIZE, props.userToken);
    }
    setSearchBatchNum(searchBatchNum + 1);
  }

  const renderSocCard = (society: SocietyCard) => {
    return (
      <IonCol sizeXl="4" sizeMd="6" sizeXs="12" key={"societyCardCol-" + society.id}>
        <ExploreSocietyCard soc={society}/>
      </IonCol>
    )
  }

  if (!props.isLoggedIn && !props.isLoading) {
    return <Redirect to="/auth" />
  }

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Discover</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Discover</IonTitle>
        </IonToolbar>
      </IonHeader>  

      <IonRefresher ref={refresherRef} slot="fixed" onIonRefresh={() => search(searchTerm, isTagSearch)}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      
      <Container>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="11" sizeXs="10">
              <IonSearchbar ref={searchBar} onIonChange={searchBarUpdate} debounce={500} enterkeyhint="search" type="search"/>
            </IonCol>
            <IonCol sizeMd="1" sizeXs="2" className="btnCol">
              <IonButton onClick={() => setShowFilterModal(true)} fill="clear" className="filterBtn">
                <IonIcon icon={options}/>
              </IonButton>
            </IonCol>
          </IonRow>
          {isTagSearch &&
            <IonRow>
              <IonCol size="6">
                <h3>{`Events tagged with '${props.tagName}'`}</h3>
              </IonCol>
              <IonCol size="6">
                <IonButton onClick={() => {setIsTagSearch(false); search("")}} fill="clear" className="filterBtn">Clear tag search</IonButton>
              </IonCol>
            </IonRow>
          }
        </IonGrid>
        
        {(searchTerm !== "" && props.societies.length !== 0) &&
            <IonGrid>
              <IonRow>
                {(props.societies.length > MAX_SOCS_DISPLAY) && (!socExpanded) &&
                      props.societies.slice(0, MAX_SOCS_DISPLAY).map(renderSocCard)
                }
                {(props.societies.length > MAX_SOCS_DISPLAY) && (!socExpanded) &&
                  <IonCol sizeXl="4" sizeMd="6" sizeXs="12">
                    <IonButtons>
                      <IonButton onClick={() => setSocExpanded(true)}>
                        <IonIcon icon={add} />
                        Show more
                      </IonButton>

                    </IonButtons>
                  </IonCol>
                }
                {(props.societies.length < MAX_SOCS_DISPLAY || socExpanded) &&
                  props.societies.map(renderSocCard)}
              </IonRow>
            </IonGrid>
        }
        <Row>
            {props.events.length === 0 && 
              ((searchTerm === "" && !isTagSearch) ?
                [1,2,3,4,5,6].map(x =>
                  <Col key={"skeleton" + x.toString()} lg={4} md={6}>
                      <SkeletonTextEventCard />
                  </Col>
                ) :
                <Col>
                  <EmptySectionText 
                    mainText={`No events found for '${isTagSearch ? props.tagName : searchTerm.trim()}'`}
                    subText="Try searching for something else, or suggest the topic to a society!" />
                </Col>
              )
            }

            {props.events.length > 0  &&
              props.events.map((event) => 
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
            {props.events.length > 0 && props.moreResults &&
              <Col xs={12} className="resultsEnd">
                <IonButton onClick={e => {e.preventDefault(); loadMoreEvents(searchTerm)}}>Show more</IonButton>
              </Col>
            }
            {props.events.length > 0 && !props.moreResults &&
              <Col xs={12} className="resultsEnd">
                <EmptySectionText 
                  mainText={searchTerm === "" && !isTagSearch ?
                    "No more events found" :
                    `No more results for "${isTagSearch ? props.tagName : searchTerm}"`}
                  subText={searchTerm === "" && !isTagSearch ? "Try searching for more events later" : "Try searching for something else!"}
                />
              </Col>
            }
        </Row>
      </Container>
      
      <IonModal isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
        <SearchFilterModal showModalFunc={setShowFilterModal}/>
      </IonModal>
    </IonContent>
  </IonPage>
  );
}

export default connector(Discover);