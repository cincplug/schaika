import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div id="glava" className="glava">

      <h1 style={{ margin: 0 }}>
          <Link
              to="/"
              style={{
                      color: 'white',
                      textDecoration: 'none',
              }}
          >
              {siteTitle}
          </Link>
      </h1>
      <div>React.js synthesizer</div>

  </div>
)

export default Header
