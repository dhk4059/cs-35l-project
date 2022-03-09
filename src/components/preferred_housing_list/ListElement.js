import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import housingData from "../../util/housingData";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "green" : "white")};
  transition: background-color 0.3s ease;
`;

const ListElement = (props) => {
  return (
    <Draggable draggableId={props.houseKey} index={props.index}>
      {(provided, snapshot) => (
        <Link
          style={{
            textDecoration: "none",
          }}
          to={"/" + props.houseKey}
          // This opens links in a new tab
          target="_blank"
        >
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <h6 style={{ color: snapshot.isDragging ? "white" : "black" }}>
              {housingData[props.houseKey]}
            </h6>
          </Container>
        </Link>
      )}
    </Draggable>
  );
};

export default ListElement;
