<script setup>
const datestr = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});
</script>

<template>
  <footer>
    <p>
      © {{ datestr }} <i>Aren Windham</i> [<a href="/about">about</a>] [<a
        href="/contact"
        >contact</a
      >]
    </p>
  </footer>
</template>
