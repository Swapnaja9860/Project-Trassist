import { IonButton, IonContent, IonHeader, IonPage, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import Intro1 from '../assets/TrassistIntro/Page1_pick-up.jpg';
import Intro2 from '../assets/TrassistIntro/Page2_segregate.jpg';
import Intro3 from '../assets/TrassistIntro/Page3_rewards.jpg';
import Intro4 from '../assets/TrassistIntro/Page4_trash_analysis.jpg';
import Intro5 from '../assets/TrassistIntro/Page5_save_env.jpg';
import './Introduction.css';
import trassist from '../assets/TrassistIntro/trassist_3.png';

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper>
      <SwiperSlide>
        <h2 className='intro-welcome'>Welcome To </h2>
        {/* <h2 className='intro-ai'>Trassist- AI Driven Trash Assistent</h2> */}
        <IonThumbnail className='into-thumnail'>
          <img className='intro-thumnail-img' alt="Silhouette of mountains" src={trassist} />
        </IonThumbnail>
        <img src={Intro1} alt="intro_1" />
        <IonText>
          <h2 className='intro-txt'>Schedule a Pick-up!</h2>
          <p className='intro-desc'>Open-up a request to pick-up trash from your doorstep.</p>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <h2 className='intro-welcome'>Welcome To </h2>
        {/* <h2 className='intro-ai'>Trassist- AI Driven Trash Assistent</h2> */}
        <IonThumbnail className='into-thumnail'>
          <img className='intro-thumnail-img' alt="Silhouette of mountains" src={trassist} />
        </IonThumbnail>
        <img src={Intro2} alt="intro_2" />
        <IonText>
          <h2 className='intro-txt'>Segregate and Handover</h2>
          <p className='intro-desc'>Segregate your trash and hand it over to the executive. He will weigh it and collect it.</p>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <h2 className='intro-welcome'>Welcome To </h2>
        {/* <h2 className='intro-ai'>Trassist- AI Driven Trash Assistent</h2> */}
        <IonThumbnail className='into-thumnail'>
          <img className='intro-thumnail-img' alt="Silhouette of mountains" src={trassist} />
        </IonThumbnail>
        <img src={Intro3} alt="intro_2" />
        <IonText>
          <h2 className='intro-txt'>Collect Rewads!</h2>
          <p className='intro-desc'>Once weighed and verified, the relevant amount will be transferred to your account or donated to an NGO as per your preferences.</p>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <h2 className='intro-welcome'>Welcome To </h2>
        {/* <h2 className='intro-ai'>Trassist- AI Driven Trash Assistent</h2> */}
        <IonThumbnail className='into-thumnail'>
          <img className='intro-thumnail-img' alt="Silhouette of mountains" src={trassist} />
        </IonThumbnail>
        <img src={Intro4} alt="intro_3" />
        <IonText>
          <h2 className='intro-txt'>Trash Analysis!</h2>
          <p className='intro-desc'>Check out the visualization showing waste analysis from around the world! Also learn how Trassist helps reduce waste going to landfill!</p>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <h2 className='intro-welcome'>Welcome To </h2>
        {/* <h2 className='intro-ai'>Trassist- AI Driven Trash Assistent</h2> */}
        <IonThumbnail className='into-thumnail'>
          <img className='intro-thumnail-img' alt="Silhouette of mountains" src={trassist} />
        </IonThumbnail>
        <img src={Intro5} alt="intro_4" />
        <IonText>
          <h2 className='intro-txt'>Save the environment!</h2>
          <p className='intro-desc'>Thank you for your dedication to making the world a better place by responsibly disposing of waste!</p>
        </IonText>
        <IonButton onClick={() => onFinish()}>Finish</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
