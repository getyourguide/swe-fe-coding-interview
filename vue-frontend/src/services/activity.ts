export default {
    async getActivities() {
      try {
        const response = await fetch('/activities.json');
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
        let activities = [];
        if (Math.random() > 0.5) {
          activities = data;
        }
        return  activities;
      } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
      }
    }
  };
  