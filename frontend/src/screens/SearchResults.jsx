import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const SearchResults = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [minPrice, setMinPrice] = useState(queryParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(queryParams.get('maxPrice') || '');
  const [selectedCategories, setSelectedCategories] = useState(queryParams.get('categories')?.split(',') || []);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(search);
    setMinPrice(params.get('minPrice') || '');
    setMaxPrice(params.get('maxPrice') || '');
    setSelectedCategories(params.get('categories')?.split(',') || []);
  }, [search]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${selectedCategories.join(',')}`);
  };

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    minPrice,
    maxPrice,
    categories: selectedCategories,
    pageNumber,
  });

  return (
    <>
      <Meta />
      <h1>Search Results for "{keyword}"</h1>
      <Row>
        <Col md={3}>
          <h2>Filters</h2>
          <Form onSubmit={handleFilterSubmit}>
            <Form.Group controlId="minPrice">
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Enter min price"
              />
            </Form.Group>
            <Form.Group controlId="maxPrice">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Enter max price"
              />
            </Form.Group>
            <Form.Group controlId="categories">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={selectedCategories}
                onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
              >
                {/* Check if data.categories is defined before mapping */}
                {data?.categories &&
                  data.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply Filters
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error.message}</Message>
          ) : (
            <>
              <h1>Search Results</h1>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate pages={data.pages} page={pageNumber} keyword={keyword ? keyword : ''} />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SearchResults;