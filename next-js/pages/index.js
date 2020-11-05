import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { WhitePepper } from 'components'
import config from 'config/config.js'

function getData(ctx) {
  return axios({
    method: 'get',
    baseURL: config.serverApiUrl,
    url: '/',
    headers: ctx.req.headers.cookie ? { cookie: ctx.req.headers.cookie } : undefined
  }).then(res => {
    return res
  })
}

function Index({ peppers = [], user_id }) {
  return (
    <WhitePepper initialPeppers={peppers} userId={user_id} />
  )
}

Index.getInitialProps = async ctx => {
  const res = await getData(ctx)
  if (res.headers['set-cookie']) ctx.res.setHeader('Set-Cookie', res.headers['set-cookie'])
  return { peppers: res.data.peppers, user_id: res.data.user_id }
}

Index.propTypes = {
  peppers: PropTypes.arrayOf(PropTypes.object),
}

export default Index
