import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, 
  IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage,
  IonRouterOutlet, IonRow, IonTab, IonTabBar, IonTabButton, IonTabs, useIonLoading, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Simulation.css';
import { API_BASE_URL } from '../../enviornment'

const Nlu: React.FC = ({api_url} : any) => {
  const [images, setImages] = useState<string[]>([]);
  
  const [present, dismiss] = useIonLoading();

   useEffect(()=>{
    const handleExtract = async () => {
      const response = await fetch(`${API_BASE_URL}/trends`);
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
      dismiss();
      setImages(loadedImages);
      
    };
    present("Generating charts from Twitter trends...");
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
          <IonTitle>Trending</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
     
      {images.map((imageUrl, index) => (
        <IonRow className='image-row-css'>
          <IonCol>
          <IonImg
           key={index}
           src={imageUrl}
           alt={`Image ${index}`}
            ></IonImg>
          </IonCol>
        </IonRow>
      ))}
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Nlu;
