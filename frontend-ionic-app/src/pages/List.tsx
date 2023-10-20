import {
    IonAvatar,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonModal,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSkeletonText,
    IonSpinner,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonToast,
    useIonViewWillEnter,
    useIonLoading
} from '@ionic/react';
import CameraImg from '../assets/TrassistIntro/camera.png';
import React, { useEffect, useRef, useState } from 'react';
import './List.css';
import PhotoGallery from '../components/PhotoGallery';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { cameraSharp, receiptOutline, checkmarkOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import trassist from '../assets/TrassistIntro/trassist_3.png';

import CategoryRates from '../data/CategoryRates.js';

const List: React.FC = () => {
    const router = useIonRouter();
    const { photos, category, takePhoto, deletePhoto, setPhotosEmpty } = usePhotoGallery();
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [showAlert] = useIonAlert();
    const [showToast] = useIonToast();
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const page = useRef(null);
    const [showRateCardValue, setShowRateCardValue] = useState(false);
    const [activeSegment, setActiveSegment] = useState<any>('details');
    const [showSpinner, setShowSpinner] = useState(false);
    const [present, dismiss] = useIonLoading();

    const itemArr = CategoryRates

    const [items, setItems] = useState<{id: number; name: string, rateKg: string, price: number }[]>([]);

    // const generateItems = () => {
    //     const newItems = [];
    //     for (let i = 0; i < items.length; i++) {
    //       newItems.push();
    //     }
    //     setItems([...items, ...newItems]);
    //   };
    
    //   useEffect(() => {
    //     generateItems();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, []);

    const showRateCard = () => {
        setShowRateCardValue(true);
        setItems(itemArr);
    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonImg className='list-image'
                    src={trassist}
                    alt="trassist"
                    ></IonImg>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton fill="outline" expand="block" shape="round" className="ion-margin-top" onClick={showRateCard}>
                    <IonIcon slot="start" icon={receiptOutline}></IonIcon>
                    Click me to see today's rates!!
                </IonButton>
                <h2 className='tap-camera-head'>Click Photos of Trash</h2>
                {/* <p className='tap-camera'>Click pictures of the items using your phone camera.</p> */}
                <IonCard color="light">
                    <IonCardContent>
                        <IonItem onClick={takePhoto}>
                            <IonThumbnail slot="start">
                                {photos && photos.length < 4 ? <img alt="CameraImg" src={CameraImg} /> : <img alt="cameraSharp" src={cameraSharp} />}
                            </IonThumbnail>
                            {photos && photos.length < 4 ? <IonLabel className='camera-icon-label'>Tap the camera icon to begin.</IonLabel> : <IonLabel className='camera-icon-label'>Only allow 4 photos!</IonLabel>}
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <PhotoGallery photos={photos} deletePhoto={deletePhoto} setPhotosEmpty={setPhotosEmpty} />
                <IonContent>{category}</IonContent>
                <IonModal breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.7} ref={modal} isOpen={showRateCardValue} onIonModalDidDismiss={() => setShowRateCardValue(false)}>
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                        <IonToolbar color={'light'}>
                            <IonSegment value={activeSegment} onIonChange={(e) => setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value="details">Rate Details</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {activeSegment === 'details' && (
                            <IonCard>
                                <IonCardContent>
                                    <IonList>
                                    {items && items.length > 0 && items.map((item, index) => (
                                    <IonItem key={item.id}>
                                          <IonLabel>{item.name}</IonLabel><IonBadge slot="end">{item.rateKg}</IonBadge><p>=</p><IonBadge slot="end" color="success">{item.price} rs</IonBadge>
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
                        )}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default List;
