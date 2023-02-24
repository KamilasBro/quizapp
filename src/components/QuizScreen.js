import React, {useState, useEffect} from "react";
import specialSymbols from "../data/specialSymbols";

export default function QuizScreen() {
  const [data, setData]=useState([])//for API data
  const [isFetched, setIsFetched]=useState(false)//to determine when to load component
  const [randomPosition, setRandomPosition]=useState()//to randomize positions of buttons (temp solution)
  const [correctAnswers, setCorrectAnswers]=useState()//to check if user choices are correct
  const [answers, setAnswers]=useState()//to gather user choices
  const [allChosen, setAllChosen]=useState()//to check if user clicked button for each question
  const [count, setCount]=useState()//correct answers counter
  const [checkAnsw, setCheckAnsw]=useState(false)//to determine when play again button should appear
  const [playAgain, setPlayAgain]=useState(0)//counter that every state change resets the quiz
  //setting values for each render
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response=>response.json())
    .then(data=>{
      setCount(0)
      setData(data)
      setAnswers([])
      setRandomPosition([
        Math.floor(Math.random() * 4) + 1,
        Math.floor(Math.random() * 4) + 1,
        Math.floor(Math.random() * 4) + 1,
        Math.floor(Math.random() * 4) + 1,
        Math.floor(Math.random() * 4) + 1,
      ])
      setAllChosen(false)
      setCorrectAnswers(data.results.map(e=>{
        return(e.correct_answer)
      }))
      setIsFetched(true)
    })
  },[playAgain])
  //getting event properties
  function handleClick(event){
    //if answers are checked this prevent interacting with buttons
    if(checkAnsw===false){
      
    //getting index of buttons without making id's or other props xddd
    let currentIndex=event.target.className
    currentIndex=currentIndex.replace("btn","")

    //getting answer from pressed button and saves it in state
    setAnswers(prevState=>{
      prevState[currentIndex]= event.target.value
      return(prevState)
  })
    //checks if all buttons were clicked
    setAllChosen(()=>{
      for ( let i=0; i<(data.results).length; i++ ) {
        if (typeof answers[i] != "string")
            return false;
      };
      return true;
    })
        //resets every button with current index
        document.querySelectorAll(`.${event.target.className}`).forEach(e=>{
          e.style.backgroundColor="transparent";
          e.style.border="0.9px solid #4D5B9E";
        })
        //changing style on click
        event.target.style.backgroundColor="#D6DBF5"
        event.target.style.borderColor="transparent"
    }
  }

  // console.log(data.results)


  //the api data returns coded symbols inside strings so (temp solution)
  //we importing specialSymbols from data folder
  //then we search for symbol and check if its inside the string
  // if it is we replace that with decoded symbol and returns string
  function replacer(e){
    specialSymbols().forEach(ele=>{
      while(e.includes(ele.entityName)===true){
        e=e.replace(ele.entityName, ele.char)
      }
    })
    return e;
  }
  return(
    <section className="quizScreen">
      
      {isFetched&&data.results.map((e,index)=>{
        return(
          <div key={index} className={"questionDiv"}>
            <h1>{replacer(e.question)}</h1>
            {randomPosition[index]===1?
            <div>
              <button
                style={checkAnsw===true?
                  {backgroundColor: "#94D7A2", 
                  borderColor: "transparent", 
                  opacity: "1"
                }
                :{}}
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.correct_answer}
              >
                {replacer(e.correct_answer)}
              </button>
              <button
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.incorrect_answers[0]}
              >
                {replacer(e.incorrect_answers[0])}
              </button>
              <button
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.incorrect_answers[1]}
              >
                {replacer(e.incorrect_answers[1])}
              </button>
              <button
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.incorrect_answers[2]}
              >
                {replacer(e.incorrect_answers[2])}
              </button>
            </div>
            :randomPosition[index]===2?
            <div>
              <button
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.incorrect_answers[0]}
              >
                {replacer(e.incorrect_answers[0])}
              </button>
              <button
                style={checkAnsw===true?
                  {backgroundColor: "#94D7A2", 
                  borderColor: "transparent", 
                  opacity: "1"
                }
                :{}}
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.correct_answer}
              >
                {replacer(e.correct_answer)}
              </button>
              <button
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.incorrect_answers[1]}
              >
                {replacer(e.incorrect_answers[1])}
              </button>
              <button
                className={"btn"+index}
                onClick={(event)=>handleClick(event)}
                value={e.incorrect_answers[2]}
              >
                {replacer(e.incorrect_answers[2])}
              </button>
            </div>
            :randomPosition[index]===3?
            <div>
            <button
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.incorrect_answers[0]}
            >
              {replacer(e.incorrect_answers[0])}
            </button>
            <button
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.incorrect_answers[1]}
            >
              {replacer(e.incorrect_answers[1])}
            </button>
            <button
              style={checkAnsw===true?
                {backgroundColor: "#94D7A2", 
                borderColor: "transparent", 
                opacity: "1"
              }
              :{}}
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.correct_answer}
            >
              {replacer(e.correct_answer)}
            </button>
            <button
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.incorrect_answers[2]}
            >
              {replacer(e.incorrect_answers[2])}
            </button>
          </div>
            :
            <div>
            <button
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.incorrect_answers[0]}
            >
              {replacer(e.incorrect_answers[0])}
            </button>
            <button
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.incorrect_answers[1]}
            >
              {replacer(e.incorrect_answers[1])}
            </button>
            <button
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.incorrect_answers[2]}
            >
              {replacer(e.incorrect_answers[2])}
            </button>
            <button
              style={checkAnsw===true?
                {backgroundColor: "#94D7A2", 
                borderColor: "transparent", 
                opacity: "1"
              }
              :{}}
              className={"btn"+index}
              onClick={(event)=>handleClick(event)}
              value={e.correct_answer}
            >
              {replacer(e.correct_answer)}
            </button>
          </div>
            }
            <hr/>
          </div>
        )
      })}
      {isFetched&&
      <div className="btn-wrap2">
        {checkAnsw===false
      ?
        <button onClick={()=>{
          if(allChosen===true){
            //calculating correct answers
            for(let i=0;i<(data.results).length;i++){
              if(correctAnswers[i]===answers[i]){
                setCount(prevState=>prevState+1)
              }
              //reseting each button
              //in each button that contains a correct answer
              //is a style property that changes when this button works
              document.querySelectorAll(`.btn${i}`).forEach(e=>{
                if(e.style.backgroundColor==="rgb(214, 219, 245)"){
                  e.style.backgroundColor="#F8BCBC";
                }else{
                  e.style.backgroundColor="transparent";
                }
                e.style.border="0.9px solid #4D5B9E";
                e.style.opacity="0.5"
              })
            }
            setCheckAnsw(true)
          }
        }
        }>Check Answers</button>
      :
      <>
        <p>You scored {count}/{(data.results).length} correct answers</p>
        <button
          className="playAgain"
          onClick={()=>{
            setPlayAgain(prevState=>prevState+1)
            setCheckAnsw(false)
            setIsFetched(false)
          }} 
        >
          Play Again
        </button>
      </>
      }
      </div>}
    </section>
  );
}
