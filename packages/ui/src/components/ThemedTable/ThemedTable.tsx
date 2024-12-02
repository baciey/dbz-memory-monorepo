import React, { useEffect, useState } from "react";
import { DataTable, useTheme } from "react-native-paper";
import { ThemedTableProps } from "./ThemedTable.types";
import { ScrollView, View } from "react-native";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { styles } from "./ThemedTable.styles";

const numberOfItemsPerPageList = [5, 10, 20];

export const ThemedTable = ({ config, data }: ThemedTableProps) => {
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const theme = useTheme();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage, data]);

  const { height: screenHeight, isMobile } = useGetScreenDimensions();
  const tableHeightDivider = isMobile ? 3 : 2.5;

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: isMobile ? "flex-start" : "center",
        },
      ]}
    >
      <ScrollView horizontal nestedScrollEnabled style={styles.scrollview}>
        <DataTable>
          {/* Table Header */}
          <DataTable.Header>
            {config.map((column) => (
              <DataTable.Title
                key={column.header}
                style={{ minWidth: column.columnWidth }}
              >
                {column.header}
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {/* Table Rows */}
          <ScrollView
            nestedScrollEnabled
            style={{ height: screenHeight / tableHeightDivider }}
          >
            {data.slice(from, to).map((item, index) => (
              <DataTable.Row key={item.id || index}>
                {config.map((column) => {
                  const cellWidth = column.columnWidth;
                  const value =
                    column.rowId === "index" ? index + 1 : item[column.rowId];

                  let textColor = theme.colors.onBackground;
                  if (
                    (column.rowId === "player1Name" ||
                      column.rowId === "player1Score") &&
                    item.player1Score > item.player2Score
                  ) {
                    textColor = "green";
                  } else if (
                    (column.rowId === "player2Name" ||
                      column.rowId === "player2Score") &&
                    item.player2Score > item.player1Score
                  ) {
                    textColor = "green";
                  } else if (
                    (column.rowId === "player1Name" ||
                      column.rowId === "player1Score") &&
                    item.player1Score < item.player2Score
                  ) {
                    textColor = theme.colors.error;
                  } else if (
                    (column.rowId === "player2Name" ||
                      column.rowId === "player2Score") &&
                    item.player2Score < item.player1Score
                  ) {
                    textColor = theme.colors.error;
                  }

                  return (
                    <DataTable.Cell
                      key={column.rowId}
                      style={{ minWidth: cellWidth }}
                      textStyle={{ color: textColor }}
                    >
                      {value}
                    </DataTable.Cell>
                  );
                })}
              </DataTable.Row>
            ))}
          </ScrollView>

          {/* Pagination */}
          <DataTable.Pagination
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: isMobile ? 320 : "100%",
            }}
            page={page}
            numberOfPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${data.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};
