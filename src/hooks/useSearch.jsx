import { createContext, useContext, useState } from "react";
import { makeApiCall } from "utils/makeApiCall";

const StarredContext = createContext();

const useProvideSearch = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starred, setStarred] = useState({});

  const getItems = async (search) => {
    const response = await makeApiCall({
      url: `http://localhost:3001/search?q=${search}&_limit=10`,
    });
    setItems(response);
    setIsLoading(false);
  };

  const handleToggle = async (item) => {
    await makeApiCall({
      url: `http://localhost:3001/search/${item.id}`,
      method: "PUT",
      body: { ...item, starred: !item.starred },
    });

    setItems((last) => {
      return last.map((oldItem) => {
        if (oldItem.id === item.id) {
          return { ...oldItem, starred: !oldItem.starred };
        } else {
          return oldItem;
        }
      });
    });

    setStarred((last) => {
      const temp = { ...last };
      if (item.id in temp) {
        delete temp[item.id];
      } else {
        temp[item.id] = { ...item, starred: !item.starred };
      }

      return temp;
    });
  };

  return {
    handleToggle,
    items,
    isLoading,
    setIsLoading,
    getItems,
    starred,
  };
};

export const SearchProvider = ({ children }) => {
  const starred = useProvideSearch();
  return (
    <StarredContext.Provider value={starred}>
      {children}
    </StarredContext.Provider>
  );
};

const useSearch = () => {
  return useContext(StarredContext);
};

export default useSearch;
