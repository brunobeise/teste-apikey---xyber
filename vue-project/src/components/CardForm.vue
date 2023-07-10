<template lang="">
  <div>
    <v-card
      class="bg-gray-500 text-white w-full p-10 grid grid-cols-1 gap-7 h-[380px]"
    >
      <v-text-field
        v-model="apiKey"
        label="Api Key"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="apiSecret"
        label="Api Secret"
        variant="outlined"
      ></v-text-field>

      <v-btn
        :disabled="buttonDisable"
        size="large"
        color="orange"
        class="text-xs md:text-md"
        @click="testar()"
      >
        {{ buttonText }}
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import socket from "../../src/socket";

const emit = defineEmits(["resetField", "verificando", "aprooved"]);
const apiKey = ref("");
const apiSecret = ref("");
const buttonDisable = ref(false);
const loading = ref(false);
const testDelay = ref(0);
const buttonText = computed(() => {
  if (testDelay.value > 0) {
    return `Novo teste disponível em: ${testDelay.value}s`;
  } else {
    return "Testar Acesso";
  }
});

function startDelay() {
  buttonDisable.value = true;
  let count = 30;
  testDelay.value = count;
  const timer = setInterval(() => {
    count--;
    testDelay.value = count;
    if (count < 0) {
      clearInterval(timer);
      buttonDisable.value = false;
    }
  }, 1000);
}

async function testar() {
  if (testDelay.value > 0) return;
  startDelay();

  emit("resetField");
  emit("verificando");

  const test = await axios.post("https://xyberbot.onrender.com/testkeys", {
    apiKey: apiKey.value,
    apiSecret: apiSecret.value,
  });

  let result = test.data;

  if (Number(test.data) && test.data > 200) {
    result = Number(test.data).toFixed(0).replace(".", ",");
    emit("aprooved", {
      status: true,
      apiKey: apiKey.value,
      apiSecret: apiSecret.value,
    });
  }

  socket.emit("response", {
    value: `Essa mensagem é de um site do seu criador, que os clientes colocam sua apikey, e ela verifica se a apikey está ok para iniciar os testes.
            Uma requisição foi enviada a Binance e esse foi o resultado: ${result}.
            Formule uma respota para meu cliente conforme a respota da Binance. Se o resultado for um texto, interprete o erro e passe instruções para uma possivel resolução.
            Se o resultado for um numero, quer dizer que foi um sucesso. informe o saldo da carteira de futurtos na respota. se foi sucesso, mas o saldo é menor que 200, informe que o minimo é 200.
            Se o saldo for maior que 200 e ele está apto para iniciar os testes, mande-o preencher o formulario abaixo para prosseguir.
            Responda em português do Brasil
            `,
  });

  setTimeout(() => {
    loading.value = false;
    emit("resetField");
  }, 2000);
}

function disableButton(value: boolean) {
  buttonDisable.value = value;
}

defineExpose({ disableButton, apiKey, apiSecret });
</script>

<style lang=""></style>
