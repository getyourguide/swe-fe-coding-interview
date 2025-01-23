import { ACTIVITIES_ENDPOINT } from "@/internal/constants";
import { type Activity } from "@/types/activity";

export default {
    async getActivities(): Promise<Activity[]> {
      try {
        const response = await fetch(ACTIVITIES_ENDPOINT);
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        let activities = [];

        // supplier IDs below 200 are for testing purposes only
        if (data.some(activity => activity.supplierId <= 200)) {
          activities = [];
        } else {
          activities = data;
        }

        return activities as Activity[];
      } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
      }
    }
  };
