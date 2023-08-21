// 导入图片
const cat1 = require('../assets/images/cat1.jpg')

function Main(dom) {
    const main = document.createElement('div')
    const catImg = document.createElement('img')
    catImg.src = cat1
    main.appendChild(catImg)
    // main.innerText = 'main';
    dom.appendChild(main);
}
export default Main