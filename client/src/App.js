import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./sections/index";
import { Home, Sign, SignUp, MyArticles,MyAccount } from "./pages/index";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Header  />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign" element={<Sign  />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/MyArticles" element={<MyArticles />} />
            <Route path="/MyAccount" element={<MyAccount />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </>
  );
}

export default App;