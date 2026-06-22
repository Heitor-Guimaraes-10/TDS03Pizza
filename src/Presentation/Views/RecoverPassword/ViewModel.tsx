import React, {useState} from "react";

const RecoverPasswordViewModel = () => {

    const [values, setValues] = useState({
        userEmailName: '',
        userToken:'',
        userPassword:'', 
        userConfirmPassword:'', 
        recoverPassword:'', 
        
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const recoverPassword = () => {
        console.log(JSON.stringify(values));
    }
    return {
    ...values,
    onChange,
    recoverPassword
    }    

    
}
    export default RecoverPasswordViewModel;
     