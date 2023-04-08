import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type DialogProps = {
 open: boolean;
 onClose?: any;
 title?: string;
 message: string;
 submit?: any;
}

export default function ConfirmDialog(props: DialogProps) {

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{props.title ? props.title : "Are you sure?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={props.onClose}>Cancel</Button>
      <Button color="error" onClick={props.submit} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
  );
}