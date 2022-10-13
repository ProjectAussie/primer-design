import {Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions} from '@mui/material'

const ReportDialog = ({open, handleClose, numberPrimerPairs}) => {
  return <Dialog
    open={open}
    onClose={handleClose} //Can be esc/click away, non conventional close
    aria-labelledby="primer-dialog-title"
    aria-describedby="primer-dialog-description"
  >
    <DialogTitle id="primer-dialog-title">
        {"Primer Report"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="primer-dialog-description">
        {`Successfully created ${numberPrimerPairs} primer pairs. We have
        autoselected our top picks.`}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
}

export default ReportDialog