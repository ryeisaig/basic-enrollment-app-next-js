import * as React from 'react';
import DefaultList, { Column, ExtendedListProps } from '../common/list/DefaultList';

export interface RecentActionPropss extends ExtendedListProps {
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export const ACTION_COLUMNS: Column[] = [
  { key: "actionType"},
  { key: "resourceType"},
  { key: "resourceId", title: "Resource ID"},
  { key: "timestamp"},
  { key: "device"},
  { key: "ipAddress", title: "IP Address"},
];

export default function RecentActionList(props: RecentActionPropss) {
  const [data, setData] = React.useState([]);
  return (
    <DefaultList columns={ACTION_COLUMNS} data={data} totalElements={data.length} inner={props.inner} />
  );
}