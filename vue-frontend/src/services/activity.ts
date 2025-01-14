import { Activity } from "@/types/activity";

export default {
    async getActivities(): Promise<Activity[]> {
      try {
        const dataSource = Math.random() > 0.5 ? '/activities.json' : '/activitiesV2.json';
        const response = await fetch(dataSource);
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
        let activities = [];
        if (data.some(activity => activity.supplierId > 200)) {
          activities = data;
        }
        return activities as Activity[];
      } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
      }
    }
  };
