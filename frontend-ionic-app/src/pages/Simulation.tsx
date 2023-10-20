import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, 
  IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage,
  IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Simulation.css';
import Pie from '../assets/TrassistIntro/pie_user.png';
import Scatter from '../assets/TrassistIntro/scatter_user.png';
import { API_BASE_URL } from '../../enviornment'

const Simulation: React.FC = ({api_url} : any) => {
  const [images, setImages] = useState<string[]>([]);
  
   useEffect(()=>{
    const handleExtract = async () => {
      const response = await fetch(`${API_BASE_URL}/user_charts`);
      const arrayBuffer = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
  
      const extractedImages: Promise<string>[] = [];
  
      zip.forEach(async (relativePath, zipEntry) => {
        const imageUrlPromise = (async () => {
          const blob = await zipEntry.async('blob');
          return URL.createObjectURL(blob);
        })();
        extractedImages.push(imageUrlPromise);
      });
  
      const loadedImages = await Promise.all(extractedImages);
      //setImages(loadedImages);
    };
    handleExtract()
   }, [])
  

  return (<IonPage>
      <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/app/list" />
          </IonButtons>
          <IonTitle>Stats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
      {/* {images.map((imageUrl, index) => (
        <IonRow className='image-row-css'>
          <IonCol>
          <IonImg
           key={index}
           src={imageUrl}
           alt={`Image ${index}`}
            ></IonImg>
          </IonCol>
        </IonRow>
      ))} */}
      <IonRow className='image-row-css'>
          <IonCol>
          <IonImg
           src={Pie}
           alt={`Pie Image`}
            ></IonImg>
          </IonCol>
        </IonRow>
      <IonRow className='image-row-css'>
          <IonCol>
          <IonImg
           src={Scatter}
           alt={`Scatter Image`}
            ></IonImg>
          </IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Simulation;
