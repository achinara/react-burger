import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/user-slice';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Profile from '../../pages/profile/profile';
import NotFound from '../../pages/not-found/not-found';
import AppHeader from '../app-header/app-header';
import Home from '../../pages/home/home';
import UserProfile from '../../pages/profile/user-profile/user-profile';
import UserOrders from '../../pages/profile/user-orders/user-orders';
import IngredientView from '../../pages/home/ingredient-view/ingredient-view';
import IngredientModal from '../../pages/home/ingredient-modal/ingredient-modal';
import { fetchIngredients } from '../../services/ingredients-slice';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  
  return (
    <main className={styles.main}>
      <AppHeader/>
      <div className={`${styles.content} pb-10`}>
        <Routes location={location.state?.backgroundLocation || location}>
          <Route index element={<Home/>}/>
          <Route path={'ingredient/:ingredientId'} element={<IngredientView/>}/>
          <Route path={'login'} element={<OnlyUnAuth component={<Login/>}/>}/>
          <Route path={'register'} element={<OnlyUnAuth component={<Register/>}/>}/>
          <Route path={'reset-password'} element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
          <Route path={'forgot-password'} element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
          <Route path={'profile'} element={<OnlyAuth component={<Profile/>}/>}>
            <Route index element={<UserProfile/>}/>
            <Route path={'orders'} element={<UserOrders/>}/>
          </Route>
          <Route path={'*'} element={<NotFound/>}/>
        </Routes>
      </div>
      {location.state?.backgroundLocation && (
        <Routes>
          <Route path={'ingredient/:ingredientId'} element={<IngredientModal/>}/>
        </Routes>
      )}
    </main>
  );
}

export default App;
