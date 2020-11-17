import React, { useEffect, useState } from "react";
import "./table.scss";
import Popup from "../popup/popup";

function Table({ headers, rows, collectionRef }) {
  const [popup, setPopup] = useState(false);
  const [rowDetail, setRow] = useState([]);
  const clickRow = (rowData) => {
    setRow(rowData);
    setPopup(true);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header.Tag ? header.Tag : <p>{header.title}</p>}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(rows).map(([keyRow, valueRow], rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => {
                clickRow([keyRow, valueRow]);
              }}
            >
              {Object.entries(valueRow).map(([keyCol, valueCol], colIndex) =>
                headers[colIndex] ? (
                  <td key={colIndex}>
                    {headers[colIndex].colIdentify == "status" ? (
                      <p className={"s"+valueRow[headers[colIndex].colIdentify]}></p>
                    ) : (
                      valueRow[headers[colIndex].colIdentify]
                    )}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Popup
        data={rowDetail}
        open={popup}
        setOpen={setPopup}
        collectionRef={collectionRef}
      />
    </div>
  );
}

export default Table;
