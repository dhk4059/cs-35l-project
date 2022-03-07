import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ListElement from "./ListElement";
import housingData from "../../util/housingData";

const DNDArea = styled.div`
  margin: 8px;
  border: 3px solid blue;
  padding: 8px;
  flex-direction: column;
  min-width: 100px;
`;

const PrefList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const ListView = (props) => {
  const [keyData, setKeyData] = useState([
    props.prefs,
    Object.keys(housingData),
  ]);
  const columnOrder = props.columnOrder;

  useEffect(() => {
    setKeyData([props.prefs, Object.keys(housingData)]);
  }, [props.listChoice, props.prefs, props.choice]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // user drops item back into starting position,
    // so we don't do anything
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // reorder column
    console.log(result);
    let columns = keyData;
    let start = columns[source.droppableId];
    let end = columns[destination.droppableId];
    columns[source.droppableId].splice(source.index, 1);

    if (start === end) {
      columns[source.droppableId].splice(destination.index, 0, draggableId);
      if (props.choice) {
        props.showButton();
        props.newPrefs(keyData[0]);
      }
    } else {
      columns[destination.droppableId].splice(
        destination.index,
        0,
        draggableId
      );
    }
    setKeyData(columns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnOrder.map((columnID) => {
        const column = keyData[columnID];
        return (
          <DNDArea key={columnID}>
            <Droppable droppableId={columnID}>
              {(provided) => (
                <PrefList ref={provided.innerRef} {...provided.droppableProps}>
                  {column.map((house, index) => {
                    return (
                      <ListElement
                        key={house}
                        index={index}
                        houseKey={house}
                      ></ListElement>
                    );
                  })}
                  {provided.placeholder}
                </PrefList>
              )}
            </Droppable>
          </DNDArea>
        );
      })}
    </DragDropContext>
  );
};

export default ListView;
