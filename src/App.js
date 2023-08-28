import { BasicExample } from './component/react-router'
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";


export default function App() {
  return (
    <>
      <Router>
        <BasicExample />
      </Router>
    </>
  )
}
