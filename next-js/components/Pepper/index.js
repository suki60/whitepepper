import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useStyles from './styles'

function Pepper({
  createPepper, deletePepper, focus = false, id, text, updatePepper, x, y
}) {
  const classes = useStyles()
  const ref = React.createRef()

  useEffect(() => {
    if (focus) ref.current.focus()
  })

  const handleOnBlur = () => (ref.current.value.length === 0 ? deletePepper(id) : updatePepper(id, ref.current.value))

  const stopPropagation = e => { e.stopPropagation() }

  const resize = () => { ref.current.size = ref.current.value.length + 1 }

  const preventUnfocusWithTab = () => {
    setTimeout(() => {
      ref.current.focus()
    }, 0)
  }

  const handlerOnKeyDown = async (e) => {
    // keyCode = esc
    if (e.keyCode === 27) {
      ref.current.blur()
    // keyCode = enter
    } else if (e.keyCode === 13) {
      createPepper(x, y + 24)
    // keyCode = tab
    } else if (e.keyCode === 9) {
      if (ref.current.value.length === 0) {
        createPepper(x + 16, y, true)
      } else {
        preventUnfocusWithTab(e)
      }
    } else {
      resize()
    }
  }


  return (
    <input
      className={classes.input}
      defaultValue={text || ''}
      onBlur={handleOnBlur}
      onClick={stopPropagation}
      onKeyDown={handlerOnKeyDown}
      onKeyUp={resize}
      ref={ref}
      size={text ? text.length + 1 : 1}
      style={{ top: `${y}px`, left: `${x}px` }}
      type="text"
    />
  )
}

Pepper.propTypes = {
  createPepper: PropTypes.func.isRequired,
  deletePepper: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  updatePepper: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default Pepper
