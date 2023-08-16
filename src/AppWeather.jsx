import { useState } from "react"

export const AppWeather = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_key = 'c08bcd3e66fc477f23ca04fcbe9037d4'
    const [ciudad, setCiudad] = useState('')
    const [data, setData] = useState(null)


    const cambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&units=metric&appid=${API_key}&lang=es`)
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log('dio el siguiente error: ', error)
        }
    }

    return (
        <div className="container">
            <h1>Descubrí el clima de tu ciudad</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={ciudad}
                    onChange={cambioCiudad}
                    placeholder="Nombre de la ciudad ej: Londres, Buenos Aires"
                />
                <button type="submit">Buscar</button>
            </form>

            {
                data && (
                    <div>
                        <h2>{data.name}</h2>
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }/>
                        <p>Temperatura actual: {data.main.temp}°C</p>
                        <p>Sensación térmica: {data.main.feels_like}°C</p>
                        <p>Condición meteorológica: {data.weather[0].description}</p>
                        <p>Humedad: {data.main.humidity}%</p>
                    </div>
                )
            }
        </div>
    )
}
