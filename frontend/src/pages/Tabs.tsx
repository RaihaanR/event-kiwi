import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import React from "react";
import { Route, Redirect } from "react-router";
import Events from "./Events";
import Discover from "./Discover";
import Profile from "./Profile";
import { calendar, compass, person } from "ionicons/icons";
import EventsTabEventPage from "./EventsTabEventPage";
import DiscoverTabEventPage from "./DiscoverTabEventPage";
import StandaloneEventPage from "./StandaloneEventPage";
import EditEvent from "./EditEvent";
import Licences from "./Licences";
import ResourceManagement from "./ResourceManagement";

const Tabs: React.FC = () => (
   <IonTabs>
      <IonRouterOutlet>
         <Route path="/events" render={() => <Events />} exact={true} />
         <Route path="/events/add" component={EditEvent} exact />
         <Route path="/events/edit/:id" component={EditEvent} exact />
         <Route path="/discover" render={() => <Discover />} exact={true} />
         <Route path="/discover/event/:id" component={DiscoverTabEventPage} exact />
         <Route path="/events/event/:id" component={EventsTabEventPage} exact />
         <Route path="/event/:id" component={StandaloneEventPage} exact />
         <Route path="/profile" render={() => <Profile />} exact={true} />
         <Route path="/profile/licences" render={() => <Licences />} />
         <Route path="/profile/resources" render={() => <ResourceManagement />} exact={true} />
         <Route path="/" render={() => <Redirect to="/discover" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
         <IonTabButton tab="events" href="/events">
            <IonIcon icon={calendar} />
            <IonLabel>Events</IonLabel>
         </IonTabButton>
         <IonTabButton tab="discover" href="/discover">
            <IonIcon icon={compass} />
            <IonLabel>Discover</IonLabel>
         </IonTabButton>
         <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
         </IonTabButton>
      </IonTabBar>
   </IonTabs>
)


export default Tabs;