import { IconButton, Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import CloseIcon from '@mui/icons-material/Close'
import { forwardRef } from "react"

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const CartNotification = ({open, setOpen}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const action = <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={handleClose}
  >
    <CloseIcon fontSize="small" />
  </IconButton>

  return <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    action={action}
  >
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      Saved to cart
    </Alert>
  </Snackbar>

}

export default CartNotification