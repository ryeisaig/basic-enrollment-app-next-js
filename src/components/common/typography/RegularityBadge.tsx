import { toTitle } from "@/utils/StringUtils";
import NotSpecified from "./NotSpecified";

export default function RegularityBadge(type: string, style?: any) {
    return(
      type ? <div style={{
        backgroundColor: type.toUpperCase() === "REGULAR" ? "#33eb91" : "#ed4b82", 
        padding: "5px",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "11px",
        width: "80px",
        textAlign: "center",
        fontWeight: "bold",
        ...style
      }}>{toTitle(type)}</div> : <NotSpecified />
    )
}