import React from "react";
import { Button, Input, Table } from "reactstrap";

interface Props {
  rows: string[][];
  setRows: React.Dispatch<React.SetStateAction<string[][]>>;
}

const TableCustom2 = ({ rows, setRows }: Props) => {
  const handleAddRow = () => {
    setRows([...rows, ["", "", "", ""]]);
  };

  const handleEditCell =
    (rowIndex: number, cellIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRows = rows.map((row, index) =>
        index === rowIndex
          ? row.map((cell, idx) =>
              idx === cellIndex ? event.target.value : cell
            )
          : row
      );
      setRows(newRows);
    };

  const handleDeleteRow = (rowIndex: number) => {
    const newRows = rows.filter((row, index) => index !== rowIndex);
    setRows(newRows);
  };

  return (
    <div>
      <div className="dtHorizontalWrapper">
        <Table id="dtHorizontal" width="100%" dark>
          <thead>
            <tr>
              <th>№</th>
              <th>Описание дизайна макета и/или фотографии</th>
              <th colSpan={2}>Обладатель исключительных прав (ФИО)</th>
              <th>Год обнародования</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <td key={cellIndex}>
                      <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        onChange={handleEditCell(rowIndex, cellIndex)}
                      />
                    </td>
                  ) : (
                    <td key={cellIndex}>
                      <Input
                        type="text"
                        value={cell}
                        onChange={handleEditCell(rowIndex, cellIndex)}
                      />
                    </td>
                  )
                )}
                <td>
                  <Button
                    color="primary"
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button
        color="primary"
        style={{ minWidth: "200px" }}
        onClick={handleAddRow}
      >
        Добавить строку
      </Button>
    </div>
  );
};

export default TableCustom2;
