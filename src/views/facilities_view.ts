import Facility from '../models/Facility';
import imagesView from './images_view';

export default {
  render(facility: Facility) {
    return {
      id: facility.id,
      name: facility.name,
      latitude: facility.latitude,
      longitude: facility.longitude,
      about: facility.about,
      instructions: facility.instructions,
      open_hours: facility.open_hours,
      open_on_weekends: facility.open_on_weekends,
      images: imagesView.renderMany(facility.images),
    }
  },

  renderMany(facilities: Facility[]) {
    return facilities.map(facility => this.render(facility));
  }
}
