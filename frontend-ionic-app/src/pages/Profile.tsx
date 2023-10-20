import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState} from 'react';
import UserImg from '../assets/TrassistIntro/userImg.png';
import "./Profile.css";
import { API_BASE_URL } from '../../enviornment'

interface UserData {
  name: string;
  mobileNumber: string;
  password: string;
  upiId: string;
  address: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    mobileNumber: '',
    password: '',
    upiId: '',
    address: ''
  });

  const storedUserDataString = localStorage.getItem('userData')
  const storedUserData = JSON.parse(storedUserDataString)
  const mobileNumber = storedUserData.mobileNumber

  useEffect(()=>{
    const fetchData = async () => {
      let url = new URL(`${API_BASE_URL}/user`);
      url.searchParams.append("mobileNumber", mobileNumber);
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await data.json();
      const user_data = res["data"]

      setUserData(user_data);
    } 
    
  fetchData()
  }, [])

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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <img src={UserImg} alt='UserImg' className='UserImg' />
      <p className='user-name'>{userData["name"]}</p> 
      <IonContent>
      <IonList className="ion-padding">
      <IonItem>
        <IonLabel slot="start">Mobile Number: </IonLabel>
        <p className='user-profile'>{userData["mobileNumber"]}</p>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">UPI ID: </IonLabel>
        <p className='user-profile'>{userData["upiId"]}</p>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Address: </IonLabel>
        <p className='user-profile'>{userData["address"]}</p>
      </IonItem>
    </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
