import { getList } from "@/actions/CoreActions";
import { withPagePermission } from "@/components/auth/withPermission";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import SectionDataToolBar from "@/components/section/SectionDataToolBar";
import SectionModal from "@/components/section/SectionModal";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";

function SectionPage() {
    return withPagePermission(["sections.read","sections.read-group"],
      <CustomPage>
          <PageTitle>Sections</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <SectionDataToolBar />       
            <DefaultDataList 
              resource={Resources.SECTIONS}
              title="Sections"
              modal={(open: boolean, onClose: any, data: any) => <SectionModal title={"Edit Section"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.SECTION.PRIMARY}
              refresh={getList}
              editPermissions={["sections.update","sections.update-group"]}
              deletePermissions={["sections.delete","sections.delete-group"]}
            />
          </ListWrapper>
      </CustomPage>
    )
}

export default SectionPage;