import { getStudents } from "@/actions/StudentActions";
import { selectListState } from "@/store/listSlice";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/AddButton";
import CourseDropdown from "../common/CourseDropdown";
import Printer from "../common/Printer";
import SearchField from "../common/SearchField";
import Sorter from "../common/Sorter";
import SectionDropdown from "../section/SectionDropdown";
import StudentModal from "./StudentModal";
import YearLevelDropdown from "./YearLevelDropdown";

export default function StudentDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const searchStudents = (params: any) => {
        getStudents(
            {
                keyword: params.keyword ? params.keyword : keyword, 
                page: page,
                rowsPerPage: rowsPerPage, 
                filters: params.filters ? {...filters, ...params.filters} : filters, 
                sort: params.sort ? { ...sort, ...params.sort } : sort
            }, 
            dispatch);
    }
    const handleFilter = (field: string, value: string) => {
        searchStudents({filters: {[field]: value}});
    }
    const printStudents = () => {}

    return (
        <Toolbar disableGutters>
            <AddButton modal={(open: boolean, onClose: any) => <StudentModal title="Add Existing Student" open={open} onClose={onClose}/>}/>
            <SearchField handler={searchStudents}/>
            <Box sx={{ minWidth: 160, marginLeft: '6px' }}>
                <CourseDropdown fullWidth handler={handleFilter} title="Filter by Course" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <YearLevelDropdown fullWidth handler={handleFilter} title="Filter by Year"/>
            </Box>
            <Box sx={{ minWidth: 160, marginLeft: '6px' }}>
                <SectionDropdown fullWidth handler={handleFilter} title="Filter by Section"/>
            </Box>
            <Sorter options={DefaultColumns.STUDENT.SORTER} handler={searchStudents}/>
            <Printer handler={printStudents} />
        </Toolbar>
    )
}