import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup, Image, Button, Row, Col, Card } from "react-bootstrap";
import Message from "../components/Message";
import { removeFromSaveForLater, moveToCart } from "../slices/laterSlice";

const SaveForLaterScreen = () => {
  const dispatch = useDispatch();
  const { savedItems } = useSelector((state) => state.later);

return <h1>Save for Later Items</h1>;
};

export default SaveForLaterScreen;