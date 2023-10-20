import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './History.css';
import { API_BASE_URL } from '../../enviornment'

interface HistoryData {
  id: number; date: string, weight: number, reward_points: number, amount: number
}


const History: React.FC = () => {
  // const [totalItems, setTotalItems] = useState<HistoryData[]>([{
  //   id: 1,
  //   date: "10-08-2023", 
  //   weight: 10, 
  //   reward_points: 35, 
  //   amount: 350
  // },{
  //   id: 2,
  //   date: "11-10-2023", 
  //   weight: 8, 
  //   reward_points: 19, 
  //   amount: 190
  // },{
  //   id: 3,
  //   date: "14-10-2023", 
  //   weight: 2, 
  //   reward_points: 15,
  //   amount: 155
  // }]);

  const [totalItems, setTotalItems] = useState<HistoryData[]>([]);

  const storedUserDataString = localStorage.getItem('userData')
  const storedUserData = JSON.parse(storedUserDataString)
  const mobileNumber = storedUserData.mobileNumber
  console.log("-------mobileNumber--------", mobileNumber)

  useEffect(()=>{
    const fetchData = async () => {
      let url = new URL(`${API_BASE_URL}/transaction`);
      url.searchParams.append("mobileNumber", mobileNumber);
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await data.json();
      const transaction_data = res["data"]

      setTotalItems(transaction_data);
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
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className='table-div'>
        <table>
            <thead>
                <tr className='history-tr'>
                <th className='history-th'>Date</th>
                <th className='history-weight-th'>Weight (kg)</th>
                <th className='history-th'>Reward Points</th>
                <th className='history-th'>Amount</th>
                </tr>
            </thead>
        </table>
      </div>
        {totalItems && totalItems.length > 0 ? totalItems.map((item, index) => (
              <div className="boxcontainer" key={item.id}>
              <div className="box-1">
              <p className='box-p'>{item.date}</p>
              </div>
              <div className="box-2">
                <p className='box-p'>{item.weight}</p>
              </div>
              <div className="box-3">
              <p className='box-p'>{item.reward_points}</p>
              </div>
              <div className="box-4">
              <p className='box-p'>₹{item.amount}</p>
              </div>
            </div>
      )) : "" }
      </IonContent>
    </IonPage>
  );
};

export default History;
