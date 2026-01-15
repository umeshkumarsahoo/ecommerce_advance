import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: 'rgba(253, 253, 253, 0.95)', backdropFilter: 'blur(10px)', padding: '1.5rem 0' }}>
      <div className="container">
        <a className="navbar-brand" href="#" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', letterSpacing: '1px' }}>
          LUMIÈRE
        </a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4">
            {['Collections', 'Atelier', 'Journal', 'Contact'].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link" href={`#${item.toLowerCase()}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {item}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <span className="ms-2" style={{fontSize: '1.2rem'}}>🛒</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
