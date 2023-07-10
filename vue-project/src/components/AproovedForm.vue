<template lang="">
  <v-card
    v-if="props.status"
    class="bg-gray-500 text-white w-full md:w-3/4 p-10 grid grid-cols-1 gap-7"
  >
    <v-text-field
      label="Api Key"
      disabled
      v-model="props.apiKey"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="props.apiSecret"
      label="Api Secret"
      disabled
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="name"
      label="Nome Completo"
      variant="outlined"
    ></v-text-field>
    <v-select
      label="Perfil de Investidor"
      v-model="perfil"
      :items="[
        'Super Conservador',
        'Conservador',
        'Arrojado',
        'Agressivo',
        'Super Agressivo',
      ]"
    ></v-select>
    <div class="grid grid-cols-2 gap-10">
      <v-text-field
        v-model="age"
        label="Idade"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="telegram"
        label="@ telegram"
        variant="outlined"
      ></v-text-field>
    </div>

    <v-btn
      :disabled="success"
      @click="sendData()"
      :loading="loading"
      size="large"
      color="orange"
      class="w-full"
    >
      Iniciar teste agora!!
    </v-btn>
    <v-alert
      v-if="success"
      type="success"
      text="Dados enviados com sucesso. Aguarde que o meu criador entrará em contato o mais breve possível."
    ></v-alert>
  </v-card>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const name = ref<string>();
const age = ref<string>();
const telegram = ref<string>();
const success = ref<boolean>(false);
const loading = ref<boolean>(false);
const perfil = ref<string>();
const props = defineProps<{
  status: boolean;
  apiKey: string;
  apiSecret: string;
}>();

async function sendData() {
  loading.value = true;
  const msg = await axios.post("https://xyberbot.onrender.com/message", {
    name: name.value,
    age: age.value,
    perfil: perfil.value,
    telegram: telegram.value,
    apiKey: props.apiKey,
    apiSecret: props.apiSecret,
  });
  loading.value = false;
  if (msg.status === 200) {
    success.value = true;
  }
}
</script>

<style lang=""></style>
