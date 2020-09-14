import React, { MouseEvent } from 'react';
import { IonChip, IonLabel, IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { removeProfileInterest, fetchTagEventCards } from '../../data/actions/actions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../data/reducers';
import { blankFilters } from '../../constants/types';
import { useHistory } from 'react-router';

interface OwnProps {
  interest: string,
}

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken
  }
}

export const connector = connect(mapStateToProps, { removeProfileInterest, fetchTagEventCards });

type PropsFromRedux = ConnectedProps<typeof connector>

type InterestChipProps = OwnProps & PropsFromRedux

const InterestChip: React.FC<InterestChipProps> = (props) => {

  const removeInterest = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    props.removeProfileInterest(props.interest, props.userToken)
  }
  
  const history = useHistory();

  return (
    <IonChip
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.fetchTagEventCards(props.interest, blankFilters, null, props.userToken);
        history.push('/discover')
      }}
    >
      <IonLabel>{props.interest}</IonLabel>
      <IonIcon icon={closeCircle} onClick={removeInterest}/>
    </IonChip>
  );
}


export default connector(InterestChip)