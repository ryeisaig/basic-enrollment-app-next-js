import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import CollegeDropdown from "../college/CollegeDropdown";
import SearchField from "../common/form/SearchField";
import Sorter from "../common/dropdown/Sorter";
import CourseModal from "./CourseModal";
import CourseTypeDropdown from "./CourseTypeDropdown";

export default function CourseDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.COURSES, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["courses.create","courses.create-group"]} modal={(open: boolean, onClose: any) => <CourseModal title="Add New Course" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search courses..." handler={search}/>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <CourseTypeDropdown fullWidth handler={handleFilter} title="Filter by Type" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <CollegeDropdown fullWidth handler={handleFilter} title="Filter by College" />
            </Box>
            <Sorter options={DefaultColumns.COURSE.SORTER} handler={search}/>
        </Toolbar>
    )
}