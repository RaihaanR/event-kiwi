import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonModal } from '@ionic/react';
import './Profile.css';
import ItemSlider from '../components/ItemSlider';
import { SocietyBasic } from '../constants/types';
import ProfileSocietyIcon from '../components/Profile/ProfileSocietyIcon';
import { Container } from 'react-grid-system';
import InterestChip from '../components/InterestChip';
import { fetchProfileDetails } from '../data/actions/actions';
import { logOut } from '../data/actions/userActions';
import { RootState } from '../data/reducers';
import { connect } from 'react-redux';
import EmptySectionText from '../components/EmptySectionText';
import { Redirect } from 'react-router';
import { UserProfile } from '../data/types/dataInterfaces';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;


interface LinkStateProps {
  interests: string[],
  societies: SocietyBasic[],
  profile: UserProfile,
  isLoggedIn: boolean,
  isLoading: boolean,
  userToken: string
}

interface LinkDispatchProps {
  fetchProfileDetails: (token: string) => void
  logOut: (token: string) => void;
}

type ProfileProps = LinkStateProps & LinkDispatchProps

interface ProfileState {
  showSocietyModal: boolean,
  showInterestModal: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      showSocietyModal: false,
      showInterestModal: false
    }
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    // this.refresh();
  }

  refresh() {
    this.props.fetchProfileDetails(this.props.userToken)
  }


  async openUnionWebsite() {
    await Browser.open({ url: "https://www.imperialcollegeunion.org/" });
  }

  render() {

    if (!this.props.isLoggedIn && !this.props.isLoading) {
      return <Redirect to="/auth" />
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{this.props.profile ? this.props.profile.firstname : "Profile"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{this.props.profile ? this.props.profile.firstname : "Profile"}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Container className="profileContainer">

            <IonGrid>
              <IonRow>
                <IonCol className="sectionHeader" size="8">
                  <IonTitle className="profileTitle">My Societies</IonTitle>
                </IonCol>
                <IonCol size="4">
                  <IonButton className="profileBtn" color="transparent" onClick={() => this.setState({ showSocietyModal: true })}>Manage</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <div className="sectionContent">
                  {this.props.societies.length !== 0 ?
                    <ItemSlider width={130}>
                      {this.props.societies.map((soc) => (
                        <ProfileSocietyIcon name={soc.shortName} logo={soc.imgSrc} />
                      ))}
                    </ItemSlider> :
                    <EmptySectionText mainText="No followed societies" subText="Try following or joining some societies to see what is on!"/>

                  }
                </div>
              </IonRow>

              <IonRow>
                <IonCol className="sectionHeader" size="8">
                  <IonTitle className="profileTitle">My Interests</IonTitle>
                </IonCol>
                <IonCol size="4">
                  <IonButton className="profileBtn" color="transparent" onClick={() => this.setState({ showInterestModal: true })}>Manage</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <div className="sectionContent">
                  {this.props.interests.length !== 0 ?
                    <div className="interests">
                      {this.props.interests.map((interest) => (
                      <InterestChip interest={interest} removeBtn={true} />
                    ))}
                    </div> :
                    <EmptySectionText mainText="No followed interests" subText="Try adding some interests to find more of what you like!"/>
                  }
                </div>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="danger" onClick={() => this.props.logOut(this.props.userToken)}>Log out</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" onClick={this.openUnionWebsite}>My Union</IonButton>
                </IonCol>

              </IonRow>
            </IonGrid>

          </Container>

          <IonModal isOpen={this.state.showSocietyModal}>
            <p>This is the society modal</p>
            <IonButton onClick={() => this.setState({ showSocietyModal: false })}>Close modal</IonButton>
          </IonModal>
          <IonModal isOpen={this.state.showInterestModal}>
            <p>This is the interest modal</p>
            <IonButton onClick={() => this.setState({ showInterestModal: false })}>Close modal</IonButton>
          </IonModal>
          <IonButton onClick={this.refresh}>REFRESH</IonButton>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    interests: state.profileDetails.profileDetails.interests,
    societies: state.profileDetails.profileDetails.societies,
    profile: state.userDetails.profile,
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading,
    userToken: state.userDetails.userToken
  }
}



export default connect(
  mapStateToProps,
  { fetchProfileDetails, logOut }
)(Profile);