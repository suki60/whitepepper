import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Pepper } from 'components'
import config from 'config/config.js'
import useStyles from './styles'

function getPepper(x, y, userId) {
  return axios({
    method: 'post',
    baseURL: config.clientApiUrl,
    url: '/pepper',
    params: { x, y, user_id: userId }
  }).then(res => {
    return res.data
  })
}

function WhitePepper({ initialPeppers = [], userId }) {
  const classes = useStyles()
  const [state, setState] = useState({ action: 'get', peppers: initialPeppers })
  const isLastPepper = (i) => state.peppers.length === i + 1

  const createPepper = (userId) => async (x, y, removeLastPepper = false) => {
    const pepper = await getPepper(x, y, userId)

    if (removeLastPepper) {
      const { peppers } = state
      peppers.pop()
      setState({ action: "post", peppers: peppers.concat([pepper]) })
    } else {
      setState({ action: "post", peppers: state.peppers.concat([pepper]) })
    }
  }

  const updatePepper = (userId) => (id, text) => {
    axios.put(
      `${config.clientApiUrl}/pepper`,
      null,
      {
        params: { id, text, user_id: userId },
      }
    )
  }

  const deletePepper = (id) => {
    axios.delete(`${config.clientApiUrl}/pepper`, {
      params: { id, user_id: userId },
    })

    setState({ action: 'delete', peppers: state.peppers.filter(pepper => pepper.id !== id) })
  }

  return (
    <div
      className={classes.whitePepper}
      onClick={e => { createPepper(userId)(e.clientX - 1, e.clientY - 18, userId) }}
    >
      {state.peppers.map((pepper, i) => (
        <Pepper
          action={state.action}
          createPepper={createPepper(userId)}
          deletePepper={deletePepper}
          focus={isLastPepper(i) && state.action === 'post'}
          id={pepper.id}
          peppers={state.peppers}
          setState={setState}
          text={pepper.text}
          updatePepper={updatePepper(userId)}
          key={`${pepper.x}${pepper.y}`}
          x={pepper.x}
          y={pepper.y}
        />
      ))}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div tabIndex={0} />
    </div>
  )
}

WhitePepper.propTypes = {
  initialPeppers: PropTypes.arrayOf(PropTypes.object),
}

export default WhitePepper
