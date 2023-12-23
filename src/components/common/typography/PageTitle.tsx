import theme from "@/config/theme";

export default function PageTitle(props: any) {
 return(
  <h2 style={{fontSize: '20px', color: theme.palette.primary.main,marginTop: '0px', marginBottom: '10px', ...props.style}}>{props.children}</h2>
 )
}