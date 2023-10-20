import { useState, useEffect } from 'react';
import { isPlatform, useIonLoading } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo as CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { PhotoItem } from '../types/PhotoItem';

const PHOTOS_PREF_KEY = 'photos';

export const usePhotoGallery = () => {
    const [present, dismiss] = useIonLoading();
	const [photos, setPhotos] = useState<PhotoItem[]>([]);

    const takePhoto = async () => {
        try {
            console.log("takePhoto ===== ", photos, photos.length);
            if (photos && photos.length < 4) {
                const photo: CameraPhoto = await Camera.getPhoto({
                    resultType: CameraResultType.Uri,
                    source: CameraSource.Prompt,
                    quality: 100
                });
        
                const fileName = new Date().getTime() + '.jpeg';
                const savedFileImage = await savePhoto(photo, fileName);
        
                const newPhotos = [...photos, savedFileImage];
                setPhotos(newPhotos);
            }
        } catch (e) {
            return;
        }
    };

    const savePhoto = async (photo: CameraPhoto, fileName: string): Promise<PhotoItem> => {
        let base64Data: string;
    
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!
            });
            
            const savedFile = await Filesystem.writeFile({
                path: fileName,
                data: file.data,
                directory: Directory.Data
            });
            return {
                filePath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri)
            };
        } else {
            base64Data = await base64FromPath(photo.webPath!);
            const savedFile = await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Data
            });
        }
        return {
            filePath: fileName,
            webviewPath: photo.webPath
        };
    };
    
    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Preferences.get({ key: PHOTOS_PREF_KEY });
            const photosInPreferences: PhotoItem[] = value ? JSON.parse(value) : [];
    
            if (!isPlatform('hybrid')) {
                for (let photo of photosInPreferences) {
                    const file = await Filesystem.readFile({
                        path: photo.filePath,
                        directory: Directory.Data
                    });
                    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
            }
            setPhotos(photosInPreferences);
        };
    
        loadSaved();
    }, []);

    async function base64FromPath(path: string): Promise<string> {
        const response = await fetch(path);
        const blob = await response.blob();
    
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('method did not return a string');
                }
            };
    
            reader.readAsDataURL(blob);
        });
    }

    const deletePhoto = async (fileName: string) => {
        setPhotos(photos.filter((photo) => photo.filePath !== fileName));
        await Filesystem.deleteFile({
            path: fileName,
            directory: Directory.Data
        });
    };

    const setPhotosEmpty =() => {
        setPhotos([])
    };

	return {
		photos,
		takePhoto,
        setPhotosEmpty,
		deletePhoto
	};
};
