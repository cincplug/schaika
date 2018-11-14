import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import Klavir from '../components/Klavir'

const IndexPage = () => (
  <Layout>
      <Klavir/>

      <Link to="/page-2/">p 2</Link>
  </Layout>
)

export default IndexPage
