import Orphanage from "../models/Orphanage";
import User from "../models/User";
import imagesView from './images_view';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    }
  },

  renderUser(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }
  },

  renderMany(orphanages: Orphanage[], user: User) {
    return [
      orphanages.map(orphanage => this.render(orphanage)),
      this.renderUser(user)
    ]
  },
}