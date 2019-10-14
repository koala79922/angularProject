import {Deserializable} from '../../../shared/interfaces/deserializable.interface';

export class ItemCard implements Deserializable {
  id: string;
  name: string;
  alterEgo: string;
  likes: number;
  default: boolean;
  avatarUrl: string;
  avatarBlurredUrl: string;
  avatarThumbnailUrl: string;

  constructor(itemCard: any = {}) {
    this.id = itemCard.id;
    this.name = itemCard.name || '';
    this.likes = itemCard.likes || 0;
  }

  like() {
    this.likes += 1;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
