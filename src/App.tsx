import "./App.css";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <div className="App">
            <div
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Homepage />
            </div>
        </div>
    );
}

export default App;
