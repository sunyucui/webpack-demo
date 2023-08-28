import { productData } from './data';
import { useRouteMatch, Link, Route, useParams } from 'react-router-dom';

function Product() {
    const { productId } = useParams();
    console.log('useParams', useParams())
    const productItem = productData.find(item => item.id === Number(productId))
    let productDiv;
    if (productItem) {
        productDiv = (
            <div>
                <h5>{productItem.name}</h5>
                <p>{productItem.description}</p>
                <h5 className='welcomeText'>status:{productItem.status}</h5>
            </div>
        );
    } else {
        productDiv = (<h5 className='welcomeText'>Sorry. Product doesn't exist </h5>)
    }
    return (
        <div>
            {productDiv}
        </div>
    )
}

function Products({ match }) {
    // 接收Route的match对象
    // const productDatas = [...] 
    const { url, path } = useRouteMatch();
    console.log('useRouteMatch', useRouteMatch())
    const linkItem = productData.map((productItem) => {
        return (
            <li key={productItem.id}>
                <Link to={`${url}/${productItem.id}`}>{productItem.name}</Link>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h4>Products</h4>
                <ul>{linkItem}</ul>
            </div>
            <Route path={`${path}/:productId`}>
                <Product></Product>
            </Route>
            {/* /products 才会显示 */}
            <Route exact path={url}>
                <p>Please select a product.</p>
            </Route>
        </div>
    )
}
export { Products }