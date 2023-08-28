import React from "react";
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from "react-router-dom";
import { Category } from './category';
import { Products } from "./products";
import { Login } from './login';
import { PrivateRoute } from './privateRoute'

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);
const Admin = () => (
    <div>
        <h2>Welcome admin!</h2>
    </div>
);

function BasicExample() {
    let history = useHistory();
    console.log('useHistory: ', useHistory())
    function handleClick() {
        history.push('/home')
    }
    return (
        // router生成history对象

        <>
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    {/* 
                      link:to 传递给 Route: path 进行匹配
                    */}
                    <li>
                        <Link to="/admin">Admin area</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/categoryURL">Category</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
                <button type="button" onClick={handleClick}>Go Home</button>
            </nav>
            {/* 如果当前路径与 path 匹配就会渲染对应的组件 */}
            <Switch>
                <Route exact path="/home" component={Home}>
                </Route>
                {/* Route 生成Match对象 path存储在useRouteMath中的path */}
                <Route path="/categoryURL" component={Category}>
                    {/* <Category /> */}
                </Route>
                <Route path="/products">
                    <Products />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                {/* 自定义路由 uselocation会记录path*/}
                <PrivateRoute path="/admin" component={Admin} />
            </Switch>
        </>

    );
}
export { BasicExample }