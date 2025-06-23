function Step1({ onNextStep, cartItems }) {
  return (
    <div>
      <h1>Step 1</h1>
      <button onClick={onNextStep}>Next</button>
    </div>
  );
}

export default Step1;
