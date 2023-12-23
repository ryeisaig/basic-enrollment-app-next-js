import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type DialogProps = {
 open: boolean;
 onClose?: any;
 title?: string;
 message: string;
}

export default function SuccessDialog(props: DialogProps) {

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{props.title ? props.title : "Success!"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={props.onClose} autoFocus>OK</Button>
    </DialogActions>
  </Dialog>
  );
}