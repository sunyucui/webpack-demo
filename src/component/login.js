import { fakeAuth } from "./data";
import {useLocation,Redirect} from 'react-router-dom';
import {useState} from 'react'

function Login(){
    // 重定向的来源 /admin
    const {state} = useLocation();
    console.log('useLocation',useLocation());
    // 从state中取出来源from, 没有的话默认为/
    const {from} = state || {from: {pathname:'/'}} //???
    // 记录登录状态是否改变
    const [redirectToReferrer, setRedirectToRefferrer] = useState(false);

    // 点击按钮改变
    const login = () => {
        // 修改登录状态 并修改重定向的指向
        fakeAuth.authenticated(() => {
            setRedirectToRefferrer(true);
        })
    }
    // 状态改变 跳转回原地址
    if(redirectToReferrer) {
        return <Redirect to={from}></Redirect>
    }
    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Login in</button>
        </div>
    )

}
export {Login}