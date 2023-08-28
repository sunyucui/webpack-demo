import {Route, Link, useParams, useRouteMatch} from 'react-router-dom'


function CategoryItem() {
    // 取到动态变量name的值 做显示
    const { itemName } = useParams()
    console.log("useParams: ")
    console.log(useParams())
    return (
        <div>
            <h4>{itemName}</h4>
        </div>
    )
}
function Category() {
    const { url, path } = useRouteMatch()
    console.log("useRouteMatch: ")
    console.log(useRouteMatch())
    return (
        <div>
            <h5 className='h5Title'>动态路由demo</h5>
            <ul>
                {/* Link:to=url/name 传递给path去做匹配 */}
                <li>
                    <Link to={`${url}/shoes`}>Shoes</Link>
                </li>
                <li>
                    <Link to={`${url}/boot`}>Boots</Link>
                </li>
                <li>
                    <Link to={`${url}/footwear`}>Footwear</Link>
                </li>
            </ul>
            {/* 匹配过程中/后面的存到动态变量name中 传递给子组件 */}
            <Route path={`${path}/:itemName`}>
                <CategoryItem></CategoryItem>
            </Route>
        </div>
    )
}
export {Category}