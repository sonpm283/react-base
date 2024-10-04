import { useFetchContactsQuery } from "../../services/contacts-api";

const ProductItem: React.FC = () => {
  const { data, isLoading, refetch } = useFetchContactsQuery();

  return (
    <div className="product-item">
      <button onClick={refetch}>Refetch</button>
      {isLoading && <h1>Loading...</h1>}
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default ProductItem;
