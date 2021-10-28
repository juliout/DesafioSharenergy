import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../../components/HamburgerMenu';
import './usina.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Api } from '../../api';


export default function Usina() {
  //consts 

  const [hamburger, setHamburger] = useState(false)
  const [data, setData] = useState([]);
  const [option, setOption] = useState("tensao_V")
  
  function openHamburger(){
    if (hamburger === false){
      setHamburger(true)
    }
    if (hamburger === true){
      setHamburger(false)
    }
  }

  useEffect(() => {

    function loadGrafic(){
      Api.get('dadosusina')
      .then((r) => {
        setData(r.data)
       })    
    }
    loadGrafic()

  },[])  
  return (
    <>
      <img src="/images/menu.png" alt="Menu" className='menuHam' onClick={()=>{openHamburger()}}/>

      {hamburger ? <HamburgerMenu/> : null}

      <div className='usinaContainer'>
        <div className="menuInputs">
          <ul className='gOption'>
            <li>
              <button onClick={()=>{setOption('tensao_V')}}>Tensão</button>
            </li>
            <li>
              <button onClick={()=>{setOption('corrente_A')}}>Corrente</button>
            </li>
            <li>
              <button onClick={()=>{setOption('potencia_kW')}}>Potencia</button>
            </li>
            <li>            
              <button onClick={()=>{setOption('temperatura_C')}}>Temperatura</button>
            </li>
          </ul>
        </div>
        
        <div className="divGrafico">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tempo_h"/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={option} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>
    </>
  );
}