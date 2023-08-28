const Header = require('./component/header.js');
const Main = require('./component/main.js');
const Footer = require('./component/footer.js')
const global = require('./assets/styles/global.css')
import {add as Add } from './component/math'


const dom = document.getElementById('root');

dom.innerHTML += 'tree shaking<br/> 1+2=  ';
dom.innerHTML += Add(1,2);




const btn = document.createElement('button');
btn.innerText = '点一下'
btn.className = 'pageBtn';
btn.addEventListener('click',() => {
    alert('you click!')
})
// dom.append(btn)

Header.default(dom);

Main.default(dom);

Footer.default(dom);

/**
 * 使用es6语法
 */

// 箭头函数
const add = (a, b) => a + b;

// Promise 对象
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(add(1, 2));
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(add(3, 4));
  }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(add(5, 6));
  }, 1000);
});

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values); // [3, 7, 11]
});

// 实例方法：Array.prototype.includes()
const arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // true

const root = document.getElementById('root');
root.innerHTML += add(1, 3);

