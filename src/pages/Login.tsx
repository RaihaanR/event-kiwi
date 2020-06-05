import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import './Login.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect, RouteComponentProps } from 'react-router';
import MicrosoftLogin from "react-microsoft-login";
import { logIn } from "../data/actions/userActions";
import { Container } from 'react-grid-system';

const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(
   mapStateToProps,
   { logIn }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type LoginProps = PropsFromRedux & RouteComponentProps<any>;

const Login: React.FC<LoginProps> = (props, state) => {

   if (props.loggedIn) {
      return <Redirect to="/events" />
   }

   const authHandler = (err: any, data: any) => {
      if (data) {
         let msToken = data.authResponseWithAccessToken.accessToken;
         props.logIn(msToken);
      } if (err) {
         console.error("Error:", err)
      }
   }

   return (
      <IonPage>
         <IonContent className="sk">
            <IonGrid className="centred">
               <IonRow>
                  <IonCol sizeLg="4" pushLg="4" sizeMd="8" pushMd="2">
                     <IonCard color="imperial">
                        <IonCardHeader>
                           <br />
                           <IonRow>
                              <IonCardTitle className="horizontalCentre">Imperial Events</IonCardTitle>
                           </IonRow>
                        </IonCardHeader>
                        <IonCardContent>
                           <IonRow>
                              <Container>
                                 <MicrosoftLogin
                                    className="horizontalCentre"
                                    clientId="2e0eaa17-56a7-48a7-9a41-1757cc5e120e"
                                    authCallback={authHandler} />

                              </Container>
                           </IonRow>
                        </IonCardContent>
                        <br />
                     </IonCard>
                  </IonCol>
               </IonRow>
            </IonGrid>
         </IonContent>
      </IonPage>
   );
}


export default connector(Login);