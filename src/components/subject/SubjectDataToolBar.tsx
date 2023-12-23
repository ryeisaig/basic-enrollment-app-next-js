import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import Sorter from "../common/dropdown/Sorter";
import SubjectTypeDropdown from "./SubjectTypeDropdown";
import SearchField from "../common/form/SearchField";
import SubjectModal from "./SubjectModal";

export default function SubjectDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.SUBJECTS, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["subjects.create", "subjects.create-group"]} modal={(open: boolean, onClose: any) => <SubjectModal title="Add New Subject" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search subjects..." handler={search}/>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <SubjectTypeDropdown fullWidth handler={handleFilter} title="Filter by Type" />
            </Box>
            <Sorter options={DefaultColumns.SUBJECT.SORTER} handler={search}/>
        </Toolbar>
    )
}