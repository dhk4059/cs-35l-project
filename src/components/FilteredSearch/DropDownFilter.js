import { DropdownButton, Dropdown } from "react-bootstrap";

// Dropdown element that takes a function from FilteredSearch.js
// Choosing from this DropDown determines which filter to
// sort the dorms by.

const DropDownFilter = ({ setFilter }) => {
  return (
    <center>
      <DropdownButton
        id="dropdown-basic-button"
        title="Choose a Housing Filter"
        menuVariant="dark"
      >
        <Dropdown.Item
          onClick={(event) => {
            event.preventDefault();
            setFilter("overallRating");
          }}
        >
          <h4>Overall Quality</h4>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(event) => {
            event.preventDefault();
            setFilter("essentialsQuality");
          }}
        >
          <h4>Quality of Essentials</h4>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(event) => {
            event.preventDefault();
            setFilter("foodAccess");
          }}
        >
          <h4>Access to Food</h4>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(event) => {
            event.preventDefault();
            setFilter("noiseLevel");
          }}
        >
          <h4>Noise Level</h4>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(event) => {
            event.preventDefault();
            setFilter("parkingProximity");
          }}
        >
          <h4>Proximity to Parking</h4>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(event) => {
            event.preventDefault();
            setFilter("uclaProximity");
          }}
        >
          <h4>Proximity to Campus</h4>
        </Dropdown.Item>
      </DropdownButton>
      <br />
    </center>
  );
};

export default DropDownFilter;
