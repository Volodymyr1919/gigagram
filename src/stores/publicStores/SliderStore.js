import { makeAutoObservable } from "mobx";

class SliderStore {
  currentIndex = 0;
  images = [
      "https://store-images.s-microsoft.com/image/apps.9884.13510798887167234.ac7a8ac8-9ca9-4f4d-b67f-eaa709be3ed2.d911a106-a099-463d-9eaf-822e495320ad",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/785418/pexels-photo-785418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ];

  constructor(MainStore) {
    this.MainStore = MainStore;
    makeAutoObservable(this);

    setInterval(() => {
      this.nextImage();
    }, 6000);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

}

export default SliderStore;
