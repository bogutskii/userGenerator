import "./styles.css";

export default function App() {
  const list = {
    id: null,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    },
    phone: "",
    website: "",
    company: {
      name: "Romaguera-Crona"
    }
  };
  return (
    <div className="App">
      <div>
        <input type="number" />
        <label> how many users </label>
      </div>
      <ul className="checkbox-list">
        {Object.keys(list).map((el) => (
          <li>
            <input type="checkbox" />
            <label>{el}</label>
          </li>
        ))}
      </ul>
      <button>Generate</button>

      <h2>exemple</h2>
    </div>
  );
}
