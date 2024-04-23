// SaveForLaterScreen.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup, Image, Button, Row, Col, Card } from "react-bootstrap";
import Message from "../components/Message";
import { removeFromSaveForLater, moveToCart } from "../slices/laterSlice";

const SaveForLaterScreen = () => {
  const dispatch = useDispatch();
  const { savedItems } = useSelector((state) => state.later);

  const removeFromLaterHandler = (id) => {
    dispatch(removeFromSaveForLater(id));
  };

  const moveToCartHandler = (item) => {
    dispatch(moveToCart(item));
    dispatch(removeFromSaveForLater(item._id));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Save for Later Items</h1>
        {savedItems.length === 0 ? (
          <Message>
            Your Save for Later list is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {savedItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromLaterHandler(item._id)}
                    >
                      Remove
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      onClick={() => moveToCartHandler(item)}
                    >
                      Move to Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default SaveForLaterScreen;
