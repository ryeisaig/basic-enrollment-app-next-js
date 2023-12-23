import { toTitle } from '@/utils/StringUtils';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import ActionMenu from '../menu/ActionMenu';
import { Column, getData, StyledTableCell, StyledTableRow } from './DefaultList';
import NotSpecified from '../typography/NotSpecified';

export type RowProps = {
  row: any,
  i: number,
  columns: Column[],
  innerTable?: any;
  actions?: any;
}

export const DEFAULT_LABEL_EXCLUSIONS = ["_id", "courseId", "collegeId", "sectionId", "studentId", "academicPeriodId"];

export default function CollapsibleRow(props: RowProps) {

  const [open, setOpen] = React.useState(false);

  let allDisplayedKeys = props.columns.map((col) => col.key.split("+")).flat();
  let exclusions = allDisplayedKeys.map((key) => key.split(".")[0]);
  exclusions.push(...DEFAULT_LABEL_EXCLUSIONS);

  let dataProps = Object.entries(props.row);
  dataProps = dataProps.filter((d) => {
    return !exclusions.includes(d[0]);
  });

  return (
    <>
      <StyledTableRow key={props.row._id} hover >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {
          props.columns.map((col: Column) => (
            <StyledTableCell key={col.key} align={col.align ? col.align : 'left'} width={col.width}>
                {col.presentation ? 
                  col.presentation(getData(col, props.row, col.json)) :
                  col.transform ?
                    col.transform(getData(col, props.row, col.json)) : 
                    getData(col, props.row)}
            </StyledTableCell>
            ))
        }
      <StyledTableCell align="right" width={"100px"}>
        <ActionMenu inner={false} actions={props.actions} data={props.row}/>
      </StyledTableCell>
      </StyledTableRow>
      <TableRow key={props.row._id + "-collapse"}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={props.columns.length + 2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, flexGrow: 1 }}>
            <Grid container>
              {// TODO Improve this
              dataProps.map((prop: any, index: number) => {
                  if(Array.isArray(prop[1])){
                    return prop[1].map((propItem, valueIndex: number) => {
                      if(typeof propItem === 'object'){
                        let subFields = Object.entries(propItem);
                        return subFields.map((subField: any) => {
                          return (
                            <Grid key={subField[0]} xs={4} sm={3} md={3}>
                              <ListItem key={index} sx={{paddingTop: '5px', paddingBottom: '5px'}}>
                                <b style={{color: "#616161", fontSize: "13px"}}>{`(${valueIndex + 1}) ${toTitle(prop[0])}'s ${toTitle(subField[0])}`}</b> : &nbsp;{subField[1] ? <label style={{fontSize: "13px"}}>{subField[1]}</label> : <NotSpecified />}
                              </ListItem>
                            </Grid>
                          )
                        });
                      } else {
                        return (
                          <Grid key={propItem} xs={4} sm={3} md={3}>
                            <ListItem key={index} sx={{paddingTop: '5px', paddingBottom: '5px'}}>
                              <b style={{color: "#616161", fontSize: "13px"}}>{`(${valueIndex + 1}) ${toTitle(prop[0])}`}</b> : &nbsp;{propItem[1] ? <label style={{fontSize: "13px"}}>{propItem[1]}</label> : <NotSpecified />}
                            </ListItem>
                          </Grid>
                        );
                      }
                    })
                  }
                  else if(typeof prop[1] === 'object'){
                    let subFields = Object.entries(prop[1]);
                    return subFields.map((subField: any) => {
                      return (
                        <Grid key={subField[0]}  xs={4} sm={3} md={3}>
                          <ListItem key={index} sx={{paddingTop: '5px', paddingBottom: '5px'}}>
                            <b style={{color: "#616161", fontSize: "13px"}}>{`${toTitle(prop[0])}'s ${toTitle(subField[0])}`}</b> : &nbsp;{subField[1] ? <label style={{fontSize: "13px"}}>{subField[1]}</label> : <NotSpecified />}
                          </ListItem>
                        </Grid>
                      )
                    });
                  } else {
                    return (
                      <Grid key={prop[0]} xs={4} sm={3} md={3}>
                        <ListItem key={index} sx={{paddingTop: '5px', paddingBottom: '5px'}}>
                          <b style={{color: "#616161", fontSize: "13px"}}>{toTitle(prop[0])}</b> : &nbsp;{prop[1] ? <label style={{fontSize: "13px"}}>{toTitle(prop[1])}</label> : <NotSpecified />}
                        </ListItem>
                      </Grid>
                    );
                  }
                })}
            </Grid>
            {props.innerTable && props.innerTable(props.row)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}