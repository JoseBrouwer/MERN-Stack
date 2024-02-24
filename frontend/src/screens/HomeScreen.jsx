import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  console.log(pageNumber);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      { !keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-warning mb-4">
          Go Back
        </Link>
      )}
      
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
              keyword={keyword ? keyword : ''}
            />
        </>
      )}
    </>
  );
};

export default HomeScreen;