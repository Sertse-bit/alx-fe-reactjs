import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: 'navy', padding: '10px', display: 'flex', gap: '15px' , justifyContent: 'center'}}>
      <Link to="/" style={{ color: 'white' }}>Home</Link>
      <Link to="/about" style={{ color: 'white' }}>About</Link>
      <Link to="/services" style={{ color: 'white' }}>Services</Link>
      <Link to="/contact" style={{ color: 'white' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
