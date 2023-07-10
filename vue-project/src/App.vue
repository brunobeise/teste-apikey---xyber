<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import CardForm from "./components/CardForm.vue";
import CardChat from "./components/CardChat.vue";
import AproovedForm from "./components/AproovedForm.vue";
import { ref } from "vue";
</script>

<template>
  <div>
    <h1 class="text-5xl md:text-6xl xl:text-7xl mx-10 mt-10">Xyber Bot</h1>
  </div>
  <div>
    <h2 class="text-2xl mx-10 my-10">Teste Grátis</h2>
  </div>

  <div class="grid grid-cols-1 gap-20 mt-15 md:grid-cols-2">
    <CardForm
      @resetField="resetField()"
      @verificando="verificandoField()"
      @aprooved="aproove"
      ref="cardFormRef"
    />
    <!-- ... -->
    <CardChat ref="cardChatRef" />
  </div>
  <div class="flex justify-center mt-10">
    <AproovedForm
      :apiKey="aprooved.apiKey"
      :apiSecret="aprooved.apiSecret"
      :status="!aprooved.status"
    />
  </div>
</template>

<script lang="ts">
const cardChatRef = ref<any>(null);
const cardFormRef = ref<any>(null);
const aprooved = ref({ status: false, apiKey: "", apiSecret: "" });

export default {
  methods: {
    resetField() {
      cardChatRef.value.resetField();
    },
    verificandoField() {
      cardChatRef.value.verificandoField();
    },
    aproove(value: any) {
      setTimeout(() => {
        aprooved.value = {
          status: true,
          apiKey: value.apiKey,
          apiSecret: value.apiSecret,
        };
      }, 1);
    },
  },
};
</script>
