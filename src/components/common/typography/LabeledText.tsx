import { Typography } from "@mui/material"
import * as StringUtils from '@/utils/StringUtils';
import NotSpecified from "./NotSpecified";

export type LabeledTextProps = {
    label: string,
    children: any,
    noFormat?: boolean
}

export const LabeledText = (props: LabeledTextProps) => {
    return (
        <div>
            <Typography style={{fontSize: "12px", fontWeight: "bold", color: "#757575"}}>{props?.label}</Typography>
            <Typography>{
                props?.children ?
                    props?.noFormat ?
                         props.children : 
                            typeof props.children === 'string' ?
                                 StringUtils.toTitle(props.children) :
                            props.children :
                    <NotSpecified style={{marginTop: "5px"}}/>
            }</Typography>
        </div>
    );
}