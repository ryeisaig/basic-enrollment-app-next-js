export default function NotSpecified(props: any) {
    return(
      <div style={{
        backgroundColor: "#bdbdbd", 
        padding: "1px",
        borderRadius: "5px",
        color: "#fff",
        fontSize: "11px",
        width: "85px",
        textAlign: "center",
        fontWeight: "bold",
        ...props?.style
      }}>Not Specified</div>
    )
}