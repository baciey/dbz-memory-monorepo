export type ThemedTableProps = {
  config: {
    header: string;
    columnWidth: number;
    rowId: string;
  }[];
  data: Record<string, string | number>[];
};
