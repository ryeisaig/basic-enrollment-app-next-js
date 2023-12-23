import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AcademicPeriodDropdown from "../academicPeriod/AcademicPeriodDropdown";
import Sorter from "../common/dropdown/Sorter";
import SearchField from "../common/form/SearchField";
import CourseDropdown from "../course/CourseDropdown";
import YearLevelDropdown from "../student/YearLevelDropdown";
import EnrollButton from "./EnrollButton";
import CourseTypeDropdown from "../course/CourseTypeDropdown";

export default function EnrollmentDataToolBar() {
    const dispatch = useDispatch();
    const { page, rowsPerPage, filters, sort, keyword }: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.ENROLLMENTS, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({ filters: { [field]: value } });

    return (
        <Toolbar disableGutters>
            <EnrollButton />
            <SearchField placeholder="Search by student" handler={search} />
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <AcademicPeriodDropdown fullWidth handler={handleFilter} title="Filter by Academic Period" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <CourseTypeDropdown fullWidth handler={handleFilter} title="Filter by Program Type" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <CourseDropdown fullWidth handler={handleFilter} title="Filter by Course" />
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <YearLevelDropdown fullWidth handler={handleFilter} title="Filter by Year" />
            </Box>
            <Sorter options={DefaultColumns.ENROLLMENT.SORTER} handler={search} />
        </Toolbar>
    )
}