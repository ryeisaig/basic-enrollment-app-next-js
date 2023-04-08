import theme from "@/config/theme";

export default function PageTitle(props: any) {
 return(
  <h2 style={{color: theme.palette.primary.main,marginTop: '0px', marginBottom: '10px'}}>{props.children}</h2>
 )
}