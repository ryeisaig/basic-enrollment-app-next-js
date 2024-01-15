import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import { Box, Divider, Grid } from "@mui/material";
import CourseTypeDoughnut from "@/components/graphs/CourseTypeDoughnut";
import PageSubtitle from "@/components/common/typography/PageSubtitle";
import GenderDoughnut from "@/components/graphs/GenderDoughnut";
import StudentTypeDoughnut from "@/components/graphs/StudentTypeDoughnut";
import StudentStatusDoughnut from "@/components/graphs/StudentStatusDoughnut";
import CoursesBar from "@/components/graphs/CoursesBar";
import YearLevelPie from "@/components/graphs/YearLevelPie";
import CollegePie from "@/components/graphs/CollegePie";
import AcademicPeriodLine from "@/components/graphs/AcademicPeriodLine";
import AcademicPeriodDropdown from "@/components/academicPeriod/AcademicPeriodDropdown";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useRouter } from 'next/router'

export default function Dashboard() {
    const router = useRouter();
    return (
      <CustomPage>
          <PageTitle style={{float: "left"}}>Enrollment Dashboard for AY 2023 2nd Semester</PageTitle>
          <AcademicPeriodDropdown  value="6442c3bbe8cf821a475f01e9" size='small' handler={() => {}} title="Academic Period" style={{float: "right"}}/>
          <br/><br/><Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <div style={{display: "flex", marginBottom: "40px"}}>
                <Box
                    sx={{
                        width: 'calc(25% - 16px)',
                        height: 110,
                        color: '#004aad',
                        backgroundColor: '#eeeeee',
                        marginRight: '20px',
                        paddingLeft: '10px',
                        borderLeft: 'solid 10px #004aad'
                    }}
                >
                   <span style={{fontSize: "48px", fontWeight: "bold"}}>256</span> <br/>
                   <div onClick={() => router.push("/enrollments")} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', cursor: 'pointer'}}>
                          <span>Total Count of Enrolled Students</span>
                          <ChevronRightOutlined/> 
                    </div>  
                </Box>
                <Box
                    sx={{
                        width: 'calc(25% - 16px)',
                        height: 110,
                        color: '#e65100',
                        backgroundColor: '#eeeeee',
                        marginRight: '20px',
                        paddingLeft: '10px',
                        borderLeft: 'solid 10px #e65100'
                    }}
                >
                   <span style={{fontSize: "48px", fontWeight: "bold"}}>177</span> <br/>
                   <div onClick={() => router.push("/enrollments")} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', cursor: 'pointer'}}>
                          <span>Total Count of Enrolled New* Students</span>
                          <ChevronRightOutlined/> 
                    </div>  
                </Box>
                <Box
                    sx={{
                        width: 'calc(25% - 16px)',
                        height: 110,
                        color: '#33691e',
                        backgroundColor: '#eeeeee',
                        marginRight: '20px',
                        paddingLeft: '10px',
                        borderLeft: 'solid 10px #33691e'
                    }}
                >
                   <span style={{fontSize: "48px", fontWeight: "bold"}}>13</span> <br/>
                   <div onClick={() => router.push("/enrollments")} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', cursor: 'pointer'}}>
                          <span>Total Count of Pending Enrollments</span>
                          <ChevronRightOutlined/> 
                    </div>  
                </Box>
                <Box
                    sx={{
                      width: 'calc(25% - 16px)',
                      height: 110,
                      color: '#ffab00',
                      backgroundColor: '#eeeeee',
                      marginRight: '20px',
                      paddingLeft: '10px',
                      borderLeft: 'solid 10px #ffab00'
                    }}
                >
                  <span style={{fontSize: "48px", fontWeight: "bold"}}>4</span> <br/>
                  <div onClick={() => router.push("/enrollments")} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', cursor: 'pointer'}}>
                          <span>Total Count of Unprocessed Enrollments</span>
                          <ChevronRightOutlined/> 
                    </div> 
                </Box>
            </div>
            <div>
            <PageSubtitle>Students Demographics</PageSubtitle>
            <Grid container >
              <Grid item>
                <CourseTypeDoughnut/>
              </Grid>
              <Grid item>
                <GenderDoughnut/>
              </Grid>
              <Grid item>
                <StudentTypeDoughnut/>
              </Grid>
              <Grid item>
                <StudentStatusDoughnut/>
              </Grid>
            </Grid>
            <br/>
            <Grid container >
              <Grid item>
                <CoursesBar/>
              </Grid>
              <Grid item>
                <YearLevelPie/>
              </Grid>
              <Grid item>
                <CollegePie/>
              </Grid>
            </Grid>
            </div>
            <br/>
            <div>
              <AcademicPeriodLine/>
            </div>
          </ListWrapper>
      </CustomPage>
    )
}
