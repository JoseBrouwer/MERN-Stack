import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const HomeScreen = () => {
  const { data: products, isLoading, error} = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ): error ? (
      <div>{error?.data?.message || error.error}</div>) : 
      (<>
          <h1>Latest Products</h1>
          <Row>
              {products.map((product) => (
                  //Determines amount of items based on screen size
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
};

export default HomeScreen;