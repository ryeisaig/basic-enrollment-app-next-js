import { selectListState } from '@/store/listSlice';
import { toTitle } from '@/utils/StringUtils';
import { Box, CircularProgress, TablePagination } from '@mui/material';
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
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {loading}: any = useSelector(selectListState);

  return (
    <div style={{overflow: "auto", paddingTop: "12px", maxHeight: "calc(100vh - 70px)"}}>   
     {/* {loading && <Box sx={{position: 'absolute', width: '100%', minHeight: '100vh', ZIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center',  backgroundColor: 'rgba(255,255,255, 0.3)'}}>
          <CircularProgress/>
      </Box>}  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}  size="small" aria-label="customized table">
          <TableHead>
            <TableRow sx={{height: "50px", background: "#fff"}}>
              <StyledTableCell width="40px"></StyledTableCell>
              {
                props.columns.map((col: Column) => (
                  <StyledTableCell key={col.key} align={col.align ? col.align : 'left'} width={col.width}>{col.title ? col.title : toTitle(col.key)}</StyledTableCell>
                  ))
              }
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, i: number) => (
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