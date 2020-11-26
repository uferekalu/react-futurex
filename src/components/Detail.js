import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../history';

export default class Detail extends Component {
    
  render() {
      
    return (
      <div className="Home">
        <div className="lander">
          <h3>Consuming Fake Store Api with React</h3>
          <p>A simple app for showing products lists with functionalities for adding, and removing from cart...</p>
          <form>
            <Button variant="btn btn-success" onClick={() => history.push('/products')}>Click here to view products</Button>
          </form>
        </div>
      </div>
    );
  }
}

// showDetail = (el) => {
//     console.log('This is show detail', el);
//     <Row className="detail-product">    
//         <Col xs={12} md={12}>
//             <img src={el.image} className="img-fluid" alt={el.category} />
//         </Col>
//         <Col xs={6} md={6}>
//             <p>{el.description}</p>
//         </Col>
//         <Col xs={3} md={3}>
//             <p>{el.title}</p>
//         </Col>
//         <Col xs={3} md={3}>
//             <p>{el.price}</p>
//         </Col>
//         <Col xs={12} md={12}>
//             <Button className="cart-button" onClick={() => this.addToCart(el)}>ADD TO CART</Button>
//         </Col>
//     </Row>        
// }