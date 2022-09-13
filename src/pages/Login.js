
import { useState } from "react"
import ModalComponent from "../components/modal/InputModal";

const Login = () => {
  const [show, setShow] = useState(true);
  
  const handleClose = () => setShow(true);


  return (
    <div className="Login" >
      
     
        <ModalComponent 
        handleClose={handleClose} 
         show={show} 
         modalTitle= "This is a Mock-up Login"
         modalDescription=" Write your User Name or email to Proceed"
         formInputName="userName"
         formInputType="text"
         formInputPlaceholder="e.g-Karen"
         formErrorMessage="Your  username should be atleast than 3 letters"
         buttonText="LogIn"   
         />

      </div>
    
  );
};

export default Login;
