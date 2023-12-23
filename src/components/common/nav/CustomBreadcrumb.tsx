import Link from "next/link";
import PageTitle from "../typography/PageTitle";
import { ChevronRightOutlined } from "@mui/icons-material";

export type CustomBreadcrumbProps = {
  links: [{
    path: string,
    title?: string,
  }],
  title?: string
};

export default function CustomBreadcrumb(props: CustomBreadcrumbProps) {
    return(
      <PageTitle>
        {
          props?.links.map(l => {
            return <>
              <Link href={l?.path} style={{textDecoration: "none"}}>{l?.title}</Link> 
              <ChevronRightOutlined style={{fontSize: "14px"}}/>  
            </>
          })
        }
        {props?.title}
      </PageTitle>
    )
}