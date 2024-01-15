import { Avatar } from '@mui/material';

export default function AvatarDisplay(avatar?: any) {
    return <Avatar src={avatar && `../api/files/${avatar}`} style={{width: "30px", height: "30px"}}/>
}