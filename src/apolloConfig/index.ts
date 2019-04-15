import defaults from "./defaults";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default {
  uri: process.env.REACT_APP_API_URL as string,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
};
