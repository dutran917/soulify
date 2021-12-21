import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom"
import Landing from './component/Landing';
import Login from './component/Login';
import Home from './component/Home';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './component/routing/ProtectedRoute';
import Search from './component/Search';
function App() {
  
  return (
    <AuthContextProvider>
      <Router>
        {/* <Switch> */}
        <Route exact path ='/' component={Landing}></Route>
        <Route exact path ='/login' component={()=><Login auth={'login'}></Login>}></Route>
        <Route exact path ='/register' component={()=><Login auth={'register'}></Login>}></Route>
        <ProtectedRoute exact path = '/home' component={Home}/>
        <ProtectedRoute exact path = '/search' component={Home}/>
        <ProtectedRoute exact path = '/collection/playlist' component={Home}/>
        <ProtectedRoute exact path = '/create/playlist' component={Home}/>
        {/* </Switch> */}
      </Router>    
   </AuthContextProvider>
    
  );
}

export default App;

