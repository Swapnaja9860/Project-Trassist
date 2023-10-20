import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Profile from './Profile';
import History from './History';
import RateCard from './RateCard';
import Nlu from './Nlu';
import Simulation from './Simulation';

import { homeOutline, logOutOutline, newspaperOutline, bookOutline, receiptOutline, imageOutline, fileTrayFullOutline, trendingUpSharp, documentTextOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';
const Menu: React.FC = () => {
  const paths = [
    { name: 'Home', url: '/app/list', icon: homeOutline },
    { name: 'Profile', url: '/app/profile', icon: bookOutline },
    { name: 'History', url: '/app/history', icon: newspaperOutline },
    { name: 'Rate card', url: '/app/ratecard', icon: receiptOutline },
    { name: 'Stats', url: '/app/simulation', icon: imageOutline },
    { name: 'Trending', url: '/app/nlu', icon: trendingUpSharp }
  ];

  const logoutApp = () => {
    Preferences.remove({ key: INTRO_KEY });
  };
  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={'secondary'}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem detail={true} routerLink={item.url} routerDirection="none">
                  <IonIcon slot="start" icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonMenuToggle autoHide={false}>
              <IonButton onClick={logoutApp} expand="full" routerLink="/" routerDirection="root">
                <IonIcon slot="start" icon={logOutOutline} />
                Logout
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app/list" component={List} />
          <Route path="/app/profile" component={Profile} />
          <Route path="/app/history" component={History} />
          <Route path="/app/ratecard" component={RateCard} />
          <Route path="/app/simulation" component={Simulation} />
          <Route path="/app/nlu" component={Nlu} />
          <Route exact path="/app">
            <Redirect to="/app/list" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
