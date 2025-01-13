<template>
    <div class="activity-card">
      <img :src="activity.image" :alt="activity.title" />
      <h3>{{ activity.title }}</h3>
      <p>{{ activity.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    activity: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .activity-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    max-width: 300px;
    text-align: left;
  }
  .activity-card img {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
  }
  .activity-card h3 {
    margin: 16px 0 8px;
  }
  .activity-card p {
    margin: 0;
  }
  </style>
  