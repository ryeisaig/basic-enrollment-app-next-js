import { withFunctionalPermission, withPagePermission } from "@/components/auth/withPermission"
import { getColumnChunks } from "@/utils/ArrayUtils"
import * as StringUtils from '@/utils/StringUtils'
import { Button, Divider, Grid, Paper } from "@mui/material"
import CustomBreadcrumb from "../nav/CustomBreadcrumb"
import { LabeledText } from "../typography/LabeledText"
import PageSubtitle from "../typography/PageSubtitle"
import CustomPage from "./CustomPage"
import { Grouper } from "./Grouper"
import { styled } from '@mui/material/styles';
import { CloudUploadOutlined } from "@mui/icons-material"

export type CustomDetailsPageProps<T> = {
    resource: string,
    permissions: string[],
    title: string,
    breadcrumbLinks: any,
    data: T,
    actions: any,
    avatar?: any,
    uploadAvatar?: any,
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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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
                    {
                        withFunctionalPermission(
                            <Button sx={{fontSize: "12px", marginTop: "6px"}} component="label" startIcon={<CloudUploadOutlined />}>
                                Upload Photo
                                <VisuallyHiddenInput type="file" onChange={(e) => e.target.files?.[0] && props.uploadAvatar(e.target.files?.[0])} />
                            </Button>, [`${props.resource}.update`,`${props.resource}.update-group`]
                        )
                    }
                  
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