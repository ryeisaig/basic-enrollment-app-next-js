import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import SearchField from "../common/form/SearchField";
import Sorter from "../common/dropdown/Sorter";
import AcademicPeriodDropdown from "../academicPeriod/AcademicPeriodDropdown";
import SectionDropdown from "../section/SectionDropdown";
import InstructorDropdown from "../instructor/InstructorDropdown";
import SubjectDropdown from "../subject/SubjectDropdown";

export default function GradeDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.ROLES, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <AcademicPeriodDropdown fullWidth handler={handleFilter} title="Filter by Academic Period" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <InstructorDropdown fullWidth handler={handleFilter} title="Filter by Teacher" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <SectionDropdown fullWidth handler={handleFilter} title="Filter by Section" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <InstructorDropdown fullWidth handler={handleFilter} title="Filter by Student" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <SubjectDropdown fullWidth handler={handleFilter} title="Filter by Subject" />
            </Box>
            <Sorter options={DefaultColumns.GRADE.SORTER} handler={search}/>
        </Toolbar>
    )
}