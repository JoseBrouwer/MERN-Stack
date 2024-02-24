import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';

const HomeScreen = () => {
  const { pageNumber } = useParams();

  console.log(pageNumber);

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              //Determines amount of items based on screen size
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate 
            pages={data.pages} 
            page={data.page} 
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;