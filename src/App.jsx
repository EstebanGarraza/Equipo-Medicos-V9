
import { useState } from "react";

const sedes = {
  "Catamarca": generarRangos([[201, 210], [301, 310], [401, 410], [501, 510], [601, 610]]),
  "Venezuela": generarRangos([[1, 4], [101, 110], [201, 210], [301, 310], [401, 406]]),
  "Mexico": ["210", "310"],
  "Amenábar": generarRangos([[101, 103], [201, 206], [301, 306], [401, 406]]),
  "Remeo": generarRangos([[101, 115], [200, 207], [300, 307], [400, 411]]),
  "Ulme": generarRangos([[101, 114], [201, 214], [301, 310], [401, 406]]),
  "Basilea": generarRangos([[11, 18], [21, 28], [31, 38], [41, 48]]),
  "Azurduy": generarRangos([[101, 120], [201, 221], [301, 321]]),
  "Centro del Parque": generarRangos([[1, 23]]),
};

function generarRangos(rangos) {
  return rangos.flatMap(([start, end]) => {
    const width = Math.max(start, end).toString().length;
    return Array.from({ length: end - start + 1 }, (_, i) =>
      (start + i).toString().padStart(width, "0")
    );
  });
}

export default function App() {
  const [codigo, setCodigo] = useState("");
  const [sede, setSede] = useState("");
  const [habitacion, setHabitacion] = useState("");
  const [paciente, setPaciente] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (!codigo || !sede || !habitacion || !paciente) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    console.log({ codigo, sede, habitacion, paciente });
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setCodigo("");
    setSede("");
    setHabitacion("");
    setPaciente("");
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Registro de Ubicación</h1>

        <input
          type="text"
          placeholder="Código del equipo"
          className="w-full p-2 border border-orange-400 bg-orange-50 rounded"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <select
          className="w-full p-2 border border-orange-400 bg-orange-100 rounded"
          value={sede}
          onChange={(e) => {
            setSede(e.target.value);
            setHabitacion("");
          }}
        >
          <option value="">Seleccionar sede</option>
          {Object.keys(sedes).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          className="w-full p-2 border border-orange-300 bg-gray-100 rounded"
          value={habitacion}
          onChange={(e) => setHabitacion(e.target.value)}
          disabled={!sede}
        >
          <option value="">Seleccionar habitación</option>
          {sede && sedes[sede].map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nombre del paciente"
          className="w-full p-2 border border-orange-400 bg-orange-50 rounded"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
        />

        <button
          onClick={handleEnviar}
          className="w-full bg-orange-500 text-white font-semibold p-2 rounded hover:bg-orange-600"
        >
          Enviar
        </button>

        {enviado && <p className="text-green-600 text-center">Datos enviados correctamente.</p>}
      </div>
    </div>
  );
}
