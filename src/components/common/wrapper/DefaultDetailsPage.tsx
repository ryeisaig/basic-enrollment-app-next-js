import { withPagePermission } from "@/components/auth/withPermission"
import { getColumnChunks } from "@/utils/ArrayUtils"
import * as StringUtils from '@/utils/StringUtils'
import { Divider, Grid, Paper } from "@mui/material"
import CustomBreadcrumb from "../nav/CustomBreadcrumb"
import { LabeledText } from "../typography/LabeledText"
import PageSubtitle from "../typography/PageSubtitle"
import CustomPage from "./CustomPage"
import { Grouper } from "./Grouper"

export type CustomDetailsPageProps<T> = {
    permissions: string[],
    title: string,
    breadcrumbLinks: any,
    data: T,
    actions: any,
    avatar?: any,
    primaryColumns: Array<
        {
            column: string,
            presentation?: any,
            label?: string,
            full?: boolean
        }
    >,
    primaryColSize?: number,
    stats: any[],
    otherColumns: Array<
        {
            column: string,
            presentation?: any,
            label?: string,
            full?: boolean
        }
    >,
    otherColSize?: number,
    children?: any
}

export default function DefaultDetailsPage(props: CustomDetailsPageProps<any>){
    return props.data && withPagePermission(props.permissions,
        <CustomPage>
            <div style={{paddingRight: "15px"}}>
                {...props.actions}
            </div>
            <CustomBreadcrumb title={props.title} links={props.breadcrumbLinks} />
            <Divider style={{marginBottom: '10px', marginTop: '10px'}}/>
            <div style={{padding: "15px", paddingTop: "0px"}}>
            <Grid container>
              <Grouper>
                <Grid container>
                  <Grid item xs={3}>
                    {props.avatar}
                  </Grid>
                  <Grid item xs={9}>
                    <div>
                      <PageSubtitle>Primary Information</PageSubtitle>
                      <Grid container spacing={2}>
                        {
                            getColumnChunks(props.primaryColumns, props.primaryColSize || 3).map((chunk, index) => {
                                return (
                                    <Grouper key={index}>
                                        {
                                            chunk.map((col:any) => {
                                                return <LabeledText key={col.column} label={col.label || StringUtils.toTitle(col.column)}>{
                                                    col.presentation ? col.presentation(props.data[col.column]) : props.data[col.column]
                                                }</LabeledText>;
                                            })
                                        }
                                    </Grouper>
                                )
                            })
                        }
                      </Grid>
                    </div>
                  </Grid>   
                 {
                    props.stats?.map(stat => {
                        return (
                            <Grid key={stat} item xs={3} style={{paddingTop: "40px"}}>
                                {stat}
                            </Grid>
                        )
                    })
                 }
                </Grid>
                <Paper elevation={3} style={{marginTop: "20px", float:"right", padding: "40px", paddingTop: "20px", paddingRight: "0px", width: "fit-content"}}>
                  <PageSubtitle>Other Information</PageSubtitle>
                  <Grid container spacing={2} style={{maxWidth: "640px"}}>
                    {
                        getColumnChunks(props.otherColumns, props.otherColSize || 3).map(chunk => {
                            return <Grouper>
                                {
                                    chunk.map((col:any) => {
                                        return <LabeledText label={col.label || StringUtils.toTitle(col.column)}>{
                                            col.presentation ? col.presentation(props.data[col.column]) : props.data[col.column]
                                        }</LabeledText>;
                                    })
                                }
                            </Grouper>
                        })

                    }
                  </Grid>
                </Paper>
              </Grouper>
            </Grid>
            {...props.children}
          </div>
        </CustomPage>
    )
}