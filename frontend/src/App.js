import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hangman from "./pages/hangman";
import Tateti from "./pages/tateti";
import Rpsls from "./pages/rpsls";
import Lobby from "./pages/lobby";
import Paint from "./pages/paint";
import FunZone from "./pages/funZone/index"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exac path="/tateti/rooms/join/:id" component={Tateti} />
          <Route exac path="/tateti" component={Tateti} />
          <Route exac path="/hangman" component={Hangman} />
          <Route exac path="/rpsls/rooms/join/:id" component={Rpsls} />
          <Route exac path="/rpsls/" component={Rpsls} />
          <Route exac path="/paint" component={Paint} />
          <Route exac path="/funZone" component={FunZone} />
          <Route exac path="/" component={Lobby} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;