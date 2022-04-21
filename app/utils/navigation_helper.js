export const getParams = navigation => {
  if (navigation) {
    const {index, routes} = navigation.getState();
    return routes[index].params || {};
  }
};
