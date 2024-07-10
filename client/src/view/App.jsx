import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { AuthStatus } from './auth/AuthStatus';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './profile/Profile';
import ModifyExperiences from './profile/ModifyExperiences';
import AddJobAd from './jobAds/AddJobAd';
import Home from './home/Home';

function App() {
  return (
    <BrowserRouter>
      <AuthStatus/>
      <Layout>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/modify_exps" element={<ModifyExperiences></ModifyExperiences>}></Route>
          <Route path="/addJobAd" element={<AddJobAd></AddJobAd>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App