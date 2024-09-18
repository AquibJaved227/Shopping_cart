

import { Link } from 'react-router-dom';
function App() {

  return (
    <>
    <div className="app_h1">
    <h1>Welcome to Shooping Web app </h1>
    </div>
    <nav>
        <ul>
          <li>
            <Link to="Homepage">Home-Page</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default App
