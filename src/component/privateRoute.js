import {useLocation, Route,Redirect} from 'react-router-dom'
import { fakeAuth } from './data';

/**
 * 自定义路由
 * @param {} param0 
 * Component 符合条件后要渲染的组件
 * @returns 
 */
function PrivateRoute({component:Component, ...rest}) {
    const location = useLocation()
    // 当前的位置信息
    console.log('useLocation: ',useLocation());

    return (
        <Route {...rest}>
            {fakeAuth.isAuthenticated === true ? 
            (<Component></Component>) : 
            (<Redirect to={{pathname: '/login',state: {from: location}}}></Redirect>)}
            {/* 没有登录 重定向到匹配路径/login 
            Redirect to 生成一个useLocation对象, 重定向到/login,并且在useLocation.state中记录从哪（/admin）重定向的, 记录到from中
            */}
        </Route>
    )
}
export {PrivateRoute}