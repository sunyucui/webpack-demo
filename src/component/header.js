function Header(dom) {
    const header = document.createElement('div')
    header.innerText = 'header';
    header.className='headerText'
    dom.appendChild(header);
}
export default Header