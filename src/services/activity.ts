import { HOT_ACTIVITIES_ENDPOINT, NEW_ACTIVITIES_ENDPOINT, SPECIAL_OFFERS_ENDPOINT } from "@/internal/constants";
import { type ActivitiesType, type Activity } from "@/types/activity";

const endpoints = {
  "new": NEW_ACTIVITIES_ENDPOINT,
  "hot": HOT_ACTIVITIES_ENDPOINT,
  "offers": SPECIAL_OFFERS_ENDPOINT,
} as const;

export default {
    async getActivities(type: ActivitiesType): Promise<Activity[]> {
      const endpoint = endpoints[type];

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        let activities = [];

        // supplier IDs below 200 are for testing purposes only
        if (data.some(activity => activity.supplierId < 200)) {
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
