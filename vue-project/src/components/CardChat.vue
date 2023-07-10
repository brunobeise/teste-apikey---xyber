<script setup lang="ts">
import { ref, watch } from "vue";
import socket from "@/socket";

const xyberText = ref("");
const recebidas = ref<string[]>([]);
const digitando = ref("");

const resetField = () => {
  xyberText.value = "";
};

const verificandoField = () => {
  const n = Math.floor(Math.random() * 4);
  const options = [
    "Testando suas Chaves...",
    "Verificando APIkeys...",
    "Tentando acessar sua conta...",
    "Verificando acesso...",
  ];
  xyberText.value = "";
  digitar(options[n]);
};

defineExpose({ resetField, verificandoField });

function digitar(texto: string) {
  let index = 0;
  const delay = 30;
  digitando.value = texto;

  const digitarCaractere = () => {
    if (index < texto.length) {
      xyberText.value += texto[index];
      index++;
      setTimeout(digitarCaractere, delay);
    } else {
      if (recebidas.value[0]) {
        digitar(recebidas.value[0]);
        recebidas.value.shift();
      } else {
        digitando.value = "";
      }
    }
  };

  digitarCaractere();
}

socket.on("response", (data) => {
  recebidas.value.push(data.value);

  if (!digitando.value) {
    digitando.value = recebidas.value[0];
    recebidas.value.shift();
    digitar(digitando.value);
  }
});
</script>

<template>
  <div class="position-relative">
    <img
      src="../assets/xyber.png"
      class="position-absolute top-[-30%] md:top-[-40%] left-1/2 w-72 transform -translate-x-1/2"
    />
    <v-card class="bg-gray-500 text-white w-full p-10 h-[500px] md:h-[380px]">
      <h5 class="text-gray-100 text-left text-xl font-mono">
        {{ xyberText }}
      </h5>
    </v-card>
  </div>
</template>

<style scoped>
/* Seus estilos personalizados */
</style>
