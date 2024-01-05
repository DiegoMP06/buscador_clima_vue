import axios from "axios";
import { ref, computed } from "vue";

export default function useClima() {
    const clima = ref({});
    const ciudad = ref({});
    const cargando  = ref(false);
    const error = ref('');

    const obtenerClima = async ({ciudad: ciudadState, pais}) => {
        cargando.value = true;
        clima.value = {};
        ciudad.value = {};
        error.value = "";

        const key = import.meta.env.VITE_API_KEY;
        
        try {
            const urlLatLong = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudadState},${pais}&limit=1&appid=${key}`;

            const {data: [datosCiudad]} = await axios(urlLatLong);
            const {lat, lon} = datosCiudad;
            
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

            const {data: datosClima} = await axios(urlClima);

            ciudad.value = datosCiudad;
            clima.value = datosClima;
        } catch {
            error.value = "Ciudad No Encontrada";
        } finally {
            cargando.value = false;
        }
    }

    const formatearTemperatura = temperatura => (temperatura - 273.15).toFixed(2);

    const mostrarClima = computed(() => {
        return Object.values(clima.value).length !== 0 && Object.values(ciudad.value).length !== 0;
    })

    return {
        obtenerClima,
        clima,
        ciudad,
        mostrarClima,
        formatearTemperatura,
        cargando,
        error,
    };
}