import React from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const product = ({product}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </Link>
        <CardBody>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>

        </CardBody>
    </Card>
  )
}

export default product