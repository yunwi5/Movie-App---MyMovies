import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MovieContextProvider } from "./store/movie-context";
import { AuthContextProvider } from "./store/auth-context";
import "./styles/Main.scss";

ReactDOM.render(
	<BrowserRouter>
		<AuthContextProvider>
			<MovieContextProvider>
				<App />
			</MovieContextProvider>
		</AuthContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
