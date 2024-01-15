import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import { Box, Divider, Grid } from "@mui/material";
import PageSubtitle from "@/components/common/typography/PageSubtitle";
import AcademicPeriodDropdown from "@/components/academicPeriod/AcademicPeriodDropdown";
import CollegeDropdown from "@/components/college/CollegeDropdown";

export default function GradingDashboard() {
    return (
      <CustomPage>
          <PageTitle style={{float: "left"}}>Grading Dashboard for AY 2023 2nd Semester</PageTitle>
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
                   <span style={{fontSize: "48px", fontWeight: "bold"}}>0%</span>
                   <span style={{fontSize: "24px", fontWeight: "bold", color: "#616161", float: "right", marginRight: "20px", marginTop: "20px"}}>0/188</span> <br/>
                   <span>Students with Complete Grades</span>
                </Box>
                <Box
                    sx={{
                        width: 'calc(25% - 16px)',
                        height: 110,
                        color: '#0277bd',
                        backgroundColor: '#eeeeee',
                        marginRight: '20px',
                        paddingLeft: '10px',
                        borderLeft: 'solid 10px #0277bd'
                    }}
                >
                   <span style={{fontSize: "48px", fontWeight: "bold"}}>67%</span>
                   <span style={{fontSize: "24px", fontWeight: "bold", color: "#616161", float: "right", marginRight: "20px", marginTop: "20px"}}>114/188</span> <br/>
                   <span>Students with Partial Grades</span>
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
                   <span style={{fontSize: "48px", fontWeight: "bold"}}>9%</span>
                   <span style={{fontSize: "24px", fontWeight: "bold", color: "#616161", float: "right", marginRight: "20px", marginTop: "20px"}}>7/56</span> <br/>
                   <span>Teachers with Complete Grades</span>
                </Box>
                <Box
                    sx={{
                      width: 'calc(25% - 16px)',
                      height: 110,
                      color: '#43a047',
                      backgroundColor: '#eeeeee',
                      marginRight: '20px',
                      paddingLeft: '10px',
                      borderLeft: 'solid 10px #43a047'
                    }}
                >
                  <span style={{fontSize: "48px", fontWeight: "bold"}}>49%</span>
                   <span style={{fontSize: "24px", fontWeight: "bold", color: "#616161", float: "right", marginRight: "20px", marginTop: "20px"}}>27/56</span> <br/>
                  <span>Teachers with Partial Grades</span>
                </Box>
            </div>
            <div>
            <PageSubtitle>Grading Status By Courses</PageSubtitle>
            <CollegeDropdown noBlank={true} size='small' handler={() => {}} title="Select College" style={{width: "220px", marginBottom: "20px"}}/>
            <div style={{display: "flex"}}>
                <Box sx={{
                          backgroundColor: '#0277bd',
                          width: 'calc(10% - 16px)', height: 180, marginRight: '20px'
                        }}>
                          <Box
                              sx={{
                                width: '100%',
                                height: 60,
                                color: '#fff',
                                backgroundColor: '#eeeeee'
                              }}>
                          </Box>
                          <center><span style={{color: "#fff"}}>BSIT - 65%</span></center>
                </Box>
                <Box sx={{
                          backgroundColor: '#0277bd',
                          width: 'calc(10% - 16px)', height: 180, marginRight: '20px'
                        }}>
                          <Box
                              sx={{
                                width: '100%',
                                height: 85,
                                color: '#fff',
                                backgroundColor: '#eeeeee'
                              }}>
                          </Box>
                          <center><span style={{color: "#fff"}}>BSED - 50%</span></center>
                </Box>
            </div>
            </div>
          </ListWrapper>
      </CustomPage>
    )
}
