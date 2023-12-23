import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import AcademicPeriodDropdown from "../academicPeriod/AcademicPeriodDropdown";
import CourseDropdown from "../course/CourseDropdown";
import Sorter from "../common/dropdown/Sorter";
import YearLevelDropdown from "../student/YearLevelDropdown";
import SectionModal from "./SectionModal";

export default function SectionDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.SECTIONS, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["sections.create","sections.create-group"]} modal={(open: boolean, onClose: any) => <SectionModal title="Add New Section" open={open} onClose={onClose}/>}/>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <CourseDropdown fullWidth handler={handleFilter} title="Filter by Course" />
            </Box>
            <Box sx={{ minWidth: 200, marginLeft: '6px' }}>
                <YearLevelDropdown fullWidth handler={handleFilter} title="Filter by Year Level" />
            </Box>
            <Sorter options={DefaultColumns.SECTION.SORTER} handler={search}/>
        </Toolbar>
    )
}