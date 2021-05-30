import {useAuth0} from "@auth0/auth0-react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogOutButton";
import Profile from "./Profile";
import PaymentButton from "./PaymentButton";

function App() {
  const paymentButton = useAuth0().isAuthenticated && <PaymentButton/>;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
      </header>
      {paymentButton}
    </div>
  );
}

export default App;
