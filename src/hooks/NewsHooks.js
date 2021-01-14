import LocalStorageOperations from './LocalStorageOperations';
import ApiUrls from './ApiUrls'


const fetchGetUrl = async (url, userKey) => {
  const {read} = LocalStorageOperations();
  const userToken = read(userKey);
  if (userToken) {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              authorization: userToken.token,
          },
      });
      if (response) {
          return await response.json()
      } else {
          throw Error("No token, fetchGetUrl")
      }
  } else {
      throw Error("No user, No usertoken. fetchGetUrl")
  }
};

const NewsHooks = () => {

  const {newsitemsUrl, highlightnewsUrl} = ApiUrls()

  // Fetching 10 newest newsitems
  const getNewsItems = () => {
    const items = fetchGetUrl(newsitemsUrl,"user")
    return items;
  };
  // Fetching the daily highlightitem
  const getHighlightItem = () => {
    const fetchedHighlightItem = fetchGetUrl(highlightnewsUrl,"user")
    return fetchedHighlightItem;
  };

  return {
    getNewsItems,
    getHighlightItem,
  };
};

export default NewsHooks;
