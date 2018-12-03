import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { connect } from "react-redux"

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
          <>
              <Helmet
                  title={data.site.siteMetadata.title}
                  meta={[
                      { name: 'description', content: 'Sample' },
                      { name: 'keywords', content: 'sample, something' },
                  ]}
              >
                  <html lang="en" />
              </Helmet>
              <Header siteTitle={data.site.siteMetadata.title} />
              <div id="telo">
                  {children}
              </div>
          </>
      )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
