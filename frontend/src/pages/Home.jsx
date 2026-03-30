import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to MERN Student Portal</h1>
      <p>Manage attendance, view results, and stay updated with notices.</p>
      <Link to="/login" className="btn">Get Started</Link>
    </div>
  )
}

export default Home
