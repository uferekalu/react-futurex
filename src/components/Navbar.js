import React, { useState } from 'react';
import './Navbar.css';
import { BrowserRouter, withRouter, Link } from 'react-router-dom';


function NavBar(props) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    


    return (
        <>
        <BrowserRouter>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        FAKE API <i className="fab fa-typo3"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-shopping-cart"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </BrowserRouter>
        </>
    );
}


export default withRouter(NavBar);