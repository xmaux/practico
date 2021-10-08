import React, {useState, useEffect} from 'react'

function Boton() {
    const [boton, setBoton] = useState([])
    const [cantLetras,setCantLetras] = useState('')
    const [letraEnviar, setLetraEnviar] = useState('')
    const [matcheds,setMatcheds] = useState([])
    const baseURL = 'https://back-sandbox.herokuapp.com/api'

    const alerta =() => {
        alert('hola carola');
    }    
    
    const onChangeLetter = (e) => {
        setLetraEnviar(e.target.value);
    }

    const startGame = async () =>{
        try {
            const response = await fetch (`${baseURL}/hanged-game/start`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWY3YmUxNGVmYmQ2MDAwNDg2ZWQ2YyIsImlhdCI6MTYzMzY0NzY1N30.GQue6x-Oz1kFBQnkLa7fXBAoj6CVhnJOOjzWsukRfcI"
                }
            })
            const json = await response.json();
            console.log(json);
            setCantLetras(json.data.totalWords)
            console.log(`cantidad letras ${json.data.totalWords}` )
        }catch (error) {
            alert(error)
        }
    }

    const sendLetter = async (Letter) => {
        try {
            const response = await fetch (`${baseURL}/hanged-game/try`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWY3YmUxNGVmYmQ2MDAwNDg2ZWQ2YyIsImlhdCI6MTYzMzY0NzY1N30.GQue6x-Oz1kFBQnkLa7fXBAoj6CVhnJOOjzWsukRfcI"
                },
                body: JSON.stringify({ "text": letraEnviar })
            })
            const json = await response.json();
            console.log(json);
            console.log(json.data.matcheds)
            setMatcheds(json.data.matcheds)
            setCantLetras(json.data.totalWords)
            console.log(`cantidad letras ${json.data.totalWords}` )
        }catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        /* const localToken = localStorage.getItem('token'); */
        document.title = `You clicked ${matcheds} times`;
    });

    return (
        <div>
            <button onClick={startGame}>Iniciar juego</button>
            <input type="text" onChange={onChangeLetter}/>
            <button onClick={sendLetter}>Enviar Letter</button>
            <h1>{cantLetras}</h1>
            <h1>{matcheds}</h1>
        </div>
    )
}

export default Boton