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
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonModal,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonLoading,
    IonAlert
} from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './ConfirmTrashPage.css';
import Thankyou from "../assets/TrassistIntro/thank-you.png";
import { useIonRouter } from '@ionic/react';
import { useLocation } from "react-router-dom";
import CategoryRates from '../data/CategoryRates.js';
import {API_BASE_URL} from '../../enviornment'

const ConfirmTrashPage: React.FC = () => {
    const router = useIonRouter();
    const [productLists, setProductLists] = useState<any>({
        name: "",
        weight: null
    })
    const ValidCategories = ["plastic", "e-waste", "paper", "metal", "glass", "textile", "cardboard"]
    const [present, dismiss] = useIonLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const location = useLocation();
    
    const category = location.state?.res.data;
    const [renderArrayItems, setRenderArrayItems] = useState<{id: number; name: string, weight: number}[]>([]);
    const [isOpenAlert, setIsOpenAlert] = useState(false);


    const [carbonFootprint, setCarbonFootprint] = useState(0);
    const [totalItemObjects, setTotalItemObjects] = useState<{id: number; name: string, weight: number}[]>(
        [{
            "id": 1,
            "name": "plastic",
            "weight": 0
        },{
            "id": 2,
            "name": "paper",
            "weight": 0
        },{
            "id": 3,
            "name": "e-waste",
            "weight": 0
        },{
            "id": 4,
            "name": "metal",
            "weight": 0
        },{
            "id": 5,
            "name": "glass",
            "weight": 0
        },{
            "id": 6,
            "name": "textile",
            "weight": 0
        },{
            "id":7,
            "name": "cardboard",
            "weight": 0
        }]
      );

      useEffect(() => {
        if (location.state && category) {
            let getFilteredItemData = totalItemObjects.filter((itemRes) => category.includes(itemRes.name));
            setRenderArrayItems(getFilteredItemData);
        }
      }, [location.state]);

      const AddProduct = () => {
        if(!ValidCategories.includes(productLists.name)){
            setIsOpenAlert(true);
        } else {
            if (productLists && productLists.name !== '' && (productLists.weight !== null || productLists.weight !== "")) {
                const existingItem = renderArrayItems.find(item => item.name.toLocaleLowerCase() === productLists.name.toLocaleLowerCase());
                if (existingItem) {
                    let itemIndex = renderArrayItems.findIndex((item => item.name.toLocaleLowerCase() === productLists.name.toLocaleLowerCase()));
                    renderArrayItems[itemIndex].weight = productLists.weight;
                    setTotalItemObjects(renderArrayItems);
                } else {
                    setRenderArrayItems([...renderArrayItems, productLists]);
                }
                // Reset productLists
                setProductLists({
                    name: "",
                    weight: ""
                });
            }
        }
    };

    function confrimDelete(id: number): void {
        let removeItems = renderArrayItems.filter((itemRes) => itemRes.id !== id);
        setRenderArrayItems(removeItems);
    }

    const changeProductList = (event: any) => {
        const keys = event.target.name;
        const values = keys === "weight" ? parseFloat(event.target.value) : event.target.value;
        setProductLists((prevState: any) => ({
            ...prevState,
            [keys]: values, "id": Math.random()
        }))
    }
    const calculateTotal = () => {
        setTotalPrice(0);
        const totalAmount = CategoryRates.reduce((acc, item) => {
            const weight = renderArrayItems.find(w => w.name === item.name)?.weight || 0;
            const amount = weight * item.price;
            return acc + amount;
        }, 0);
        setTotalPrice(totalAmount.toFixed(2));

        const totalCarbon = CategoryRates.reduce((acc, item) => {
            const weight = renderArrayItems.find(w => w.name === item.name)?.weight || 0;
            const amount = weight * item.carbon_footprint;
            return acc + amount;
        }, 0);
        setCarbonFootprint(totalCarbon.toFixed(2));
    };

    const postTransaction = async () => {
        const storedUserDataString = JSON.parse(localStorage.getItem('userData'))
        const mobileNumber = storedUserDataString.mobileNumber

        let url = new URL(`${API_BASE_URL}/transaction`);

        const transaction_data = {"category_weight": renderArrayItems,
        "totalAmount": totalPrice,
        "rewards": totalPrice / 10,
        "mobileNumber": mobileNumber}

        const data = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transaction_data),
        });
        const res = await data.json();
    }

    const submitData = async () => {
        calculateTotal();
        await present('Please wait...');
        await postTransaction();
        await dismiss();
        setIsOpen(true);
    }

    const changeProductChange = (event: any, index: any) => {
        const {name, value} = event.target;
        const list: any = [...renderArrayItems];
        list[index][name] = value;
        setTotalItemObjects(list);
    }
    const closeModal = () => {
        setIsOpen(false);
        setTotalPrice(0);
        router.push('/app/list');
    };
    const goToHomePage = () => {
        setIsOpen(false);
        setTotalPrice(0);
        router.push('/app/list');
    }

    const removeAlert = () => {
        setIsOpenAlert(false);
    }
    return (
        <>
         <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Confrim Trassist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonAlert
                isOpen={isOpenAlert}
                header="Not a valid category."
                subHeader="Please choose among these." 
                message="plastic, e-waste, paper, metal, glass, textile, cardboard"
                buttons={['OK']}
                onDidDismiss={() => removeAlert()}
            ></IonAlert>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle  className='title-list'>Please Confrim Trash List!</IonCardTitle>
                    <IonChip className='confirm-chip' color="danger">Plastic, E-Waste, Paper, Metal, Glass, Textile</IonChip>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                    {renderArrayItems && renderArrayItems.length > 0 ?
                        renderArrayItems.map((item, index) => (
                            <IonItem key={index}>
                                <IonLabel>{item.name}</IonLabel>
                                <input
                                className='weight_input'
                                type='number'
                                name="weight"
                                onChange={(event) => changeProductChange(event, index)}
                                placeholder="Weight"
                                value={item.weight}
                                />
                                <span className='span-kg'>kg</span>
                                <IonIcon color="danger" onClick={() => confrimDelete(item.id)} className='confrim-delete' icon={closeCircleOutline}></IonIcon>
                            </IonItem>
                            
                        ))
                        : null}
                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonGrid>
                <IonChip className='confrim-label' color="tertiary">If you don't find material in above list please add it.</IonChip>
                <IonRow>
                <IonCol>
                <IonInput aria-label="Add Product" name="name" onIonInput={() => changeProductList(event)} color="primary" placeholder="Product" value={productLists.name}></IonInput>
                </IonCol>
                <IonCol>
                <IonInput aria-label="Weight" type='number' onIonInput={() => changeProductList(event)} color="secondary" name="weight" placeholder="Weight" value={productLists.weight}></IonInput>
                </IonCol>
                <IonCol>
                <IonButton onClick={() => AddProduct()}>Add</IonButton>
                </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <p className='calculate-total'>Calculated Total Amount:</p><span className='calculate-total-price'>{totalPrice}</span>
                    </IonCol>
                    <IonCol>
                        <IonButton className='calculate-btn' onClick={() => calculateTotal()}>Estimate</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {carbonFootprint>0 && <p style={{color: 'green'}}>Congratulations! You have helped us in saving the enviornment by reducing <span style={{backgroundColor: 'yellow'}}>{carbonFootprint}</span> kg carbon footprint today.</p>}
            <IonButton onClick={() => submitData()} expand="block">Submit</IonButton>
            </IonContent>
            { isOpen &&
                <IonModal isOpen={isOpen}>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>Reward Points</IonTitle>
                    <IonButtons slot="end">
                      <IonButton onClick={() => closeModal()}>Close</IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                  <p className='confrim-reward'>Your trash pickup will be scheduled soon!</p>
                  <IonChip color='primary'>Reward points and Total amount may change after confirmation by the trash collector.</IonChip>
                  <IonCard>
                    <img alt="thank-you" src={Thankyou} />
                    <IonCardContent>
                    <table>
                        <tr>
                            <th>Reward Points</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>{totalPrice / 10}</td>
                            <td>{totalPrice}</td>
                        </tr>
                        </table>
                    </IonCardContent>
                    </IonCard>
                    <IonButton expand={'block'} onClick={()=> goToHomePage()}>Finish!!</IonButton>
                </IonContent>
              </IonModal>
            }
        </IonPage>
        </>
    );
};
export default ConfirmTrashPage;
