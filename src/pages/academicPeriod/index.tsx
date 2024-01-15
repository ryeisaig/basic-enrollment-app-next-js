import { getList } from "@/actions/CoreActions";
import AcademicPeriodModal from "@/components/academicPeriod/AcademicPeriodModal";
import CustomPage from "@/components/common/wrapper/CustomPage";
import DefaultDataToolBar from "@/components/common/menu/DefaultDataToolBar";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import { withPagePermission } from "@/components/auth/withPermission";
import ConfirmDialog from "@/components/common/wrapper/ConfirmDialog";
import { useState } from "react";

function AcademicPeriodPage() {
    const [showConfirmDialog, setShowConfirmDialog] = useState({
      open: false,
      message: '',
      submit: () => {}
    })

    return (
      withPagePermission(["academicPeriod.read", "academicPeriod.read-group"], <CustomPage>
         <PageTitle>Academic Period</PageTitle>
         <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <DefaultDataToolBar 
              resource={Resources.ACADEMIC_PERIODS}
              addModal={
                (open: boolean, onClose: any) => <AcademicPeriodModal title="Add New Academic Period" open={open} onClose={onClose}/>
              }
              sortOptions={DefaultColumns.ACADEMIC_PERIOD.SORTER}
              disableSearch={true}
              addPermissions={["academicPeriod.create","academicPeriod.create-group"]}
            />
            <DefaultDataList 
              resource={Resources.ACADEMIC_PERIODS}
              title="Academic Periods"
              modal={(open: boolean, onClose: any, data: any) => <AcademicPeriodModal title={"Edit Academic Period"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.ACADEMIC_PERIOD.PRIMARY}
              refresh={getList}
              editPermissions={["academicPeriod.update","academicPeriod.update-group"]}
              deletePermissions={["academicPeriod.delete","academicPeriod.delete-group"]}
            />
          </ListWrapper>
      </CustomPage>)
    )
}

export default AcademicPeriodPage;