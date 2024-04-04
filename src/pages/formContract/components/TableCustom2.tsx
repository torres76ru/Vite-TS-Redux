import React from "react";
import { Button, Input, Table } from "reactstrap";

interface Props {
  rows: tableMultimedia[];
  setRows: React.Dispatch<React.SetStateAction<tableMultimedia[]>>;
}

export interface tableMultimedia {
  image: File;
  col2: string;
  col3: string;
}

const TableCustom2 = ({ rows, setRows }: Props) => {
  const handleAddRow = () => {
    setRows([...rows, { image: new File([], ""), col2: "", col3: "" }]);
  };

  const handleEditCell =
    (rowIndex: number, fieldName: keyof tableMultimedia) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === "file") console.log(event.target.files);
      const newRows = rows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [fieldName]:
                event.target.name === "file"
                  ? event.target.files![0]
                  : event.target.value
            }
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
              <th>Описание дизайна макета и/или фотографии</th>
              <th>Обладатель исключительных прав (ФИО)</th>
              <th>Год обнародования</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                <td>
                  <Input
                    type="file"
                    name="file"
                    onChange={handleEditCell(rowIndex, "image")}
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={row.col2}
                    onChange={handleEditCell(rowIndex, "col2")}
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={row.col3}
                    onChange={handleEditCell(rowIndex, "col3")}
                  />
                </td>
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
