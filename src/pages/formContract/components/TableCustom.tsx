import React from "react";
import { Button, Input, Table } from "reactstrap";

interface Props {
  rows: string[][];
  setRows: React.Dispatch<React.SetStateAction<string[][]>>;
}

const TableCustom = ({ rows, setRows }: Props) => {
  const handleAddRow = () => {
    setRows([...rows, ["", "", "", "", "", "", "", ""]]);
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
    const newRows = rows.filter((_, index) => index !== rowIndex);
    setRows(newRows);
  };

  return (
    <div>
      <div className="dtHorizontalWrapper">
        <Table id="dtHorizontal" width="100%" dark>
          <thead>
            <tr>
              <th>№</th>
              <th>Название Произведений/ Исполнений/ Фонограмм</th>
              <th>Автор музыки</th>
              <th>Автор текста</th>
              <th>Исполнитель</th>
              <th>Изготовитель Фонограмм</th>
              <th>Объем передаваемых авторских прав Лицензиара, в %</th>
              <th>Объем передаваемых смежных прав Лицензиара, в %</th>
              <th>Год выпуска</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    <Input
                      type="text"
                      value={cell}
                      onChange={handleEditCell(rowIndex, cellIndex)}
                    />
                  </td>
                ))}
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

export default TableCustom;
