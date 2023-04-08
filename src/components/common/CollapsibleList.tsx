import { selectListState } from '@/store/listSlice';
import { toTitle } from '@/utils/StringUtils';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CollapsibleRow from './CollapsibleRow';
import { Column, ListProps, StyledTableCell } from './DefaultList';

export default function CollapsibleList(props: ListProps<any>) {
  
  const {loading}: any = useSelector(selectListState);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <div style={{overflow: "auto", paddingTop: "12px", maxHeight: "calc(100vh - 70px)"}}>    
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}  size="small" aria-label="customized table">
          <TableHead>
            <TableRow sx={{height: "50px"}}>
              <StyledTableCell width="40px"></StyledTableCell>
              {
                props.columns.map((col: Column) => (
                  <StyledTableCell key={col.key} align={col.align ? col.align : 'left'} width={col.width}><b>{col.title ? toTitle(col.title) : toTitle(col.key)}</b></StyledTableCell>
                  ))
              }
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? 
             <label>Loading...</label>
            : props.data.map((row: any, i: number) => (
              <CollapsibleRow key={i} row={row} i={i} columns={props.columns} innerTable={props.innerTable} actions={props.actions}/>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => {props.handleQueryChange({page: page, rowsPerPage: rowsPerPage}); setPage(page)}}
          onRowsPerPageChange={(e: any) => {props.handleQueryChange({page: page, rowsPerPage: e.target.value}); setRowsPerPage(e.target.value)}}
        />
      </TableContainer>
    </div>
  );
}