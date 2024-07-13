<template>
  <main
    class="pt-navHeight outline-none relative transition-[opacity,transform,filter] ease-out-cubic duration-[400ms] duration-[300ms]">
    <v-btn
      prepend-icon="$vuetify"
      variant="tonal"
      @click="
        () => {
          current === 'en' ? (current = 'zhHans') : (current = 'en');
        }
      ">
      {{ current === "en" ? "中文" : "English" }}
    </v-btn>
    <v-date-picker></v-date-picker>
    <v-carousel>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover></v-carousel-item>
    </v-carousel>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div class="grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      <v-img
        v-for="item in 30"
        :key="item"
        aspect-ratio="3/4"
        class="w-full h-[200px]"
        cover
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLocale } from "vuetify";
import { VBtn } from "vuetify/components/VBtn";
import { VDatePicker } from "vuetify/components/VDatePicker";
import { VCarousel, VCarouselItem } from "vuetify/components/VCarousel";
import { VImg } from "vuetify/components/VImg";

defineOptions({
  name: "home",
});

const { current } = useLocale();
</script>
<style scoped lang="scss"></style>
