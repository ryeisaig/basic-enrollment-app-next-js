import { getList } from "@/actions/CoreActions";
import { withPagePermission } from "@/components/auth/withPermission";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import UserDataToolBar from "@/components/user/UserDataToolBar";
import UserModal from "@/components/user/UserModal";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";

function UserPage() {
    return withPagePermission(["users.read", "users.read-group"], 
    <CustomPage>
        <PageTitle>Users</PageTitle>
        <Divider style={{marginBottom: '10px'}}/>
        <ListWrapper>
          <UserDataToolBar />
          <DefaultDataList 
            resource={Resources.USERS}
            title="Users"
            modal={(open: boolean, onClose: any, data: any) => <UserModal title={"Edit User"} 
              data={data} 
              open={open} 
              onClose={onClose}
            />}
            columns={DefaultColumns.USER.PRIMARY}
            refresh={getList}
            editPermissions={["users.update","users.update-group"]}
            deletePermissions={["users.delete","users.delete-group"]}
          />
        </ListWrapper>
    </CustomPage>
    )
}

export default UserPage;