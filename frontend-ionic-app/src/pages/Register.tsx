import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { arrowForwardCircle } from 'ionicons/icons';
import React from 'react';
import { useState } from 'react';
import { API_BASE_URL } from '../../enviornment'
import "./RegisterRate.css";

const Register: React.FC = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    password: '',
    upiId: '',
    address: ''
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const postFormData = async () => {
    const data = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const res = await data.json();
    return res;
  };

  const doRegister = async (event: any) => {
    event.preventDefault();
    await postFormData();
    router.goBack();
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput fill="outline"
                    labelPlacement="floating" 
                    placeholder="Enter your name.." 
                    value={formData.name}
                    onIonChange={handleChange}
                    name='name'
                    label="Name" >
                    </IonInput>

                    <IonInput fill="outline" 
                    labelPlacement="floating" 
                    placeholder="Enter your mobile number.."
                    label="Mobile Number" 
                    type="number" 
                    value={formData.mobileNumber}
                    onIonChange={handleChange}
                    name="mobileNumber"
                    className="ion-margin-top"></IonInput>

                    <IonInput className="ion-margin-top" 
                    fill="outline" 
                    labelPlacement="floating" 
                    label="Password" 
                    type="password" 
                    placeholder="Enter your password.."
                    value={formData.password}
                    onIonChange={handleChange}
                    name="password"
                    ></IonInput>

                    <IonInput fill="outline" 
                    labelPlacement="floating" 
                    placeholder="Enter your UPI ID" 
                    label="UPI ID" 
                    className="ion-margin-top"
                    value={formData.upiId}
                    onIonChange={handleChange}
                    name="upiId">
                    </IonInput>

                    <IonTextarea label="Address" 
                    fill="outline" 
                    labelPlacement="floating" 
                    placeholder="Enter your Address.." 
                    className="ion-margin-top"
                    value={formData.address}
                    onIonChange={handleChange}
                    name="address"
                    >
                    </IonTextarea>

                    <IonButton type="submit" expand="block" className="ion-margin-top">
                      Register
                      <IonIcon icon={arrowForwardCircle} slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
