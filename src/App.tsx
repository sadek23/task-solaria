import image from './assets/0-floor.png';
import svgOverlay from './assets/0-floor.svg';
import Polygon from './components/Polygon';
import data from './assets/data.json'
import {polygons} from './helper.tsx'
import { useEffect, useState } from 'react';
function App() {
  const [selectedPrice,setSelectedPrice] = useState(100000)
  const [listPolygons,setListPolygons] = useState([])
  const [status, setStatus] = useState("available");
  const [prices,setPrices] = useState([])
  useEffect(()=>{
    let arrPrices = []
    let updatedPolygons = polygons.forEach(polygon => {
      data.forEach(item => {
        if(item.code == polygon.dataCode){
         polygon.price = item.price
         polygon.status = item.status
        }
        arrPrices.push(item.price)
      });
   });
   setPrices(arrPrices)
   setListPolygons(updatedPolygons);
  const newFilteredPolygons = polygons.filter(polygon => polygon.price <= selectedPrice && polygon.status == status);
  setListPolygons(newFilteredPolygons);
  },[selectedPrice,status, polygons])



  const handleChangePrice=(e)=>{
    console.log(e.target.value)
    setSelectedPrice(e.target.value)
  }
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };




  return (
    <div className="w-[100%]">
      <h1 className="text-xl font-bold text-[#ff0000] underline">
      Filter Units
    </h1>
      {/* <img style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        objectFit: 'cover'
      }} src={image} /> */}
      <div className="grid grid-cols-2">
      <div>
      <input type="range" onChange={handleChangePrice} min={1000} max={100000} value={selectedPrice}/>
      <div>{selectedPrice}</div>
      </div>
      <div>
      <select id="status" name="status" value={status} onChange={handleStatusChange}>
  <option value="reserved">Reserved</option>
  <option value="sold">Sold</option>
  <option value="available">Available</option>
</select>
</div>
      </div>
      <div className='w-[100%]'>
      <Polygon polygons={listPolygons} />
      </div>
{/* <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="flex flex-row items-centerjustify-center bg-[#000000] w-[500px]">text</div> */}
      {/* <img style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }} src={svgOverlay} /> */}
    </div>
  )
}

export default App
