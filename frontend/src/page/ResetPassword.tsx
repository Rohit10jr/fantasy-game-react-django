import styles from "./ResetPassword.module.css"
import ResetPass from "../component/resetpass.tsx"
import Logo from "../component/logo.tsx";
import LoadingBg from "../component/loadingbg.tsx";


const Reset=()=>{
    return (
        <>
        <LoadingBg/>
        <Logo/>
        <ResetPass/>
        </>
    );
};

export default Reset;
