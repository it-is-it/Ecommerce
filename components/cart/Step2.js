function Step2({ onPreviousStep, onNextStep, cartItems }) {
  return (
    <div>
      <h1>Step 2</h1>
      <button onClick={onPreviousStep}>Previous</button>
      <button onClick={onNextStep}>Next</button>
    </div>
  );
}

export default Step2;
