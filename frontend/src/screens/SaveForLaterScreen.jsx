import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ListGroup,
  Image,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { removeFromSaveForLater, moveToCart } from "../slices/laterSlice";
import { addToCart } from "../slices/cartSlice";
import { addToSaveForLater, updateItemQuantity } from "../slices/laterSlice.js";

const SaveForLaterScreen = () => {
  const dispatch = useDispatch();
  const { savedItems } = useSelector((state) => state.later);

  const removeFromLaterHandler = (id) => {
    dispatch(removeFromSaveForLater(id));
  };

  const addToSaveForLaterHandler = (item) => {
    dispatch(addToSaveForLater(item));
  };

  const moveToCartHandler = (item) => {
    if (item.countInStock >= item.qty) {
      dispatch(addToCart({ ...item, qty: item.qty }));
      dispatch(removeFromSaveForLater(item._id));
    } else {
      alert("Not enough stock available");
    }
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

                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          updateItemQuantity({
                            _id: item._id,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromLaterHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                  <Col md={3}>
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
