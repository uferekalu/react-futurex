import './App.css';
import { Container } from 'react-bootstrap';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Container className="home-list">
        <ProductList />
      </Container>
    </>
  );
}

export default App;
