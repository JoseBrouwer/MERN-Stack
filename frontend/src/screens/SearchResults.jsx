import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Dropdown, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Import axios for API requests
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product'; // Import Product component

const SearchResults = ({ history }) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/products?keyword=${keyword}&price=${price}&category=${category}`);
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword, price, category]);

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${keyword}${price ? `?price=${price}` : ''}${category ? `&category=${category}` : ''}`);
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="keyword"
          defaultValue={keyword}
          readOnly
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Dropdown className="mr-2">
          <Dropdown.Toggle variant="secondary" id="price-dropdown">
            Price Range
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setPrice('0-50')}>$0 - $50</Dropdown.Item>
            <Dropdown.Item onClick={() => setPrice('51-100')}>$51 - $100</Dropdown.Item>
            <Dropdown.Item onClick={() => setPrice('101-200')}>$101 - $200</Dropdown.Item>
            {/* Add more price ranges as needed */}
          </Dropdown.Menu>
        </Dropdown>
        {/* Add checkbox filters */}
        <Button type="submit" variant="primary" className="p-2 mx-2">
          Apply Filters
        </Button>
      </Form>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Search Results</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={products.pages} page={products.page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default SearchResults;
