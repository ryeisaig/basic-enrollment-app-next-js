import { Avatar } from '@mui/material';

export default function AvatarDisplay(avatar?: string) {
    return <Avatar src={`../api/files/${avatar}`} style={{width: "30px", height: "30px"}}/>
}