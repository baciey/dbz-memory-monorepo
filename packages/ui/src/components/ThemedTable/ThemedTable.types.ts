export type ThemedTableProps = {
  config: {
    header: string;
    columnWidth: number;
    rowId: string;
  }[];

  data: DataItem[];
};

export type DataItem = Record<string, string | number | null>;
