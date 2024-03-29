import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          {' '}
          <FontAwesomeIcon icon={faUser} /> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  )

  return (
    <>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <FontAwesomeIcon icon={faCode} /> DevConnector
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
