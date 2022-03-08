import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ListElement from "./ListElement";

const DNDArea = styled.div`
  margin: 8px;
  border: 3px solid blue;
  padding: 8px;
  flex-direction: column;
  min-width: 200px;
  overflow-y: auto;
  min-height: 400px;
  max-height: 50vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

const PrefList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 400px;
`;

const ListView = (props) => {
  const [keyData, setKeyData] = useState([props.prefs, props.housingData]);
  const columnOrder = props.columnOrder;

  useEffect(() => {
    if (props.choice) {
      setKeyData([props.prefs, props.housingData]);
    } else {
      setKeyData([props.makePrefs, props.housingData]);
    }
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
    } else {
      if (destination.droppableId !== "trash") {
        columns[destination.droppableId].splice(
          destination.index,
          0,
          draggableId
        );
      }
    }
    console.log(columns[0]);
    props.showButton();
    if (props.choice) {
      props.newPrefs(columns[0]);
    } else {
      props.newMakePrefs(columns[0]);
      props.newHousing(columns[1]);
    }
    setKeyData(columns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div style={{ display: "flex" }}>
          {columnOrder.map((columnID) => {
            const column = keyData[columnID];
            return (
              <DNDArea key={columnID}>
                <Droppable droppableId={columnID}>
                  {(provided) => (
                    <PrefList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
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
        </div>
        <div
          style={{
            flexGrow: 1,
            height: "25vh",
            border: "3px solid black",
            width: "200px",
          }}
        >
          <Droppable droppableId={"trash"}>
            {(provided) => (
              <PrefList ref={provided.innerRef} {...provided.droppableProps}>
                Trash
                {provided.placeholder}
              </PrefList>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ListView;
