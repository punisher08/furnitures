import { Routes, Route } from 'react-router-dom'
import SingleProduct from '../pages/SingleProduct';
export const Test = ({ inventory }) => {

  return (
    <Routes>
      <Route path='/product/:id' element={<SingleProduct inventory={inventory}/>}/>
    </Routes>
  );
};

