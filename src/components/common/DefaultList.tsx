import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ActionMenu from './ActionMenu';
import PageSubtitle from './PageSubtitle';
import PageTitle from './PageTitle';
import { toTitle } from '@/utils/StringUtils';

export type ListProps<T> = {
  columns: Column[];
  data: T[]; 
  totalElements: number;
  innerTable?: any;
  inner?: boolean;
  title?: string;
  children?: any;
  handleQueryChange?: any;
  actions?: any;
}

export type ExtendedListProps = {
  inner?: boolean;
  title?: string;
}

export type Column = {
  key: string;
  title?: string;
  type?: string;
  presentation?: any;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width?: string;
  transform?: any;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledInnerTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e0e0e0",
    color: "#424242"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "13px !important",
    padding: 0
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const getData = (col: Column, row: any) => {
  const elements = col.key.split("+");
  let finalValue = "";
  elements.map((elem, i) => {
    const keys = elem.split(".");
    let data = row;
    keys.map(key => {
      data = data[key];
    });
    
    finalValue += data;

    //add extra space in between props value
    finalValue += (i < elements.length - 1) ? " " : "";
  })
  
  return finalValue;
}

export default function DefaultList(props: ListProps<any>) {
  return (
    <div style={{padding: "15px", paddingTop: "15px"}}>
      {props.inner ? <PageSubtitle>{props.title}</PageSubtitle> : <PageTitle>{props.title}</PageTitle>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}  size="small" aria-label="customized table">
          <TableHead>
            <TableRow sx={{height: props.inner? "30px" : "50px"}}>
              {
                props.columns.map((col: Column) => (
                  props.inner ? <StyledInnerTableCell key={col.key} align={col.align ? col.align : 'left'} width={col.width}><b>{col.title ? toTitle(col.title) : toTitle(col.key)}</b></StyledInnerTableCell> : 
                  <StyledTableCell key={col.key} align={col.align ? col.align : 'left'} width={col.width}><b>{col.title ? toTitle(col.title) : toTitle(col.key)}</b></StyledTableCell>
                ))
              }
              {props.inner ? <StyledInnerTableCell align="right"></StyledInnerTableCell> : <StyledTableCell align="right"></StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row: any, i: number) => (
                <StyledTableRow key={row._id} hover >
                {
                  props.columns.map((col: Column) => (
                    <StyledTableCell key={col.key} align={col.align ? col.align : 'left'} width={col.width}>
                      {col.presentation ? col.presentation(getData(col, row)) : getData(col, row)}
                    </StyledTableCell>
                    ))
                }
              <StyledTableCell align="right" width={"100px"}>
                <ActionMenu  inner={true} />
              </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}