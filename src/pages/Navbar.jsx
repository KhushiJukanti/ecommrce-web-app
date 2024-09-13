// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { AuthContext } from '../context/AuthContext';

// const CustomNavbar = () => {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     };

//     return (
//         <div className='container'>
//             <Navbar bg="light" expand="lg">
//                 <Container>
//                     <Navbar.Brand as={Link} to="#">
//                         E-commerce
//                     </Navbar.Brand>
//                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="me-auto">
//                             {user ? (
//                                 <>
//                                     <Nav.Link as={Link} to="/home">
//                                         Home
//                                     </Nav.Link>
//                                     <Nav.Link as={Link} to="/cart">
//                                         Cart
//                                     </Nav.Link>
//                                     <Nav.Link as={Link} to="/checkout">
//                                         Checkout
//                                     </Nav.Link>
//                                     {user.role === 'admin' && (
//                                         <Nav.Link as={Link} to="/admin">
//                                             Admin
//                                         </Nav.Link>
//                                     )}
//                                 </>
//                             ) : (
//                                 <>
//                                     <Nav.Link as={Link} to="/">
//                                         Login
//                                     </Nav.Link>
//                                     <Nav.Link as={Link} to="/register">
//                                         Register
//                                     </Nav.Link>
//                                 </>
//                             )}
//                         </Nav>
//                         {user && (
//                             <Button variant="outline-danger" onClick={handleLogout} className="ml-auto">
//                                 Logout
//                             </Button>
//                         )}
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>

//         </div>
//     );
// };

// export default CustomNavbar;



import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const CustomNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout and redirect to the home page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Ensure user state is persisted across refreshes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      // Assuming your AuthContext has a method to set the user from local storage
      const parsedUser = JSON.parse(storedUser);
      // setUser(parsedUser); // Uncomment and use this if you have such a function in AuthContext
    }
  }, [user]);

  return (
    <div className='container mt-3'>
        <Navbar expand="lg" style={{ backgroundColor: '#e3f2fd' }}>
      <Container>
        <Navbar.Brand as={Link} to="#">
          E-commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/home" active={location.pathname === '/home'}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/cart" active={location.pathname === '/cart'}>
                  Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/checkout" active={location.pathname === '/checkout'}>
                  Checkout
                </Nav.Link>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin" active={location.pathname === '/admin'}>
                    Product Management
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" active={location.pathname === '/register'}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Button variant="outline-danger" onClick={handleLogout} className="ml-auto">
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default CustomNavbar;
