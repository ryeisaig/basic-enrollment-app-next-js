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
import RoleStatusDropdown from "./RoleStatusDropdown";
import RoleModal from "./RoleModal";

export default function RoleDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.ROLES, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["roles.create","roles.create-group"]} modal={(open: boolean, onClose: any) => <RoleModal title="Add New Role" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search roles..." handler={search}/>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <RoleStatusDropdown fullWidth handler={handleFilter} title="Filter by Status" />
            </Box>
            <Sorter options={DefaultColumns.ROLE.SORTER} handler={search}/>
        </Toolbar>
    )
}