import { Close } from "@mui/icons-material";
import { Box, Button, Divider, Modal } from "@mui/material";
import PageTitle from "./PageTitle";

export type ModalProps = {
  title: string;
  open: boolean;
  onClose: any;
  children: any;
  handleSubmit: any;
}

export default function Confirm(props: ModalProps) {

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
            <Button type="submit" variant="contained" color="primary" style={{height: "40px", marginRight: "10px"}}>Submit</Button>
            <Button onClick={props.onClose} variant="contained" style={{height: "40px", background: "#fff", color: "#616161"}}>Cancel</Button>
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
  width: '222.2px', 
  marginBottom: '10px', 
  marginRight: '10px'
}