import CustomPage from "@/components/common/wrapper/CustomPage";
import PageTitle from "@/components/common/typography/PageTitle";
import CourseDataToolBar from "@/components/course/CourseDataToolBar";
import { Divider } from "@mui/material";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { getList } from "@/actions/CoreActions";
import ClassModal from "@/components/class/ClassModal";
import ClassDataToolBar from "@/components/class/ClassDataToolBar";
import { withPagePermission } from "@/components/auth/withPermission";

function ClassPage() {
    return (
      withPagePermission(["classes.read","classes.read-group"],<CustomPage>
          <PageTitle>Classes</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <ClassDataToolBar />
            <DefaultDataList 
              resource={Resources.CLASSES}
              title="Classes"
              modal={(open: boolean, onClose: any, data: any) => <ClassModal title={"Edit Class"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.CLASS.PRIMARY}
              refresh={getList}
              editPermissions={["classes.update","classes.update-group"]}
              deletePermissions={["classes.delete","classes.delete-group"]}
            />
          </ListWrapper>
      </CustomPage>)
    )
}

export default ClassPage;