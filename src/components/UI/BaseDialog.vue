<template>
  <teleport to="body">
    <div v-if="show" class="backdrop" @click="tryClose"></div>
    <dialog open v-if="show">
      <header class="closeModal">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu class="actions">
        <base-button class="closeButton" @click="tryClose">Close</base-button>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    tryClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

header {
  background-color: #15202b;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 30%;
  width: 40%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #15202b;
}

.closeModal {
  border-bottom: solid 1px #38444d;
  padding: 1rem;
}
.closeButton {
  border: none;
  outline: none;
  color: #1da1f2;
  background-color: #15202b;
  padding: 10px;
}
.closeButton:hover {
  background-color: rgba(29, 161, 242, 0.2);
  border-radius: 9999px;
}
</style>
