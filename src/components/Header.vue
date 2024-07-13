<template>
  <v-app-bar color="surface-variant">
    <template v-slot:prepend>
      <v-btn icon="mdi-menu" v-if="mobile" @click="drawer = !drawer"></v-btn>
    </template>

    <v-menu
      open-on-hover
      v-if="!mobile"
      v-for="(item, index) in items"
      :key="index">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> {{ item.title }} </v-btn>
      </template>
    </v-menu>

    <template v-slot:append>
      <v-btn icon="mdi-magnify"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" prominent>
    <v-btn
      v-show="!temItems[0].isFather"
      @click="
        temItems = items;
        console.log(temItems, items);
      "
      >返回</v-btn
    >
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, index) in temItems"
        :key="index"
        @click="if (item.children) temItems = item.children;"
        >{{ item.title }}</v-list-item
      >
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  VAppBar,
  VMenu,
  VList,
  VListItem,
  VBtn,
  VNavigationDrawer,
} from "vuetify/components";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();

interface ArrInterface {
  title: string;
  isFather?: boolean;
  children?: ArrInterface[];
}

const items = ref<ArrInterface[]>([
  {
    title: "中间件",
    isFather: true,
    children: [{ title: "基础类", children: [{ title: "tong-web" }] }],
  },
  {
    title: "网络信息安全",
    isFather: true,
    children: [{ title: "基础类", children: [{ title: "tong-web" }] }],
  },
  {
    title: "行业数字化",
    isFather: true,
    children: [{ title: "基础类", children: [{ title: "tong-web" }] }],
  },
  {
    title: "服务生态体系",
    isFather: true,
    children: [{ title: "基础类", children: [{ title: "tong-web" }] }],
  },
]);

let temItems = ref<ArrInterface[]>([...items.value]);

const drawer = ref(false);
</script>
<style scoped lang="scss"></style>
