import { getList } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { defaultSearch } from "@/utils/ListUtils";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../common/button/AddButton";
import RoomTypeDropdown from "./RoomTypeDropdown";
import Sorter from "../common/dropdown/Sorter";
import SearchField from "../common/form/SearchField";
import RoomModal from "./RoomModal";

export default function RoomDataToolBar() {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, Resources.ROOMS, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    const handleFilter = (field: string, value: string) => search({filters: {[field]: value}});

    return (
        <Toolbar disableGutters>
            <AddButton permissions={["rooms.create","rooms.create-group"]} modal={(open: boolean, onClose: any) => <RoomModal title="Add New Room" open={open} onClose={onClose}/>}/>
            <SearchField placeholder="Search rooms..." handler={search}/>
            <Box sx={{ minWidth: 180, marginLeft: '6px' }}>
                <RoomTypeDropdown fullWidth handler={handleFilter} title="Filter by Type" />
            </Box>
            <Sorter options={DefaultColumns.ROOM.SORTER} handler={search}/>
        </Toolbar>
    )
}