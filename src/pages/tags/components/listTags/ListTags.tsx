import { Table } from "reactstrap";
import { InterfaceTag } from "../../../../common/InterfaceTag";
import RemoveTag from "../removeTag/RemoveTag";
import AddTag from "../addTag/AddTag";

interface Props {
  tags: InterfaceTag[];
  resetState: () => void;
}

const ListTags = ({ tags, resetState }: Props) => {
  return (
    <Table dark>
      <thead>
        <tr>
          <th className="text-center">Тег</th>
          <th className="text-center">
            <AddTag resetState={resetState} />
          </th>
        </tr>
      </thead>
      <tbody>
        {!tags || tags.length <= 0 ? (
          <tr>
            <td colSpan={2} align="center">
              <b>Пока ничего нет</b>
            </td>
          </tr>
        ) : (
          tags.map((tag) => (
            <tr key={tag.pk}>
              <td>{tag.tag_name}</td>
              <td align="center">
                <RemoveTag pk={tag.pk} resetState={resetState} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ListTags;
