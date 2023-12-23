import { getList } from "@/actions/CoreActions";
import { withPagePermission } from "@/components/auth/withPermission";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import SubjectDataToolBar from "@/components/subject/SubjectDataToolBar";
import SubjectModal from "@/components/subject/SubjectModal";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";

function SubjectPage() {
  return withPagePermission(["subjects.read","subjects.read-group"],
      <CustomPage>
          <PageTitle>Subjects</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <SubjectDataToolBar />
            <DefaultDataList 
              resource={Resources.SUBJECTS}
              title="Subjects"
              modal={(open: boolean, onClose: any, data: any) => <SubjectModal title={"Edit Subject"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.SUBJECT.PRIMARY}
              refresh={getList}
              editPermissions={["subjects.update","subjects.update-group"]}
              deletePermissions={["subjects.delete","subjects.delete-group"]}
            />  
          </ListWrapper>
      </CustomPage>
    )
}

export default SubjectPage;