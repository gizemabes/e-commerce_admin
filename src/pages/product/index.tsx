import ProductTable from './partial/ProductTable';
import React, { useState } from 'react';
import baseApi from '../../configs/baseApi';


const Product = ({ products }) => {
  // Ürünleri state olarak tut
  const [product, setProduct] = useState(products);


  return (
    <div>
      <ProductTable products={product} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  // Kullanıcı girişi kontrolü
  if (!context.req.headers.cookie || !context.req.headers.cookie.includes('token')) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Ürünleri getir ve props olarak gönderg
  const response = await baseApi.get('product');
  const products = response.data;

  return {
    props: { products },
  };
};


export default Product;
