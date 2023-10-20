import {
    IonButton,
	IonCard,
	IonCol,
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonImg,
	IonRow,
	IonToast,
	useIonAlert,
    useIonLoading,
    useIonRouter,
    useIonToast
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { arrowForwardCircle, trash, cloudDoneOutline, paperPlaneOutline, add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { PhotoItem } from '../types/PhotoItem';
import { useHistory } from "react-router-dom";
import "./Introduction.css";

type Props = {
	photos: PhotoItem[];
	deletePhoto: (fileName: string) => void;
    setPhotosEmpty: () => void;
};

const PhotoGallery: React.FC<Props> = ({ photos, deletePhoto, setPhotosEmpty }) => {
    const [displayAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [category, setCategory] = useState<string[]>([]); 

    const history = useHistory();
    const router = useIonRouter();

    const confirmDelete = (fileName: string) =>
        displayAlert({
            message: 'Are you sure you want to delete this photo? ',
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                { text: 'OK', role: 'confirm' }
            ],
            onDidDismiss: (e) => {
                if (e.detail.role === 'cancel') return;
                deletePhoto(fileName);
            }
	});

    const processImage = async () => {
            await present('Please wait while AI is identifying your trash...');
            const formData = new FormData();
            for(let photo of photos){
                const response = await fetch(photo.webviewPath!);
                const blob = await response.blob();
    
                // Convert blob to File
                let file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })
                formData.append('image', file);
            }
          
            try {
              const response = await fetch('http://127.0.0.1:5000/image', {
                method: 'POST',
                body: formData
              })
          
            if(response.ok) {
                console.log('Images classified successfully');
                let res = await response.json();
                console.log("----------- response-------", res)
                console.log("----------- response data-------", res.data)
                setCategory(prevCategory => [res.data, ...prevCategory]);
                // setArray(oldArray => [newValue,...oldArray] );

                await dismiss();
                console.log("-----------category response-------", category)
                setPhotosEmpty();
                history.push('/confirmTrashPage', {res});
                
            } 
            } catch (error) {
              console.error('Error:', error);
            }
        }        

	return (<><IonGrid>
            <IonRow>
                {photos.map((photo, idx) => (
                    <IonCol size="6" key={idx}>
                        <IonCard>
                            <IonFab vertical="bottom" horizontal="center">
                                <IonFabButton
                                    onClick={() => confirmDelete(photo.filePath)}
                                    size="small"
                                    color="light"
                                >
                                    <IonIcon icon={trash} color="danger"></IonIcon>
                                </IonFabButton>
                            </IonFab>

                            <IonImg src={photo.webviewPath} className='selected-photo-css' />
                        </IonCard>
                    </IonCol>
                )) }
            </IonRow>
            </IonGrid>
           { photos.length > 0 && <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton onClick={processImage}>
                    <IonIcon icon={paperPlaneOutline}></IonIcon>
                </IonFabButton>
            </IonFab> }</>
	);
};

export default PhotoGallery;
