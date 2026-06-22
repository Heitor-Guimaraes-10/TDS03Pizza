import React, {useState} from "react";

const ResetPasswordViewModel = () => {

    const [values, setValues] = useState({
        userEmailName: '',
        
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const resetPassword = () => {
        console.log(JSON.stringify(values));
    }
    return {
    ...values,
    onChange,
    resetPassword
    }    

    
}
    export default ResetPasswordViewModel;
     