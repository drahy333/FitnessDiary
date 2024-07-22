export const SearchResult = ({ result, show, setSelectedItem }) => {
    return (
      <div
        className="p-2.5 px-5 hover:bg-gray-200 cursor-pointer"
        onClick={(e) => {
            show();
            setSelectedItem(result);
        }}
      >
        {result.foodItem}
      </div>
    );
  };
  