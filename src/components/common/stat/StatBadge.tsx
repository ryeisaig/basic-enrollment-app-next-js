import { CalendarMonthOutlined } from "@mui/icons-material"
import { Badge, Typography } from "@mui/material"

export type StatBadgeProps = {
    text: string,
    icon: any,
    color: string,
    badgeValue?: string,
    badgeColor?: any
}

export const StatBadge = (props: StatBadgeProps) => {
    return (
        <div style={{padding: "0px"}}>
            <div style={{display: "inline-flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <Badge badgeContent={props.badgeValue} overlap="circular" max={9999} color={props.badgeColor || "secondary"} style={{marginBottom: "5px"}}>
                    <props.icon style={{color: props.color, fontSize: "80px"}}/>
                </Badge>
            </div>
            <Typography style={{fontSize: "11px", textAlign: "center"}}>{props?.text}</Typography>
        </div>
    )
}