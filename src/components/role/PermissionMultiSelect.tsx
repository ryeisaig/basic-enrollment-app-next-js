import { toTitle } from "@/utils/StringUtils";
import { Autocomplete, TextField } from "@mui/material";

export type MultiSelectProps = {
  value: string[];
  title?: string;
  column?: string;
  handler?: any;
  fullWidth?: boolean;
  style?: any;
  size?: "small" | "medium";
  required?: boolean;
}

export default function PermissionMultiSelect(props: MultiSelectProps){

    const RESOURCES = {
        STUDENTS: "students",
        COURSES: "courses",
        COLLEGES: "colleges",
        ACADEMIC_PERIODS: "academicPeriod",
        ROOMS: "rooms",
        INSTRUCTORS: "instructors",
        SECTIONS: "sections",
        CLASSES: "classes",
        GRADES: "grades",
        SUBJECTS: "subjects",
        USERS: "users",
        ROLES: "roles",
        ENROLLMENTS: "enrollments",
    }

    
    const PERMISSIONS = [
        { value: 'read', title: "View any"},
        { value: 'read-group', title: "View only under my college"},
        { value: 'create', title: "Create any"},
        { value: 'create-group', title: "Create only for my college"},
        { value: 'update', title: "Update any"},
        { value: 'update-group', title: "Update only under my college"},
        { value: 'delete', title: "Delete any"},
        { value: 'delete-group', title: "Delete only under my college"},

    ];

    const RESOURCE_PERMISSIONS = Object.values(RESOURCES).map(resource => {
        return PERMISSIONS.map(permission =>  { return { value: resource + "." + permission.value, title: toTitle(resource) + " - " + permission.title }} )
    }).flat();

    return (
        <Autocomplete
            multiple
            options={RESOURCE_PERMISSIONS}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            size="small"
            value={props.value && RESOURCE_PERMISSIONS.filter(p => props.value.includes(p.value))}
            onChange={(e, values) => props.handler(props.column, values.map(v => v.value))}
            renderInput={(params) => (
            <TextField
                {...params}
                label="Permissions"
                placeholder="Type a permission"
            />
        )}
      />
    );

}