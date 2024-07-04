import React from 'react';
import {Outlet} from "react-router-dom";

type TProps = {
children?:React.ReactNode;
}
const AuthLayout = (props:TProps)=>{
    
return (
    <div className="auth">
        <Outlet/>
    </div>
)
}
export default AuthLayout;