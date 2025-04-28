import React from 'react';
import { Route, Routes} from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct.jsx';
import ListProduct from '../../Components/ListProduct/ListProduct.jsx'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import './Admin.css';

const  Admin = ()=> {
  return (
    <div className='admin'>

      <Sidebar />
    <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listProduct" element={<ListProduct />} />
    </Routes>
    </div>
  )
}

export default Admin;
