import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const SearchResults = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    minPrice,
    maxPrice,
    categories: selectedCategories,
    pageNumber,
  });

  useEffect(() => {
    setPageNumber(1); // Reset page number when keyword or filters change
  }, [keyword, minPrice, maxPrice, selectedCategories]);

  const handlePriceFilter = () => {
    let queryParams = `/search/${keyword}?`;
    if (minPrice) {
      queryParams += `minPrice=${minPrice}&`;
    }
    if (maxPrice) {
      queryParams += `maxPrice=${maxPrice}&`;
    }
    if (selectedCategories.length > 0) {
      queryParams += `categories=${selectedCategories.join(',')}&`;
    }
    // Remove the trailing '&' character if it exists
    queryParams = queryParams.replace(/&$/, '');
  
    navigate(queryParams);
  };
  

  const handleCategorySelect = (selected) => {
    setSelectedCategories(selected);
  };

  return (
    <>
      <Meta />
      <h1>Search Results for "{keyword}"</h1>
      <Row>
        <Col md={3}>
          <h2>Filters</h2>
          <div className="mb-3">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categories">Categories</label>
            <select
              id="categories"
              multiple
              value={selectedCategories}
              onChange={(e) =>
                handleCategorySelect(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className="form-control"
            >
              {/* Check if data.categories is defined before mapping */}
              {data?.categories &&
                data.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handlePriceFilter}>
            Apply Filters
          </button>
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
