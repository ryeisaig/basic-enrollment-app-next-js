import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import Sorter from "../common/dropdown/Sorter";
import SearchField from "../common/form/SearchField";
import ClassModal from "./ClassModal";
import SectionDropdown from "../section/SectionDropdown";
import AcademicPeriodDropdown from "../academicPeriod/AcademicPeriodDropdown";
import SubjectDropdown from "../subject/SubjectDropdown";
import RoomDropdown from "../room/RoomDropdown";
import CourseDropdown from "../course/CourseDropdown";
import YearLevelDropdown from "../student/YearLevelDropdown";

export default function ClassDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.CLASSES, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["classes.create","classes.create-group"]} modal={(open: boolean, onClose: any) => <ClassModal title="Add New Class" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search class by class code ..." handler={search}/>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <AcademicPeriodDropdown fullWidth handler={handleFilter} title="Filter by Academic Period" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <CourseDropdown fullWidth handler={handleFilter} title="Filter by Course" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <YearLevelDropdown fullWidth handler={handleFilter} title="Filter by Year" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <SectionDropdown filter={filters ? {courseId: filters["courseId"], yearLevel: filters["yearLevel"]} : {}} fullWidth handler={handleFilter} title="Filter by Section" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <SubjectDropdown fullWidth handler={handleFilter} title="Filter by Subject" />
            </Box>
            <Box sx={{ minWidth: 140, marginLeft: '6px' }}>
                <RoomDropdown fullWidth handler={handleFilter} title="Filter by Room" />
            </Box>
            <Sorter options={DefaultColumns.CLASS.SORTER} handler={search}/>
        </Toolbar>
    )
}