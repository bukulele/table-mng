import React from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import DRIVERS_TABLE_FIELDS from "@/app/tableData/driversTable";
import { useTheme } from "@table-library/react-table-library/theme";
import styles from "./tableContainer.module.css";

function TableContainer({ data }) {
  const THEME = {
    Table: `
      max-width: 100%;
      grid-template-columns: repeat(${DRIVERS_TABLE_FIELDS.length}, auto);
      color: grey;
    `,
    Header: `
      color: black;
    `,
    HeaderRow: `
    `,
    Row: `
      &:hover {
        color: black;
      }
    `,
    HeaderCell: `
    width: 100%;
    div {
          width: fit-content;
          max-width: 200px;
          padding: 5px;
          white-space: break-spaces;
          text-align: center;
          overflow: unset;
    }
    `,
    Cell: `
    width: 100%;
    div {
          width: fit-content;
          max-width: 200px;
          overflow: clip;
          padding: 5px;
          display: flex;
          justify-content: center;
  }
    `,
  };
  const theme = useTheme(THEME);

  const createTableHeader = () => {
    let tableColumns = DRIVERS_TABLE_FIELDS.map((item) => {
      return (
        <HeaderCell className={styles.cell} key={`header_${item.dataName}`}>
          {item.dataName}
        </HeaderCell>
      );
    });
    return tableColumns;
  };

  const fillTableRow = (driver) => {
    let tableRowCells = DRIVERS_TABLE_FIELDS.map((field) => {
      return (
        <Cell
          className={styles.cell}
          key={`cell_${driver.id}_${field.dataKey}`}
        >
          {driver[field.dataKey]}
        </Cell>
      );
    });
    return tableRowCells;
  };

  return (
    <div className={styles.tableContainer}>
      {data ? (
        <Table data={{ nodes: [...data] }} theme={theme}>
          {(tableList) => {
            return (
              <>
                <Header>
                  <HeaderRow>{createTableHeader()}</HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item) => (
                    <Row key={item.id} item={item}>
                      {fillTableRow(item)}
                    </Row>
                  ))}
                </Body>
              </>
            );
          }}
        </Table>
      ) : (
        <div>NO DATA</div>
      )}
    </div>
  );
}

export default TableContainer;
