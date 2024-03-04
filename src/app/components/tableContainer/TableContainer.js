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

function TableContainer({ data }) {
  const COLUMNS = [
    "ID",
    "Status",
    "Email",
    "FirstName",
    "LastName",
    "PhoneNumber",
    "DateOfBirth",
    "HiringDate",
    "DateOfLeaving",
    "ReasonForLeaving",
    "DriversLicenseNumber",
    "DriversLicenseScan",
    "DLProvince",
    "DLExpirationDate",
    "Abstract",
    "Routes",
    "CriminalRecordCheck",
    "CriminalRecordCheckExpiration",
    "TDGCardDate",
    "GoodToGoCardDate",
    "PreEmploymentRoadTestDate",
    "ApplicationDate",
    "ReferenceCheckApplication",
    "ConsentToPersonalInvestigation",
    "LogBookReviewedDate",
    "CertificateOfViolations",
    "AnnualDriverPerformanceReview",
    "WinterCourseCompletionDate",
    "Remarks",
    "FileBoxNumber",
  ];

  const createTableHeader = () => {
    let tableColumns = COLUMNS.map((item) => {
      return <HeaderCell key={`header_${item}`}>{item}</HeaderCell>;
    });
    return tableColumns;
  };

  const fillTableRow = (item) => {
    // console.log(item);
    let tableRowCells = Object.keys(item).map((key, index) => {
      console.log(key, item[key]);
      return <Cell key={`cell_${item.ID}_${index}`}>{item[key]}</Cell>;
    });
    return tableRowCells;
  };

  return (
    <div>
      {data ? (
        <Table data={{ nodes: [...data] }}>
          {(tableList) => {
            return (
              <>
                <Header>
                  <HeaderRow>{createTableHeader()}</HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item) => (
                    <Row key={item.ID} item={item}>
                      {fillTableRow(item)}
                    </Row>
                  ))}
                </Body>
              </>
            );
          }}
        </Table>
      ) : null}
    </div>
  );
}

export default TableContainer;
