<!-- App.vue -->
<template>
  <v-layout class="rounded rounded-md">
    <Header />
    <v-main style="min-height: 300px">
      <router-view v-slot="{ Component }">
        <keep-alive :include="include" :exclude="excludes">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { VLayout, VMain } from "vuetify/components";
import Header from "./components/Header.vue";
import { excludes } from "@/router/keepAlive";
const include = ["home"];
</script>
