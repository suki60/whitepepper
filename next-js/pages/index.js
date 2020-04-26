import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { WhitePepper } from 'components'

function getData(ctx) {
  return axios({
    method: 'get',
    baseURL: 'http://localhost:9292',
    url: '/',
    withCredentials: true,
    headers: ctx.req.headers.cookie ? { cookie: ctx.req.headers.cookie } : undefined
  }).then(res => res)
}

function Index({ peppers = [] }) {
  return (
    <WhitePepper initialPeppers={peppers} />
  )
}

Index.getInitialProps = async ctx => {
  const res = await getData(ctx)
  if (res.headers['set-cookie']) ctx.res.setHeader('Set-Cookie', res.headers['set-cookie'])
  return { peppers: res.data.peppers }
}

Index.propTypes = {
  peppers: PropTypes.arrayOf(PropTypes.object),
}

export default Index
