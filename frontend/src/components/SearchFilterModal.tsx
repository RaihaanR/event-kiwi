import React, { useState, useEffect, MouseEvent } from 'react';
import { IonContent, IonCheckbox, IonList, IonItem, IonLabel, IonItemDivider, IonIcon, IonDatetime, IonButton } from '@ionic/react';
import { calendar } from 'ionicons/icons';
import { format, parseISO, isPast } from 'date-fns';
import { UNIX_EPOCH } from '../constants/constants';
import { updateSearchFilters } from '../data/actions/searchActions'
import './SearchFilterModal.css'
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../data/reducers';

interface OwnProps {
  showModalFunc: (state: boolean) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    filters: state.searchFilters
  }
}

const connector = connect(mapStateToProps, { updateSearchFilters });

type PropsFromRedux = ConnectedProps<typeof connector>
type SearchFilterModalProps = OwnProps & PropsFromRedux

const SearchFilterModal: React.FC<SearchFilterModalProps> = ({ filters, updateSearchFilters, showModalFunc }) => {
  const currDatetime = new Date(Date.now())
  const [pastEvents, setPastEvents] = useState(filters.includePast);
  const [useStart, setUseStart] = useState(filters.useStart);
  const [useEnd, setUseEnd] = useState(filters.useEnd);
  const [startDatetime, setStartDatetime] = useState(filters.start);
  const [endDatetime, setEndDatetime] = useState(filters.end);

  useEffect(() => {
    if (useEnd && isPast(endDatetime)) {
      setPastEvents(true);
    }
  }, [endDatetime]);

  const applyFilters = (e: MouseEvent) => {
    e.preventDefault();

    updateSearchFilters({
      includePast: pastEvents,
      useStart: useStart,
      start: startDatetime,
      useEnd: useEnd,
      end: endDatetime
    });

    showModalFunc(false);
  }

  return (
    <>
      <IonContent>
        <div className="modalContainer">
          <h3 className="subtitle">Search Filters</h3>
          <IonList>
            <IonItem>
              <IonLabel>Include Past Events:</IonLabel>
              <IonCheckbox slot="end" checked={pastEvents} onIonChange={e => setPastEvents(e.detail.checked)} />
            </IonItem>
            <IonItem>
              <IonLabel>Use Start Date:</IonLabel>
              <IonCheckbox slot="end" checked={useStart} onIonChange={e => setUseStart(e.detail.checked)}/>
            </IonItem>
            <IonItem disabled={!useStart}>
              <IonIcon icon={calendar} slot="start" />
              <IonDatetime
                value={startDatetime.toISOString()}
                displayFormat="DDDD D MMM YYYY h:mm A"
                pickerFormat="D MMMM YYYY H mm"
                min={format(UNIX_EPOCH, "yyyy-MM-dd'T'HH:mm:ss")}
                max={(currDatetime.getFullYear() + 3).toString()}
                onIonChange={e => setStartDatetime(parseISO(e.detail.value!))}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Use End Date:</IonLabel>
              <IonCheckbox slot="end" checked={useEnd} onIonChange={e => setUseEnd(e.detail.checked)}/>
            </IonItem>
            <IonItem disabled={!useEnd}>
              <IonIcon icon={calendar} slot="start" />
              <IonDatetime 
                value={endDatetime.toISOString()}
                displayFormat="DDDD D MMM YYYY h:mm A"
                pickerFormat="D MMMM YYYY H mm"
                min={format(UNIX_EPOCH, "yyyy-MM-dd'T'HH:mm:ss")}
                max={(currDatetime.getFullYear() + 3).toString()}
                onIonChange={e => setEndDatetime(parseISO(e.detail.value!))}
                />
            </IonItem>
          </IonList>

        </div>
      </IonContent>
      <IonButton onClick={applyFilters} expand="block" className="applyBtn">Apply</IonButton>
    </>
  );
}

export default connector(SearchFilterModal);
