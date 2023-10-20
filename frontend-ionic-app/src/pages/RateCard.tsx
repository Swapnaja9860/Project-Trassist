import { IonBackButton, IonBadge, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import "./RegisterRate.css";

const RateCard: React.FC = () => {

  const [itemObj, setItems] = useState<{id: number; name: string, rateKg: string, price: number }[]>([{
    "id": 1,
    "name": "Plastic",
    "rateKg": "1kg",
    "price": 20
},{
    "id": 2,
    "name": "Paper",
    "rateKg": "1kg",
    "price": 10
},{
    "id": 3,
    "name": "E-Waste",
    "rateKg": "1kg",
    "price": 50
},{
    "id": 4,
    "name": "Metal",
    "rateKg": "1kg",
    "price": 40
},{
    "id": 5,
    "name": "Glass",
    "rateKg": "1kg",
    "price": 60
},{
    "id": 6,
    "name": "Textile",
    "rateKg": "1kg",
    "price": 55
},{
  "id": 7,
  "name": "Cardboard",
  "rateKg": "1kg",
  "price": 55
}]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/app/list" />
          </IonButtons>
          <IonTitle>RateCard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonCard>
        <IonCardContent>
            <IonList>
            {itemObj && itemObj.length > 0 && itemObj.map((item, index) => (
            <IonItem key={item.id}>
                  <IonLabel>{item.name}</IonLabel><IonBadge slot="end">{item.rateKg}</IonBadge><p>=</p><IonBadge slot="end" color="success">₹ {item.price}</IonBadge>
            </IonItem>
            ))}
            </IonList>
            <IonInfiniteScroll
                onIonInfinite={(ev) => {
                setTimeout(() => ev.target.complete(), 500);
                }}
            >
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RateCard;
