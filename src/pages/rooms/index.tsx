import { getList } from "@/actions/CoreActions";
import { withPagePermission } from "@/components/auth/withPermission";
import DefaultDataList from "@/components/common/list/DefaultPageList";
import PageTitle from "@/components/common/typography/PageTitle";
import CustomPage from "@/components/common/wrapper/CustomPage";
import ListWrapper from "@/components/common/wrapper/ListWrapper";
import RoomDataToolBar from "@/components/room/RoomDataToolBar";
import RoomModal from "@/components/room/RoomModal";
import { Resources } from "@/utils/ApiConstants";
import * as DefaultColumns from "@/utils/DefaultColumns";
import { Divider } from "@mui/material";

function RoomPage() {
    return withPagePermission(["rooms.read","rooms.read-group"],
      <CustomPage>
          <PageTitle>Rooms</PageTitle>
          <Divider style={{marginBottom: '10px'}}/>
          <ListWrapper>
            <RoomDataToolBar /> 
            <DefaultDataList 
              resource={Resources.ROOMS}
              title="Rooms"
              modal={(open: boolean, onClose: any, data: any) => <RoomModal title={"Edit Room"} 
                data={data} 
                open={open} 
                onClose={onClose}
              />}
              columns={DefaultColumns.ROOM.PRIMARY}
              refresh={getList}
              editPermissions={["rooms.update","rooms.update-group"]}
              deletePermissions={["rooms.delete","rooms.delete-group"]}
            />
          </ListWrapper>
      </CustomPage>
    )
}

export default RoomPage;