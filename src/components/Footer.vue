<script setup>
const datestr = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});
</script>

<style scoped>
footer {
  height: 44px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
}
</style>

<template>
  <footer>
    <p>
      © {{ datestr }} <i>Aren Windham</i> [<a href="about">about</a>] [<a
        href="contact"
        >contact</a
      >]
    </p>
  </footer>
</template>
