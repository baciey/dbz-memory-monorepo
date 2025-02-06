import React, { useEffect, useState } from "react";
import { Avatar, DataTable, Icon, Text, useTheme } from "react-native-paper";
import { ThemedTableProps } from "./ThemedTable.types";
import { ScrollView, View } from "react-native";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { styles } from "./ThemedTable.styles";
import { useGetImages } from "../../hooks/useGetImages";
import { shouldDisplayWinIcon } from "./ThemedTable.utils";
import {
  DEFAULT_ITEMS_PER_PAGE,
  DESKTOP_TABLE_HEIGHT_DIVIDER,
  ITEMS_PER_PAGE_OPTIONS,
  MOBILE_TABLE_HEIGHT_DIVIDER,
  PAGINATION_DESKTOP_WIDTH,
  PAGINATION_MOBILE_WIDTH,
  PAGINATION_OPACITY_THRESHOLD,
} from "./ThemedTable.const";

export const ThemedTable = ({ config, data }: ThemedTableProps) => {
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const theme = useTheme();
  const { publicUrl } = useGetImages();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage, data]);

  const { height: screenHeight, isMobile } = useGetScreenDimensions();
  const tableHeightDivider = isMobile
    ? MOBILE_TABLE_HEIGHT_DIVIDER
    : DESKTOP_TABLE_HEIGHT_DIVIDER;

  return (
    <>
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
            {data.length ? (
              <ScrollView
                nestedScrollEnabled
                style={{ height: screenHeight / tableHeightDivider }}
              >
                {data.slice(from, to).map((item, index) => (
                  <DataTable.Row
                    key={item.id || index}
                    style={styles.cursorAuto}
                  >
                    {config.map((column) => {
                      const cellWidth = column.columnWidth;
                      const value =
                        column.rowId === "index"
                          ? index + 1
                          : item[column.rowId];

                      const avatarUrl =
                        column.rowId === "avatarUrl" && publicUrl
                          ? publicUrl + item["avatarUrl"]
                          : null;

                      const isWinIcon = shouldDisplayWinIcon(
                        column.rowId,
                        item,
                      );

                      return (
                        <DataTable.Cell
                          key={column.rowId}
                          style={[{ minWidth: cellWidth }, styles.cursorAuto]}
                        >
                          {avatarUrl ? (
                            <Avatar.Image
                              size={35}
                              source={{ uri: avatarUrl }}
                            />
                          ) : (
                            <Text>{value}</Text>
                          )}
                          {isWinIcon && (
                            <View style={styles.iconContainer}>
                              <Icon
                                source="trophy"
                                size={20}
                                color="lightgreen"
                              />
                            </View>
                          )}
                        </DataTable.Cell>
                      );
                    })}
                  </DataTable.Row>
                ))}
              </ScrollView>
            ) : null}

            {/* Pagination */}
            <DataTable.Pagination
              style={[
                styles.pagination,
                {
                  width: isMobile
                    ? PAGINATION_MOBILE_WIDTH
                    : PAGINATION_DESKTOP_WIDTH,
                  opacity: data.length > PAGINATION_OPACITY_THRESHOLD ? 1 : 0,
                },
              ]}
              page={page}
              numberOfPages={Math.ceil(data.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${data.length}`}
              numberOfItemsPerPageList={ITEMS_PER_PAGE_OPTIONS}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </ScrollView>
      </View>
      {!data.length && (
        <View style={styles.noDataContainer}>
          <Text
            variant="headlineSmall"
            style={[
              styles.noDataText,
              {
                color: theme.colors.onSurfaceDisabled,
              },
            ]}
          >
            No data
          </Text>
          <Icon
            source="file-alert-outline"
            size={32}
            color={theme.colors.onSurfaceDisabled}
          />
        </View>
      )}
    </>
  );
};
