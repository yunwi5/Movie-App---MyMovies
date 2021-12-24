import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/Main.css";
import App from "./App";
import { MovieContextProvider } from "./store/movie-context";
import { AuthContextProvider } from "./store/auth-context";

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
