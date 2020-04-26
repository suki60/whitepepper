import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  input: {
    position: 'fixed',
    border: 'none',
    overflow: 'auto',
    outline: 'none',
    background: 'none',
    boxShadow: 'none',
    resize: 'none', /* remove the resize handle on the bottom righ t */
    fontSize: 16,
    fontFamily: 'Roboto Mono',
    height: 24
  }
})

export default useStyles
