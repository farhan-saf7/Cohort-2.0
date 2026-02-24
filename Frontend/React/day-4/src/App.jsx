import Card from './components/card'
import img1 from './components/img1.jpg'

function App() {
  return (
    <>
      <div className='flex'>

        <Card username="Farhan" image={img1} desc="Farhan is my name and im from highland colony sopore" />
        <Card username="Farhan" image={img1} desc="Farhan is my name and im from highland colony sopore" />
        <Card username="Farhan" image={img1} desc="Farhan is my name and im from highland colony sopore" />
        <Card username="Farhan" image={img1} desc="Farhan is my name and im from highland colony sopore" />
      </div>
    </>
  )
}

export default App
