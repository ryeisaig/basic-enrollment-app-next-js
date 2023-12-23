import { selectListState } from "@/store/listSlice";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import CourseDropdown from "../course/CourseDropdown";
import Printer from "../common/button/Printer";
import SearchField from "../common/form/SearchField";
import Sorter from "../common/dropdown/Sorter";
import SectionDropdown from "../section/SectionDropdown";
import StudentModal from "./StudentModal";
import YearLevelDropdown from "./YearLevelDropdown";
import { defaultSearch } from "@/utils/ListUtils";
import { Resources } from "@/utils/ApiConstants";
import { getList } from "@/actions/CoreActions";

export default function StudentDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.STUDENTS, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});
    const print = () => {}

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["students.create","students.create-group"]} modal={(open: boolean, onClose: any) => <StudentModal title="Add Existing Student" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search by name or student number..." handler={search}/>
            <Box sx={{ minWidth: 160, marginLeft: '6px' }}>
                <CourseDropdown fullWidth handler={handleFilter} title="Filter by Course" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <YearLevelDropdown fullWidth handler={handleFilter} title="Filter by Year"/>
            </Box>
            <Box sx={{ minWidth: 160, marginLeft: '6px' }}>
                <SectionDropdown fullWidth handler={handleFilter} title="Filter by Section"/>
            </Box>
            <Sorter options={DefaultColumns.STUDENT.SORTER} handler={search}/>
            <Printer handler={print} />
        </Toolbar>
    )
}