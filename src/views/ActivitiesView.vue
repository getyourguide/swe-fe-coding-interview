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
        <p v-if="suppliersById[activity.supplierId]" class="supplier"><i>by</i> {{ suppliersById[activity.supplierId].name }}</p>
        <p>Price: {{ activity.currency }}{{ activity.price }}</p>
        <p>Rating: {{ activity.rating }}</p>
        <p v-if="activity.specialOffer">Special Offer!</p>
        <button @click="applyDiscount(activity)">Apply Discount</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ActivityService from '../services/activity';
import { getSuppliers, validateSupplier } from '../services/suppliers';
import type { Activity } from '@/types/activity';
import type { Supplier } from '@/types/supplier';

const activities = ref<Activity[]>([]);
const suppliersById = ref<Record<number, Supplier>>({});
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');

const fetchActivities = async () => {
  try {
    loading.value = true;
    activities.value = await ActivityService.getActivities();
  } catch (err) {
    error.value = (err as any)?.message;
  } finally {
    loading.value = false;
  }
};

const fetchSuppliers = async () => {
  try {
    loading.value = true;
    const suppliers = await getSuppliers();
    suppliers.forEach((supplier) => {
      validateSupplier(supplier);
      suppliersById.value[supplier.id] = supplier;
    });
  } catch (err) {
    error.value = (err as any)?.message;
  } finally {
    loading.value = false;
  }
};

const applyDiscount = (activity) => {
  activity.price = calculateDiscountedPrice(activity.price, activity.discounts);
};

const calculateDiscountedPrice = (originalPrice: number, discounts: Activity['discounts']) => {
return originalPrice;
};

onMounted(async () => {
  await fetchActivities();
  await fetchSuppliers();
});
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
.activity-card .supplier {
  margin-bottom: 4px;
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
