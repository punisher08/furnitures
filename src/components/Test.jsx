import { Routes, Route } from 'react-router-dom'
import SingleProduct from '../pages/SingleProduct';
import Header from '../layouts/Header';
export const Test = ({ inventory }) => {

  return (
    <Routes>
      <Header/>
      <Route path='/product/:id' element={<SingleProduct inventory={inventory}/>}/>
    </Routes>
  );
};

