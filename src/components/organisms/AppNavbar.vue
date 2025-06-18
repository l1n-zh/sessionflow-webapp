<template>
  <nav class="bg-stone-50 border border-neutral-300 rounded-b-xl">
    <div class="max-w-7xl ml-5">
      <div class="flex items-center justify-between h-16">
        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="flex items-baseline space-x-1 border-1 rounded-lg border-slate-300 p-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.path"
              :class="[
                'px-6 py-0.5 rounded-md textransition-colors',
                $route.path === item.path
                  ? 'bg-primary text-white font-medium'
                  : 'text-neutral-500 hover:text-primary hover:bg-primary/5'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <BaseIcon :icon="mobileMenuOpen ? ICONS.CLOSE : ICONS.MENU" size="lg" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-300">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'block px-3 py-2 rounded-md text-base font-medium transition-colors',
            $route.path === item.path
              ? 'bg-primary text-white'
              : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
          ]"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseIcon from '@/components/atoms/BaseIcon.vue';
import { ICONS } from '@/constants/icons';

const mobileMenuOpen = ref(false);

const navigationItems = [
  { name: '任務', path: '/tasks' },
  { name: '排程', path: '/schedule' },
  { name: '紀錄', path: '/session-records' },
  { name: 'Sandbox', path: '/sandbox' }
];
</script> 