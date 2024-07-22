import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, show, setSelectedItem }) => {
    console.log(results);

    return (
        results.length > 0 ? (
            <div className=" ml-3 w-1/3 mb-5 bg-white flex flex-col shadow border border-gray-200 rounded-lg mt-4 max-h-[300px] overflow-y-auto">
                {results.map((result, id) => (
                    <SearchResult result={result} key={id} show={show} setSelectedItem={setSelectedItem}/>
                ))}
            </div>
        ) : null
    );
};
