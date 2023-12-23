export default function PageSubtitle(props: any) {
 return(
  <h4 style={{color: "#808080", marginTop: '5px', marginBottom: '15px', ...props.style}}>{props.children}</h4>
 )
}