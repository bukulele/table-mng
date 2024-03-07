import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
} from "@table-library/react-table-library/table";
import DRIVERS_TABLE_FIELDS from "@/app/tableData/driversTable";
import { useTheme } from "@table-library/react-table-library/theme";
import styles from "./tableContainer.module.css";
import {
  useSort,
  HeaderCellSort,
  SortIconPositions,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import copy from "copy-to-clipboard";
import Button from "../button/Button";
import HideColumnsModal from "../modalContainer/HideColumnsModal";

function TableContainer({ data }) {
  const [search, setSearch] = useState("");
  const [showCopyDataWindow, setShowCopyDataWindow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const timeoutRef = useRef(null);

  const THEME = {
    Table: `
      width: fit-content;
      max-width: 100%;
      grid-template-columns: repeat(${
        DRIVERS_TABLE_FIELDS.length - hiddenColumns.length
      }, auto);
      color: grey;
      grid-column-start: 1;
      grid-column-end: 3;
      height: fit-content;
      max-height: 100%;
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
          font-size: 14px;
          min-width: 90px;
          max-width: 200px;
          padding: 5px;
          white-space: break-spaces;
          text-align: center;
          overflow: unset;
          margin: auto;
    }
    `,
    Cell: `
    width: 100%;
    height: 30px;
    div {
          min-width: 90px;
          max-width: 200px;
          overflow: clip;
          padding: 5px;
          display: flex;
          justify-content: center;
          height: 100%;
          border-bottom: 1px solid gray;
  }
    `,
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const tableData = {
    nodes: [...data].filter(
      (item) =>
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.driver_id.toLowerCase().includes(search.toLowerCase()) ||
        item.phone_number.toString().includes(search.toString())
    ),
  };

  const theme = useTheme(THEME);

  const sort = useSort(
    tableData,
    {
      onChange: () => {},
    },
    {
      sortFns: {
        id: (array) =>
          array.sort((a, b) => {
            return a.id - b.id;
          }),
        driver_id: (array) =>
          array.sort((a, b) => a.driver_id.localeCompare(b.driver_id)),
        email: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
        status: (array) =>
          array.sort((a, b) => a.status.localeCompare(b.status)),
        status_note: (array) =>
          array.sort((a, b) => a.status_note.localeCompare(b.status_note)),
        first_name: (array) =>
          array.sort((a, b) => a.first_name.localeCompare(b.first_name)),
        last_name: (array) =>
          array.sort((a, b) => a.last_name.localeCompare(b.last_name)),
        phone_number: (array) =>
          array.sort((a, b) => a.phone_number - b.phone_number),
        date_of_birth: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.date_of_birth);
            let dateB = new Date(b.date_of_birth);
            return Number(dateA) - Number(dateB);
          }),
        hiring_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.hiring_date);
            let dateB = new Date(b.hiring_date);
            return Number(dateA) - Number(dateB);
          }),
        date_of_leaving: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.date_of_leaving);
            let dateB = new Date(b.date_of_leaving);
            return Number(dateA) - Number(dateB);
          }),
        reason_for_leaving: (array) =>
          array.sort((a, b) =>
            a.reason_for_leaving.localeCompare(b.reason_for_leaving)
          ),
        drivers_license_number: (array) =>
          array.sort((a, b) =>
            a.drivers_license_number.localeCompare(b.drivers_license_number)
          ),
        // license_scan: (array) =>
        //   array.sort((a, b) => a.license_scan - b.license_scan),
        dl_province: (array) =>
          array.sort((a, b) => a.dl_province.localeCompare(b.dl_province)),
        dl_expiration_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.dl_expiration_date);
            let dateB = new Date(b.dl_expiration_date);
            return Number(dateA) - Number(dateB);
          }),
        abstract_issue_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.abstract_issue_date);
            let dateB = new Date(b.abstract_issue_date);
            return Number(dateA) - Number(dateB);
          }),
        // abstract_scan: (array) =>
        //   array.sort((a, b) => a.abstract_scan - b.abstract_scan),
        // criminal_record_check_scan: (array) =>
        //   array.sort(
        //     (a, b) => a.criminal_record_check_scan - b.criminal_record_check_scan
        //   ),
        criminal_record_check_expiration_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.criminal_record_check_expiration_date);
            let dateB = new Date(b.criminal_record_check_expiration_date);
            return Number(dateA) - Number(dateB);
          }),
        tdg_card_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.tdg_card_date);
            let dateB = new Date(b.tdg_card_date);
            return Number(dateA) - Number(dateB);
          }),
        good_to_go_card_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.good_to_go_card_date);
            let dateB = new Date(b.good_to_go_card_date);
            return Number(dateA) - Number(dateB);
          }),
        pre_employment_road_test_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.pre_employment_road_test_date);
            let dateB = new Date(b.pre_employment_road_test_date);
            return Number(dateA) - Number(dateB);
          }),
        application_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.application_date);
            let dateB = new Date(b.application_date);
            return Number(dateA) - Number(dateB);
          }),
        // reference_check_application: (array) =>
        //   array.sort(
        //     (a, b) =>
        //       a.reference_check_application - b.reference_check_application
        //   ),
        // consent_to_personal_investigation: (array) =>
        //   array.sort(
        //     (a, b) =>
        //       a.consent_to_personal_investigation -
        //       b.consent_to_personal_investigation
        //   ),
        log_book_reviewed_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.log_book_reviewed_date);
            let dateB = new Date(b.log_book_reviewed_date);
            return Number(dateA) - Number(dateB);
          }),
        // certificate_of_violations_scan: (array) =>
        //   array.sort(
        //     (a, b) =>
        //       a.certificate_of_violations_scan -
        //       b.certificate_of_violations_scan
        //   ),
        // annual_driver_performance_review: (array) =>
        //   array.sort(
        //     (a, b) =>
        //       a.annual_driver_performance_review -
        //       b.annual_driver_performance_review
        //   ),
        winter_course_completion_date: (array) =>
          array.sort((a, b) => {
            let dateA = new Date(a.winter_course_completion_date);
            let dateB = new Date(b.winter_course_completion_date);
            return Number(dateA) - Number(dateB);
          }),
        winter_course_results: (array) =>
          array.sort((a, b) => {
            if (
              a.winter_course_results === null ||
              b.winter_course_results === null
            )
              return -1;
            return a.winter_course_results.localeCompare(
              b.winter_course_results
            );
          }),
        // remarks_comments: (array) =>
        //   array.sort((a, b) => a.remarks_comments - b.remarks_comments),
        file_box_number: (array) =>
          array.sort((a, b) => a.file_box_number - b.file_box_number),
      },
    }
  );

  const createTableHeader = () => {
    let tableColumns = DRIVERS_TABLE_FIELDS.map((item) => {
      if (item.sort) {
        return (
          <HeaderCellSort
            hide={hiddenColumns.includes(item.dataName)}
            sortKey={item.dataKey}
            key={`header_${item.dataName}`}
          >
            {item.dataName}
          </HeaderCellSort>
        );
      } else {
        return (
          <HeaderCell
            hide={hiddenColumns.includes(item.dataName)}
            key={`header_${item.dataName}`}
          >
            {item.dataName}
          </HeaderCell>
        );
      }
    });
    return tableColumns;
  };

  const handleCellClick = (data) => {
    clearTimeout(timeoutRef.current);
    setShowCopyDataWindow(true);
    copy(data);
    timeoutRef.current = setTimeout(() => {
      setShowCopyDataWindow(false);
    }, 3000);
    console.log(data);
  };

  const fillTableRow = (driver) => {
    let tableRowCells = DRIVERS_TABLE_FIELDS.map((field, index) => {
      let copyCell = false;
      if (field.dataKey === "phone_number" || field.dataKey === "email") {
        copyCell = true;
      }
      return (
        <Cell
          hide={hiddenColumns.includes(field.dataName)}
          className={styles.cell}
          key={`cell_${driver.id}_${index}`}
          onClick={
            copyCell ? () => handleCellClick(driver[field.dataKey]) : null
          }
        >
          {driver[field.dataKey]}
        </Cell>
      );
    });
    return tableRowCells;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    let columnsToHide = DRIVERS_TABLE_FIELDS.map((item) => {
      if (!item.show) {
        return item.dataName;
      }
    }).filter((item) => item);
    setHiddenColumns(columnsToHide);
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBarContainer}>
          <label htmlFor="search">Search:</label>
          <input
            className={styles.searchBar}
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <p className={styles.searchDescription}>
          Search by Driver ID, First Name, Last Name or phone number{" "}
        </p>
      </div>
      <div className={styles.chooseColumnsWrapper}>
        <Button
          content={"Choose columns"}
          fn={openModal}
          style={"classicButton"}
        />
      </div>
      <Table
        data={tableData}
        theme={theme}
        sort={sort}
        layout={{
          custom: true,
          horizontalScroll: true,
          fixedHeader: true,
        }}
      >
        {(tableList) => {
          return (
            <>
              <Header>
                <HeaderRow>{createTableHeader()}</HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row
                    className={item.status === "TR" ? styles.red : ""}
                    key={item.id}
                    item={item}
                  >
                    {fillTableRow(item)}
                  </Row>
                ))}
              </Body>
            </>
          );
        }}
      </Table>
      {showCopyDataWindow && (
        <div
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "4px",
          }}
        >
          Data copied to clipboard
        </div>
      )}
      <HideColumnsModal
        tableData={DRIVERS_TABLE_FIELDS}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
}

export default TableContainer;
