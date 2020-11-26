import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Badge } from 'reactstrap';

class ProductList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            products: [],
            cart: [],
            cartTotal: ""
        };
    }

    componentDidMount() {
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    products: response
                })
            })
            .catch(err => {
                console.log(err);
            });
        
        this.hydrateStateWithLocalStorage();
        //add event listener to save state to localStorage when user leaves/refreshes the page
        window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
        //saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        //for all items in state
        for (let key in this.state){
            //if the key exists in localStorage
            if (localStorage.hasOwnProperty()) {
                //get the key's value from localStorage
                let value = localStorage.getItem(key);
                //parse the localStorage string and set state
                try {
                    value = JSON.parse(value);
                    this.setState({
                        [key]: value
                    });
                } catch(e) {
                    //handle empty string
                    this.setState({
                        [key]: value
                    });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        //for every item in the state
        for (let key in this.state){
            //save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    totalValue = () => {
        let totalVal = 0;
        for (let i=0; i < this.state.cart.length; i++){
            totalVal += this.state.cart[i].price;
        }
        this.setState({
            cartTotal: totalVal
        });
    }

    showDetail = (el) => {
        console.log('This is show detail', el);
        <Row className="detail-product">    
            <Col xs={12} md={12}>
                <img src={el.image} className="img-fluid" alt={el.category} />
            </Col>
            <Col xs={6} md={6}>
                <p>{el.description}</p>
            </Col>
            <Col xs={3} md={3}>
                <p>{el.title}</p>
            </Col>
            <Col xs={3} md={3}>
                <p>{el.price}</p>
            </Col>
            <Col xs={12} md={12}>
                <Button className="cart-button" onClick={() => this.addToCart(el)}>ADD TO CART</Button>
            </Col>
        </Row>        
    }
    addToCart = (el) => {
        let cartList = [...this.state.cart];
        this.setState({
            cart: [cartList, el]
        });
    }

    removeFromCart = (el) => {
        let prod = [...this.state.cart];
        prod = prod.filter(cartItem => cartItem.id !== el.id);
        this.setState({
            cart: prod
        });
    }

    

    render() {
        return(
            
                <Row className="items">
                {
                    this.state.products.map((el) => (
                            <Col xs={6} md={4} lg={3} className="item-list"  key={el.id}>
                                <Col xs={12} md={12} className="item-img">
                                    <img 
                                        src={el.image} 
                                        alt={el.category} 
                                        className="img-fluid"
                                        width="150px"
                                        height="150px"
                                    />
                                </Col>
                                <Row className="item-detail">
                                    <Col xs={6} md={6}>
                                        <h3>{el.category}</h3>
                                    </Col>
                                    <Col xs={6} md={6}>
                                        <h3><Badge color="success">PRICE:</Badge> ${el.price}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={6}>
                                        <Button className="detail-button"onClick={() => this.showDetail(el)}>SEE DETAIL</Button>
                                    </Col>
                                    <Col xs={6} md={6}>
                                        <Button className="cart-button" onClick={() => this.addToCart(el)}>ADD TO CART</Button>
                                    </Col>
                                </Row>
                            </Col>
                    ))
                }
                </Row>
        )
    }
    
}

export default ProductList;

