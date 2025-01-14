<template>
  <div>
    <h1>Activities</h1>
    <input type="text" v-model="searchQuery" placeholder="Search activities..." class="search-input"/>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading" class="loading">Loading...</div>
    <div v-else class="activities">
      <div
        class="activity-card"
        v-for="activity in activities"
        :key="activity.id"
      >
        <img :src="activity.image" :alt="activity.title" />
        <h3>{{ activity.title }}</h3>
        <p>{{ activity.description }}</p>
        <p>Price: {{ activity.currency }}{{ activity.price }}</p>
        <p>Rating: {{ activity.rating }}</p>
        <p v-if="activity.specialOffer">Special Offer!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ActivityService from "../services/activity";

const activities = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');

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
.search-input{
  background: transparent;
  padding: 8px;
  width: 100%;
  height: 56px;
  cursor: text;
  border-color: #ccc;
  border-radius: 8px;
  border-style: ridge;
  color: #ccc;
  font-size: medium;
  margin: 16px;
}
</style>
