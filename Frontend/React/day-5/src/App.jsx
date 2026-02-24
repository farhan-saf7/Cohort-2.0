import Navbar from "./components/Navbar"
import Men from "./components/Men"
import Women from "./components/Women"


function App() {
  const user1 = {
    gender: "male"
  }

  const user2 = {
    gender: "female"
  }

  function btnClick() {
    console.log("button is clicked")
  }

  return (
    <>
      <Navbar name="Farhan" color='red' links={["Home", "Accounts", "About"]} />
      {user1.gender == "male" ? <Men /> : <Women />}

      <Navbar name="Farhana" color='green' links={["Home", "Accounts", "About"]} />
      {user2.gender == "male" ? <Men /> : <Women />}

      <button onClick={btnClick} className="active:scale-95 bg-emerald-500 px-2 py-2 m-10 rounded-2xl">Click Here</button>
    </>
  )
}

export default App
