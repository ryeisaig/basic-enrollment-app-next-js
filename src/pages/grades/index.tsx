import { getList } from "@/actions/CoreActions";
import { withPagePermission } from "@/components/auth/withPermission";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import GradeDataToolBar from "@/components/grade/GradeDataToolBar";
import RoleModal from "@/components/role/RoleModal";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";

function GradePage() {
    return withPagePermission(["grades.read","grades.read-group"],
      <CustomPage>
          <PageTitle>Grades</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <GradeDataToolBar />
            <DefaultDataList 
              resource={Resources.GRADES}
              title="Grades"
              modal={(open: boolean, onClose: any, data: any) => <RoleModal title={"Edit grade"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.GRADE.PRIMARY}
              refresh={getList}
              editPermissions={["grades.update","grades.update-group"]}
            />
          </ListWrapper>
      </CustomPage>
    )
}

export default GradePage;