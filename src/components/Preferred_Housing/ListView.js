import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ListElement from "./ListElement";
import { Button } from "react-bootstrap";

const DNDArea = styled.div`
  margin: 4px;
  padding: 8px;
  flex-direction: column;
  width: 235px;
  overflow-y: auto;
  height: 50vh;
  background-color: #daebfe;
  border-radius: 20px;
`;
// visibility: ${(props) =>
// props.isVisible && props.columnOrder === "1" ? "hidden" : "visible"};
const ListView = (props) => {
  const [keyData, setKeyData] = useState([props.prefs, props.housingData]);
  const columnOrder = props.columnOrder;

  useEffect(() => {
    // if (props.isMakeDisabled) {
    //   props.disableMakeList();
    // }
    if (props.choice) {
      setKeyData([props.prefs, props.housingData]);
    } else {
      setKeyData([props.makePrefs, props.housingData]);
    }
  }, [
    props.listChoice,
    props.prefs,
    props.choice,
    props.housingData,
    props.isMakeDisabled,
    props.makePrefs,
  ]);

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
    // console.log(result);
    let columns = keyData;
    let start = columns[source.droppableId];
    let end = columns[destination.droppableId];
    columns[source.droppableId].splice(source.index, 1);

    if (start === end) {
      columns[source.droppableId].splice(destination.index, 0, draggableId);
    } else {
      columns[destination.droppableId].splice(
        destination.index,
        0,
        draggableId
      );
    }
    // console.log(columns[0]);
    props.showButton();
    if (props.choice) {
      props.newPrefs(columns[0]);
      if (props.isMakeDisabled) {
        props.newHousing(columns[1]);
      }
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
              <DNDArea columnOrder={columnID} key={columnID}>
                <Droppable droppableId={columnID}>
                  {(provided) => (
                    <div
                      style={{
                        padding: "8px",
                        flexGrow: 1,
                        minHeight: "400px",
                      }}
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
                    </div>
                  )}
                </Droppable>
              </DNDArea>
            );
          })}
          {props.choice ? (
            !props.isMakeDisabled ? (
              <div
                style={{
                  width: "235px",
                  margin: "4px",
                  padding: "8px",
                  borderRadius: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  backgroundColor: "#daebfe",
                }}
              >
                <Button
                  variant="outline-primary"
                  style={{ borderWidth: "3px" }}
                  onClick={props.disableMakeList}
                >
                  <h5 style={{ fontWeight: "bold", color: "black" }}>
                    Add More Dorms
                  </h5>
                </Button>
              </div>
            ) : (
              <DNDArea columnOrder={"1"} key={"1"}>
                <Droppable droppableId={"1"}>
                  {(provided) => (
                    <div
                      style={{
                        padding: "8px",
                        flexGrow: 1,
                        minHeight: "400px",
                        backgroundColor: "#daebfe",
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {props.housingData.map((house, index) => {
                        return (
                          <ListElement
                            key={house}
                            index={index}
                            houseKey={house}
                          ></ListElement>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DNDArea>
            )
          ) : null}
        </div>
      </div>
    </DragDropContext>
  );
};

export default ListView;
