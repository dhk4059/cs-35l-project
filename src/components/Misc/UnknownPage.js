// Unknown Page for "404 Errors", or in other words,
// when the DB call for the id params returns null.
// In other words, this renders for unknown urls.

const UnknownPage = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", paddingTop: "10vh" }}
    >
      <h1 style={{ color: "red", fontSize: 70 }}>Page Not Found</h1>
    </div>
  );
};

export default UnknownPage;
