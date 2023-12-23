import { Grid } from "@mui/material"

export const Grouper = (props?: any) => {
    return (
        Array.isArray(props?.children) ? props.children.map((child:any) => {
            return (
            <Grid item xs={12 / props.children.length}>
                {child}
            </Grid>
            )
        }): <Grid item xs={12}>{props?.children}</Grid>
    )
}