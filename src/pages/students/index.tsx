import PageTitle from "@/components/common/PageTitle";
import StudentDataToolBar from "@/components/student/StudentDataToolBar";
import StudentList from "@/components/student/StudentList";
import { Divider } from "@mui/material";

function StudentPage() {
    return (
     <div style={{padding: '20px', paddingTop: '20px', overflow: 'auto', maxHeight: 'calc(100vh - 70px)'}}>
        <PageTitle>Students</PageTitle>
        <Divider style={{marginBottom: '20px'}}/>
        <StudentDataToolBar />
        <StudentList />
      </div>
    )
}

export default StudentPage;