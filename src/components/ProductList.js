import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import history from '../history';
import Detail from './Detail';
import Home from './Home';

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
            <BrowserRouter>
                <Container className="home-list">
                    <Route path="/detail/:id" component={Detail} />
                    <Route path="/" exact={true} component={Home} />
                    <Row className="items">
                    {
                        this.state.products.map((el) => (
                                <Col xs={6} md={4} lg={3.5} className="item-list"  key={el.id}>
                                    <Col xs={12} md={12} className="item-img">
                                    <Link to={'/detail/' + el.id}>
                                        <img 
                                            src={el.image} 
                                            alt={el.category} 
                                            className="img-fluid"
                                            width="150px"
                                            height="150px"
                                        />
                                    </Link>
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
                                           <Link to={'/detail/' + el.id}><Button className="detail-button">SEE DETAIL</Button></Link> 
                                        </Col>
                                        <Col xs={6} md={6}>
                                            <Button className="cart-button" onClick={() => this.addToCart(el)}>ADD TO CART</Button>
                                        </Col>
                                    </Row>
                                </Col>
                        ))
                    }
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
    
}

export default ProductList;

