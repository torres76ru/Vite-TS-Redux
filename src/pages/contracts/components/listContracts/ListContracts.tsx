import { Button, Table } from "reactstrap";
import { InterfaceContract } from "../../../../common/InterfaceContract";
import ModalContract from "../modalContract/ModalContract";
import RemoveContract from "../removeContract/RemoveContract";

interface Props {
  contracts: InterfaceContract[];
  resetState: () => void;
}

const ListContracts = ({ contracts, resetState }: Props) => {
  return (
    <Table dark>
      <thead>
        <tr>
          <th className="text-center">Договор</th>
          <th className="text-center">
            <ModalContract resetState={resetState} />
          </th>
        </tr>
      </thead>
      <tbody>
        {!contracts || contracts.length <= 0 ? (
          <tr>
            <td colSpan={2} align="center">
              <b>Пока ничего нет</b>
            </td>
          </tr>
        ) : (
          contracts.map((contract) => (
            <tr key={contract.pk}>
              <td>{contract.name}</td>
              <td align="center">
                <Button href={contract.file}>Скачать</Button>
                &nbsp;&nbsp;
                <RemoveContract pk={contract.pk} resetState={resetState} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ListContracts;
