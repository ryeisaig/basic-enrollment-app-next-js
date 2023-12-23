import CustomPage from "@/components/common/wrapper/CustomPage";
import PageTitle from "@/components/common/typography/PageTitle";
import CourseDataToolBar from "@/components/course/CourseDataToolBar";
import CourseList from "@/components/course/CourseList";
import { Divider } from "@mui/material";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import { withPagePermission } from "@/components/auth/withPermission";

function CoursePage() {
    return withPagePermission(["courses.read","courses.read-group"],
      <CustomPage>
          <PageTitle>Courses</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <CourseDataToolBar />
            <CourseList />
          </ListWrapper>
      </CustomPage>
    )
}

export default CoursePage;