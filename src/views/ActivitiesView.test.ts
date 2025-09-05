import { describe, it, vi, expect } from 'vitest';
import ActivitesView from './ActivitiesView.vue';
import { mount, flushPromises } from '@vue/test-utils';

import activities from '../../public/activities.json';
import suppliers from '../../public/suppliers.json';

vi.mock('../services/activity', () => ({
  default: {
    getActivities() {
      return Promise.resolve(activities);
    },
  },
}));

vi.mock('../services/suppliers', () => ({
  getSuppliers() {
    return Promise.resolve(suppliers);
  },
  validateSupplier() {
    return true;
  },
}));

describe('ActivitiesView', () => {
  it('should render the activities', async () => {
    const wrapper = mount(ActivitesView);

    await flushPromises();

    expect(wrapper.findAll('.activity-card').length).toBe(14);
  });
});
