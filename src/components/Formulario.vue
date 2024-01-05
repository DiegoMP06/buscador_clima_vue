<script setup>
    import { reactive, ref } from 'vue';
    import Alerta from './Alerta.vue';

    const emit = defineEmits([
        'obtener-clima'
    ]);

    const busqueda = reactive({
        ciudad: '',
        pais: '',
    });
    const error = ref('');

    const paises = [
        { codigo: 'US', nombre: 'Estados Unidos' },
        { codigo: 'MX', nombre: 'México' },
        { codigo: 'AR', nombre: 'Argentina' },
        { codigo: 'CO', nombre: 'Colombia' },
        { codigo: 'CR', nombre: 'Costa Rica' },
        { codigo: 'ES', nombre: 'España' },
        { codigo: 'PE', nombre: 'Perú' }
    ]

    const consultarClima = () => {
        if(Object.values(busqueda).includes('')) {
            error.value = 'Todos Los Campos Son Obligatorios';
            return;
        }

        error.value  = "";
        emit('obtener-clima', busqueda);
    }
</script>

<template>
    <form class="formulario" @submit.prevent="consultarClima">
        <Alerta v-if="error">
            {{ error }}
        </Alerta>

        <div class="campo">
            <label for="ciudad">Ciudad: </label>

            <input 
                type="text" 
                name="ciudad" 
                id="ciudad" 
                placeholder="Ciudad"
                v-model="busqueda.ciudad"
            />
        </div>
        
        <div class="campo">
            <label for="pais">Pais: </label>

            <select 
                name="pais" 
                id="pais"
                v-model="busqueda.pais"
            >
                <option value="" selected disabled>-- Seleccione Pais --</option>
                <option v-for="pais in paises" :value="pais.codigo">{{ pais.nombre }}</option>
            </select>
        </div>

        <input type="submit" value="Consultar Clima">
    </form>
</template>