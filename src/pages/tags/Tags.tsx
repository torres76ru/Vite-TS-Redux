import { Container } from "reactstrap";
import ListTags from "./components/listTags/ListTags";
import { InterfaceTag } from "../../common/InterfaceTag";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";

interface Props {
  tags: InterfaceTag[];
  setTags: (tags: InterfaceTag[]) => void;
}

const Tags = (props: Props) => {
  const [loadState, setLoadState] = useState<boolean>(false);
  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    axios
      .get(API_URL + "tags/")
      .then((data) => {
        props.setTags(data.data);
        setLoadState(true);
      })
      .catch(() => {
        props.setTags([]);
        setLoadState(false);
      });
  };

  const resetState = () => {
    getTags();
  };
  return (
    <Container>
      {loadState && <ListTags tags={props.tags} resetState={resetState} />}
    </Container>
  );
};

export default Tags;
