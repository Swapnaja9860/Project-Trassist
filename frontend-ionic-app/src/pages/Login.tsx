import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonLoading,
    useIonRouter,
    IonAlert
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
  import { logInOutline, personCircleOutline } from 'ionicons/icons';
  import Trassist from '../assets/TrassistIntro/trassist_4.jpg';
  import Intro from '../components/Introduction';
  import { Preferences } from '@capacitor/preferences';
  import { App } from '@capacitor/app';
  import {API_BASE_URL} from '../../enviornment'
  
  const INTRO_KEY = 'intro-seen';
  
  const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [loginData, setLoginData] = useState({
      mobileNumber: '',
      password: '',
    });

    const [present, dismiss] = useIonLoading();

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const checkStorage = async () => {
        const seen = await Preferences.get({ key: INTRO_KEY });
        setIntroSeen(seen.value === 'true');
      };
      checkStorage();
    }, []);

    const handleChange = (event: any) =>{
        const { name, value } = event.target;
        setLoginData({
          ...loginData,
          [name] : value,
        })
    }

    const loginAPI = async () => {
      await present('Logging in...');

      try {
        const data = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        console.log("------------data-----------", data)
        const res = await data.json();
        dismiss();
 
        //setMessage(res["message"])
        //setShowAlert(true)

        if (data.status === 200) {
          // Set loading to false after receiving the response
          const userData = {
            mobileNumber: loginData["mobileNumber"]
          };
          
          const userDataString = JSON.stringify(userData);
          localStorage.setItem('userData', userDataString);
          router.push('/app', 'root');
        } 

      } catch (error) {
        // Handle errors (optional)
        console.error("Error:", error);
    
        // Set loading to false in case of an error
        dismiss();
      }
    };
    
  
    const doLogin = async (event: any) => {
      event.preventDefault();
      console.log("------------login data----------", loginData)
      // await present('Logging in...');
      await loginAPI();
      // setTimeout(async () => {
      //   dismiss();
      //   router.push('/app', 'root');
      // }, 2000);
    };
  
    const finishIntro = async () => {
      setIntroSeen(true);
      Preferences.set({ key: INTRO_KEY, value: 'true' });
    };
  
    const seeIntroAgain = () => {
      setIntroSeen(false);
      Preferences.remove({ key: INTRO_KEY });
    };

    
    window.addEventListener('beforeunload', () => {
      Preferences.remove({ key: INTRO_KEY });
    });

    App.addListener('pause', () => {
      console.log('The app was paused');
      Preferences.remove({ key: INTRO_KEY });
    });
  
    return (
      <>
        {!introSeen ? (
          <Intro onFinish={finishIntro} />
        ) : (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Login Trassist</IonTitle>
              </IonToolbar>
            </IonHeader>

            
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header={'Alert'}
              message={message}
              buttons={['OK']}
            />
  
            <IonContent scrollY={false} className="ion-padding">
              <IonGrid fixed>
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    <div className="ion-text-center ion-padding">
                      <img src={Trassist} alt="Trassist Logo" width={'50%'} />
                    </div>
                  </IonCol>
                </IonRow>
  
                <IonRow class="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    <IonCard>
                      <IonCardContent>
                        <form onSubmit={doLogin}>
                          <IonInput mode="md" 
                          fill="outline" 
                          labelPlacement="floating"  
                          placeholder="1234567890" 
                          label="Mobile Number" 
                          type="number"
                          name="mobileNumber"
                          onIonChange={handleChange}
                          ></IonInput>

                          <IonInput mode="md" 
                          className="ion-margin-top" 
                          fill="outline" 
                          labelPlacement="floating" 
                          label="Password" 
                          type="password" 
                          placeholder="Password.."
                          name="password"
                          onIonChange={handleChange}
                          >
                          </IonInput>

                          <IonButton type="submit" expand="block" className="ion-margin-top">
                            Login
                            <IonIcon icon={logInOutline} slot="end" />
                          </IonButton>
                          <IonButton routerLink="/register" color={'secondary'} type="button" expand="block" className="ion-margin-top">
                            Create account
                            <IonIcon icon={personCircleOutline} slot="end" />
                          </IonButton>
  
                          <IonButton onClick={seeIntroAgain} fill="clear" size="small" color={'medium'} type="button" expand="block" className="ion-margin-top">
                            Watch intro again
                            <IonIcon icon={personCircleOutline} slot="end" />
                          </IonButton>
                        </form>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonPage>
        )}
      </>
    );
  };
  
  export default Login;
  