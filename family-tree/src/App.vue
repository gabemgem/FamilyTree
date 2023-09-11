<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app id="family-tree">
    <v-app-bar>
      <v-container class="fill-height d-flex align-center">
        <v-app-bar-title class="text-no-wrap">Family Tree</v-app-bar-title>
        <v-btn variant="text">
          <RouterLink to="/">Home</RouterLink>
        </v-btn>
        <v-btn variant="text">
          <RouterLink to="/about">About</RouterLink>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
