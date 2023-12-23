import { withPagePermission } from "@/components/auth/withPermission";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import RoleDataToolBar from "@/components/role/RoleDataToolBar";
import RoleList from "@/components/role/RoleList";
import { Divider } from "@mui/material";

function RolePage() {
    return withPagePermission(["roles.read","roles.read-group"],
      <CustomPage>
          <PageTitle>Roles</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <RoleDataToolBar />
            <RoleList />
          </ListWrapper>
      </CustomPage>
    )
}

export default RolePage;