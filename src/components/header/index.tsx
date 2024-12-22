import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Orders Overview
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              User Management
            </Link>
          </li>
        </ul>
    </div>
  </nav>
  )
}

export default Header