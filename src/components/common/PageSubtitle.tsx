import theme from "@/config/theme";

export default function PageSubtitle(props: any) {
 return(
  <h4 style={{color: theme.palette.secondary.main, marginTop: '5px', marginBottom: '10px'}}>{props.children}</h4>
 )
}