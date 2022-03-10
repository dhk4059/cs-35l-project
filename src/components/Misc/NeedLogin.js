// Page that displays in place of Preferred Housing 
// when user is not logged in, as non-users shouldn't
// be able to view/create user-specific lists

const NeedLogin = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", paddingTop: "10vh" }}
    >
      <h1 style={{ color: "red", fontSize: 70 }}>Login to View This Page.</h1>
    </div>
  );
};

export default NeedLogin;
