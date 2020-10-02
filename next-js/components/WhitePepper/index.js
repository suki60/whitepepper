import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Pepper } from 'components'
import useStyles from './styles'

function getPepper(x, y) {
  return axios({
    method: 'post',
    baseURL: 'http://localhost:9292',
    url: '/pepper',
    withCredentials: true,
    params: { x, y }
  }).then(res => res.data)
}

function WhitePepper({ initialPeppers = [] }) {
  const classes = useStyles()
  const [state, setState] = useState({ action: 'get', peppers: initialPeppers })
  const isLastPepper = (i) => state.peppers.length === i + 1

  const createPepper = async (x, y, removeLastPepper = false) => {
    const pepper = await getPepper(x, y)

    if (removeLastPepper) {
      const { peppers } = state
      peppers.pop()
      setState({ action: 'post', peppers: peppers.concat([pepper]) })
    } else {
      setState({ action: 'post', peppers: state.peppers.concat([pepper]) })
    }
  }

  const updatePepper = (id, text) => {
    axios.put(
      'http://localhost:9292/pepper',
      null,
      {
        params: { id, text },
        withCredentials: true
      }
    )
  }

  const deletePepper = (id) => {
    axios.delete('http://localhost:9292/pepper', {
      params: { id },
      withCredentials: true
    })

    setState({ action: 'delete', peppers: state.peppers.filter(pepper => pepper.id !== id) })
  }

  return (
    <div
      className={classes.whitePepper}
      onClick={e => { createPepper(e.clientX - 1, e.clientY - 18) }}
    >
      {state.peppers.map((pepper, i) => (
        <Pepper
          action={state.action}
          createPepper={createPepper}
          deletePepper={deletePepper}
          focus={isLastPepper(i) && state.action === 'post'}
          id={pepper.id}
          peppers={state.peppers}
          setState={setState}
          text={pepper.text}
          updatePepper={updatePepper}
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
