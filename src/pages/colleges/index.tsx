import { getList } from "@/actions/CoreActions";
import CollegeModal from "@/components/college/CollegeModal";
import CustomPage from "@/components/common/wrapper/CustomPage";
import DefaultDataToolBar from "@/components/common/menu/DefaultDataToolBar";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import CourseInnerList from "@/components/course/CourseInnerList";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import { withPagePermission } from "@/components/auth/withPermission";

function CollegePage() {
    return (
      withPagePermission(["colleges.read","colleges.read-group"], <CustomPage>
          <PageTitle>Colleges</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <DefaultDataToolBar 
              resource={Resources.COLLEGES}
              addModal={
                (open: boolean, onClose: any) => <CollegeModal title="Add New College" open={open} onClose={onClose}/>
              }
              searchPlaceholder="Search colleges..."
              sortOptions={DefaultColumns.COLLEGE.SORTER}
              addPermissions={["colleges.create","colleges.create-group"]}
            />
            <DefaultDataList 
              resource={Resources.COLLEGES}
              title="Colleges"
              modal={(open: boolean, onClose: any, data: any) => <CollegeModal title={"Edit College"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.COLLEGE.PRIMARY}
              refresh={getList}
              innerTable={(data: any) => <CourseInnerList collegeId={data._id}/>}
              editPermissions={["colleges.update","colleges.update-group"]}
              deletePermissions={["colleges.delete","colleges.delete-group"]}
            />  
          </ListWrapper>
      </CustomPage>)
    )
}

export default CollegePage;