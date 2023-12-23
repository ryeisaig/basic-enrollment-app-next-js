import CustomPage from "@/components/common/wrapper/CustomPage";
import PageTitle from "@/components/common/typography/PageTitle";
import StudentDataToolBar from "@/components/student/StudentDataToolBar";
import StudentList from "@/components/student/StudentList";
import { Divider } from "@mui/material";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import { withPagePermission } from "@/components/auth/withPermission";

function StudentPage() {
    return withPagePermission(["students.read","students.read-group"],
      <CustomPage>
          <PageTitle>Students</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <StudentDataToolBar />
            <StudentList />
          </ListWrapper>
      </CustomPage>
    )
}

export default StudentPage;