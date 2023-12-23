import { selectListState } from "@/store/listSlice";
import { TypeKey } from "@/types/typekey";
import { defaultSearch } from "@/utils/ListUtils";
import { Toolbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../button/AddButton";
import SearchField from "../form/SearchField";
import Sorter from "../dropdown/Sorter";
import { getList } from "@/actions/CoreActions";

type ToolBarProps = {
    addModal: any;
    searchPlaceholder?: string;
    sortOptions: TypeKey[];
    resource: string;
    disableSearch?: boolean;
    addPermissions?: string[];
}

export default function DefaultDataToolBar(props: ToolBarProps) {
    const dispatch = useDispatch();
    const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
    const search = (params: any) => defaultSearch(getList, props.resource, params, page, rowsPerPage, filters, sort, keyword, dispatch);
    return (
        <Toolbar disableGutters>
            <AddButton permissions={props.addPermissions} modal={(open: boolean, onClose: any) => props.addModal(open, onClose) }/>
            {!props.disableSearch && <SearchField placeholder={props.searchPlaceholder || "Search..."} handler={search}/>}
            <Sorter options={props.sortOptions} handler={search}/>
        </Toolbar>
    )
}