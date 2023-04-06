import { makeAutoObservable } from "mobx";

class PostIdStore {
  post = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPost(post) {
    this.post = post;
  }
}
export default PostIdStore;
