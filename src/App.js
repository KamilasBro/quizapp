import React, {useState} from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import QuizScreen from "./components/QuizScreen/QuizScreen";
import blob1 from "./images/blob1.png"
import blob2 from "./images/blob2.png"
import blob3 from "./images/blob3.png"
export default function App() {
  const [startScreen, setStartScreen]=useState(true)
  return (
    <main>
      <img className="blob1" src={blob1} alt="blob1"/>
      {startScreen===true
      ?
        <>
        <img className="blob2" src={blob2} alt="blob2"/>
        <StartScreen setStartScreen={()=>setStartScreen(prevState=>!prevState)}/>
        </>
      :
      <>
        <img className="blob3" src={blob3} alt="blob3"/>
        <QuizScreen/>
      </>
      }
    </main>
  );
}
