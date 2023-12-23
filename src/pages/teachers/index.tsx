import { getList } from "@/actions/CoreActions";
import { withPagePermission } from "@/components/auth/withPermission";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import DefaultDataToolBar from "@/components/common/menu/DefaultDataToolBar";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import InstructorModal from "@/components/instructor/InstructorModal";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";

function TeachersPage() {
  return withPagePermission(["instructors.read","instructors.read-group"],
      <CustomPage>
          <PageTitle>Teachers</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <DefaultDataToolBar 
                resource={Resources.INSTRUCTORS}
                addModal={
                  (open: boolean, onClose: any) => <InstructorModal title="Add New Teacher" open={open} onClose={onClose}/>
                }
                searchPlaceholder="Search teachers..."
                sortOptions={DefaultColumns.INSTRUCTOR.SORTER}
                addPermissions={["instructors.create","instructors.create-group"]}
              />            
            <DefaultDataList 
              resource={Resources.INSTRUCTORS}
              title="Teachers"
              modal={(open: boolean, onClose: any, data: any) => <InstructorModal title={"Edit Teacher"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.INSTRUCTOR.PRIMARY}
              refresh={getList}
            />
          </ListWrapper>
      </CustomPage>
    )
}

export default TeachersPage;