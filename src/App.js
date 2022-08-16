import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./store/auth-Context";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const { userIsLoggedIn } = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        {userIsLoggedIn && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}

        {!userIsLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
