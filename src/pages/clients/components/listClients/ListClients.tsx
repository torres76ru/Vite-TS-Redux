import { Table } from "reactstrap";
import ModalClient from "../modalClient/ModalClient";
import RemoveClient from "../removeClient/RemoveClient";
import { Client } from "../../../../common/InterfaceClient";
import ModalFormContract from "../../../../components/modalFormContract/ModalFormContract";
import { InterfaceContract } from "../../../../common/InterfaceContract";

interface Props {
  clients: Client[];
  resetState: () => void;
  contracts: InterfaceContract[];
}

const ListClients = ({ clients, resetState, contracts }: Props) => {
  return (
    <Table dark>
      <thead>
        <tr>
          <th className="text-center">ФИО</th>
          <th className="text-center">Email</th>
          <th className="text-center">Псевдоним</th>
          <th className="text-center">
            <ModalClient resetState={resetState} />
          </th>
        </tr>
      </thead>
      <tbody>
        {!clients || clients.length <= 0 ? (
          <tr>
            <td colSpan={4} align="center">
              <b>Пока ничего нет</b>
            </td>
          </tr>
        ) : (
          clients.map((client) => (
            <tr key={client.pk}>
              <td>{client.fio}</td>
              <td>{client.email}</td>
              <td>{client.nickname}</td>
              <td align="center">
                <ModalFormContract client={client} contracts={contracts} />
                &nbsp;&nbsp;
                <ModalClient client={client} resetState={resetState} />
                &nbsp;&nbsp;
                <RemoveClient pk={client.pk} resetState={resetState} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ListClients;
