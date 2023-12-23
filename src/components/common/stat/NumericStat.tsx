import { CalendarMonthOutlined } from "@mui/icons-material"
import { Badge, Typography } from "@mui/material"

export type NumericStatProps = {
    text: string,
    color: string,
    value: number
}

export const NumericStat = (props: NumericStatProps) => {
    return (
        <div style={{padding: "0px"}}>
            <div style={{display: "inline-flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <Typography style={{fontSize: "80px", color: props.color, fontWeight: "bold"}}>{props.value}</Typography>
            </div>
            <Typography style={{fontSize: "11px", textAlign: "center"}}>{props?.text}</Typography>
        </div>
    )
}