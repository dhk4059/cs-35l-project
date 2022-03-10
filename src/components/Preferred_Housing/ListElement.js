import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Creates a preferred list item that can
// be dragged within the Drag area defined
// by ListView.js

const Container = styled.div`
  margin: 8px;
  padding: 8px;
  margin-bottom: 8px;
  border: 3px solid;
  color: #ffd100;
  border-radius: 8px;
  background-color: #2774ae;
  transition: background-color 0.3s ease;
`;

const ListElement = (props) => {
  return (
    <Draggable draggableId={props.housingTitle} index={props.index}>
      {(provided, snapshot) => (
        <Link
          style={{
            textDecoration: "none",
          }}
          to={"/housing/" + props.housingTitle.toLowerCase().replace(' ', '-')}
          // This opens links in a new tab
          target="_blank"
        >
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <h6>{props.housingTitle}</h6>
          </Container>
        </Link>
      )}
    </Draggable>
  );
};

export default ListElement;
