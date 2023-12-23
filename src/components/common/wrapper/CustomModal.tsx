import { Close } from "@mui/icons-material";
import { Box, Button, Divider, Modal } from "@mui/material";
import PageTitle from "../typography/PageTitle";
import { LABELS } from "@/utils/Labels";

export type BaseModalProps = {
  title: string;
  open: boolean;
  onClose: any;
  children: any;
  handleSubmit: any;
  data?: any
}

export type ModalProps = {
  title: string;
  open: boolean;
  onClose: any;
  data?: any;
  forceRemoveId?: boolean;
}

export default function Confirm(props: BaseModalProps) {

  const submit = (e: any) => {
    e.preventDefault();
    props.handleSubmit();
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby='list-modal'
    >
      <Box sx={style}>
        <PageTitle>{props.title}
          <Button onClick={props.onClose} style={{float: 'right'}}><Close /></Button>
        </PageTitle>
        <Divider style={{marginBottom: '16px', marginTop: '10px'}}/>
        <form onSubmit={submit} style={{maxHeight: 'calc(90vh - 80px)', overflowY: 'scroll', paddingRight: '16px'}}>
          {...props.children}
          <div style={{marginBottom: '20px', marginTop: "12px"}}>
            <Button type="submit" variant="contained" color="primary" style={{height: "40px", marginRight: "10px"}}>{LABELS.SUBMIT}</Button>
            <Button onClick={props.onClose} variant="contained" style={{height: "40px", background: "#fff", color: "#616161"}}>{LABELS.CANCEL}</Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 753,
  bgcolor: 'background.paper',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  paddingTop: '16px',
  paddingRight: '0px',
  maxHeight: '90vh'
};

export const defaultFormStyle = {
  width: '220px', 
  marginBottom: '10px', 
  marginRight: '10px',
}