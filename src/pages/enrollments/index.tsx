import CustomPage from "@/components/common/wrapper/CustomPage";
import PageTitle from "@/components/common/typography/PageTitle";
import { Divider } from "@mui/material";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import EnrollmentDataToolBar from "@/components/enrollment/EnrollmentDataToolBar";
import { withPagePermission } from "@/components/auth/withPermission";
import EnrollmentList from "@/components/enrollment/EnrollmentList";

function EnrollmentPage() {
    return withPagePermission(["enrollments.read","enrollments.read-group"], 
      <CustomPage>
          <PageTitle>Enrollments</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <EnrollmentDataToolBar />
            <EnrollmentList/>
          </ListWrapper>
      </CustomPage>
    )
}

export default EnrollmentPage;