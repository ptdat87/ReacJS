import React, {useRef, useState} from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  setupIonicReact,
  IonAlert,
} from "@ionic/react";
import BimControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";



setupIonicReact();

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>(); 
  const [error, setError] = useState<string>();
  const [calUnits, setcalUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInputRef  = useRef<HTMLIonInputElement>(null);
  const heightInputRef  = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError('Please enter a valid (non-negatite) input number.');
      return;
    }

    const weightConversionFactor = calUnits === 'ftlbs' ? 2.2 : 1 ;
    const heightConversionFactor = calUnits === 'ftlbs' ? 3.28 : 1 ;
    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;
    const bmi = weight /(height * height);
    setCalculatedBmi(bmi);
    console.log(bmi)
  };
  
  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const clearError = () =>{
    setError(''); 
  }

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setcalUnits(selectedValue);
  };

  return(
    <React.Fragment>
    <IonAlert isOpen={!!error} message={error} buttons={[
      {text: 'Okay', handler: clearError }
    ]}/>
    <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Caculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
      <IonRow>
          <IonCol>
            <InputControl selectedValue={calUnits} onSelectValue={selectCalcUnitHandler}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Height ({calUnits==='mkg'?'meters':'feet'})</IonLabel>
              <IonInput type='number' ref={heightInputRef}> </IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Weight ({calUnits==='mkg'?'kg':'lbs'})</IonLabel>
              <IonInput type='number' ref={weightInputRef}> </IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
       
        <BimControls onCalculate={calculateBMI} onReset={resetInputs}/>
        {calculatedBmi && (<BmiResult result={calculatedBmi}/>)}
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>
  )
 
  };

export default App;
