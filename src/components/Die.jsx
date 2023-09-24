import './die.css'
// import 'dice'

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "gray" : "white",

  }
  return(
    <>
      <div 
        className="die-container" 
        style={styles}
        onClick={props.holdDie}
      >
        <div className="die"><img src={`../../public/dice-${props.value}.png`} /></div>
      </div>
    </>
  )
}