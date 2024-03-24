import { Container } from "reactstrap";
import ListTags from "./components/listTags/ListTags";
import { InterfaceTag } from "../../common/InterfaceTag";

interface Props {
  tags: InterfaceTag[];
  resetState: () => void;
}

const Tags = (props: Props) => {
  return (
    <Container>
      <ListTags tags={props.tags} resetState={props.resetState} />
    </Container>
  );
};

export default Tags;
