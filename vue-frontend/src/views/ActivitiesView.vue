<template>
    <div>
      <h1>Activities</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else-if="loading" class="loading">Loading...</div>
      <div v-else class="activities">
        <ActivityCard v-for="activity in activities" :key="activity.id" :activity="activity" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ActivityCard from '../components/ActivityCard.vue';
  import ActivityService from '../services/activity';
  
  const activities = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchActivities = async () => {
    try {
      loading.value = true;
      activities.value = await ActivityService.getActivities();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchActivities);
  </script>
  
  <style scoped>
  .activities {
    display: flex;
    flex-wrap: wrap;
  }
  .loading,
  .error {
    color: red;
  }
  </style>
  