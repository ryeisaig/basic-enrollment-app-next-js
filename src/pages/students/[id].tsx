import { getById } from "@/actions/CoreActions";
import { withFunctionalPermission } from "@/components/auth/withPermission";
import { NumericStat } from "@/components/common/stat/NumericStat";
import { StatBadge } from "@/components/common/stat/StatBadge";
import DefaultDetailsPage from "@/components/common/wrapper/DefaultDetailsPage";
import EnrolledClassList from "@/components/grade/DetailedGradeList";
import StudentModal from "@/components/student/StudentModal";
import { Student } from "@/types/student";
import { Resources } from "@/utils/ApiConstants";
import { mmddyyyy } from "@/utils/DateUtils";
import { LABELS } from "@/utils/Labels";
import * as StringUtils from '@/utils/StringUtils';
import { CalendarMonthOutlined, DashboardCustomizeOutlined, DashboardOutlined, EditOutlined, LibraryAddCheckOutlined, ListOutlined, PrintOutlined, TimerOutlined } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function StudentProfile(){
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState<Student>();
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const init = async () => {
      const data = await getById(Resources.STUDENTS, id);
      setData(data?.content);
    }

    // Change to getServerSideProps
    useEffect(() =>{
      id && init();
    }, [id]);

    return(
      <DefaultDetailsPage
        permissions={["students.read","students.read-group"]} 
        title={data?.studentNumber || ""} 
        breadcrumbLinks={[{path: "../students", title: "Students"}]} 
        actions={
          [
            withFunctionalPermission(
              <Button key="edit" variant="contained" color="primary" onClick={() => setOpenEdit(true)} style={{float: "right", height: "32px", marginRight: "10px"}}><EditOutlined style={{marginRight: "10px"}}/> {LABELS.EDIT}</Button>,
              ["students.update","students.update-group"]
            ),
            <Button key="print-tor" variant="contained" color="secondary" style={{float: "right", height: "32px", marginRight: "10px"}}><ListOutlined style={{marginRight: "10px"}}/> {LABELS.PRINT_TOR}</Button>,
            <Button key="print_cog" variant="contained" color="secondary" style={{float: "right", height: "32px", marginRight: "10px"}}><PrintOutlined style={{marginRight: "10px"}}/> {LABELS.PRINT_COG}</Button>,
            <Button key="audit" variant="contained" color="secondary" style={{float: "right", height: "32px", marginRight: "10px"}}><TimerOutlined style={{marginRight: "10px"}}/> {LABELS.AUDIT}</Button>
          ]
        }
        data={data}
        avatar={<Avatar style={{width: "150px", height: "150px"}}/>}
        primaryColumns={[
          { column: "studentNumber" },
          { column: "course", presentation: (data: any) => data.code},
          { column: "yearLevel", presentation: (data: any) => StringUtils.ordinals(data ? parseInt(data) : 0) },
          { column: "lastName" },
          { column: "firstName" },
          { column: "middleName" }
        ]}
        otherColumns={[
          { column: "gender" },
          { column: "birthday", presentation: (data: any) => mmddyyyy(data)},
          { column: "civilStatus" },
          { column: "cabinetId", label: "Cabinet ID" },
          { column: "yearGraduated" },
          { column: "type" },
          { column: "mobileNumber" },
          { column: "emailAddress" },
          { column: "occupation" },
          { column: "presentAddress", full: true },
          { column: "permanentAddress", full: true },
          { column: "guardians", label: "Guardian's Name", presentation: (data: any) => data && data[0] && data[0].name},
          { column: "guardians", label: "Guardian's Mobile Number", presentation: (data: any) =>  data && data[0] && data[0].mobileNumber},
          { column: "guardians", label: "Guardian's Relationship", presentation: (data: any) => data && data[0] && data[0].relationship},
          { column: "guardians", label: "Guardian's Name", presentation: (data: any) => data && data[1] && data[1].name},
          { column: "guardians", label: "Guardian's Mobile Number", presentation: (data: any) =>  data && data[1] && data[1].mobileNumber},
          { column: "guardians", label: "Guardian's Relationship", presentation: (data: any) => data && data[1] && data[1].relationship},
        ]}
        stats={
          [
            <StatBadge key="confirmedEnrollment" color="#004aad" icon={LibraryAddCheckOutlined} text={"Has confirmed enrollment this current academic period"}/>,
            <StatBadge key="lastPeriodAttended" color="#e65100" icon={CalendarMonthOutlined} text={"Last attended academic period: 2023 - 1st"} badgeValue="2023.1" badgeColor="warning"/>,
            <StatBadge key="totalUnits" color="#ffab00" icon={DashboardOutlined} text={"Total of 24 units earned from the current course"} badgeValue="24"  badgeColor="error"/>,
            <StatBadge key="unitsMore" color="#9e9e9e" icon={DashboardCustomizeOutlined} text={"84 units more to complete the current course"} badgeValue="84" badgeColor="info"/>,
            <NumericStat key="missingGrades" value={2} color="#689f38" text="2 missing grades from the current grading period"/>,
            <NumericStat key="failingGrades" value={2} color="#e65100" text="2 failing grades from the current grading period"/>,
            <NumericStat key="incompleteGrades" value={1} color="#ffab00" text="1 incomplete / conditional grades from the current grading period"/>,
            <NumericStat key="dropGrades" value={0} color="#9e9e9e" text="0 dropped subjects from the current grading period"/>
          ]
        }
      >
        <EnrolledClassList studentId={data?._id} academicPeriodId={data?.latesEnrollment?.academicPeriodId} inner={true} title="2022-2023 1ST" /> 
        <EnrolledClassList studentId={data?._id} academicPeriodId={data?.latesEnrollment?.academicPeriodId} inner={true} title="2022-2023 2ND" /> 
        <StudentModal title="Edit Student" data={data} open={openEdit} onClose={() => { setOpenEdit(false); init()}}/>
      </DefaultDetailsPage>
    );
}
