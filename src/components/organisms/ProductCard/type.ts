import { Product } from '../../../apı/models/Products';

export interface Props {
  product: Product;
  onPress?: () => void;
}
