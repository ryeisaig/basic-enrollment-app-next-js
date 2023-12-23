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
import UserModal from "./UserModal";
import UserStatusDropdown from "./UserStatusDropdown";

export default function UserDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.USERS, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["users.create","users.create-group"]} modal={(open: boolean, onClose: any) => <UserModal title="Add New User" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search users..." handler={search}/>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <UserStatusDropdown fullWidth handler={handleFilter} title="Filter by Status" />
            </Box>
            <Sorter options={DefaultColumns.USER.SORTER} handler={search}/>
        </Toolbar>
    )
}