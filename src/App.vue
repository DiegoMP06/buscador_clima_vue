<script setup>
    import useClima from './composables/useClima';
    import Formulario from './components/Formulario.vue';
    import Clima from './components/Clima.vue';
    import Spinner from './components/Spinner.vue';
    import Alerta from './components/Alerta.vue';

    const {obtenerClima, clima, ciudad, mostrarClima, cargando, error} = useClima();
</script>

<template>
    <h1 class="titulo">Buscador de Clima</h1>

    <div class="contenedor buscador-clima">
        <Formulario
            @obtener-clima="obtenerClima"
        />

        <Spinner 
            v-if="cargando"
        />

        <Clima
            v-if="mostrarClima"
            :clima="clima"
            :ciudad="ciudad"
        />
        
        <Alerta 
            v-if="Error"
        >
            {{ error }}
        </Alerta>
    </div>
</template>