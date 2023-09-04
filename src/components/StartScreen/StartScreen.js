import "./startScreen.css"
export default function StartScreen(props) {
  return (
    <section className="startScreen">
        <h1>Quizzical</h1>
        <p>The quiz app</p>
        <div className="btn-wrap">
            <button onClick={props.setStartScreen}>Start Quiz</button>
        </div>
    </section>
  );
}
