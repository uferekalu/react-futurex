import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../history';

export default class Home extends Component {
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
