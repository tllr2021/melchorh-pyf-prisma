const path = require("path");
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync(path.join(__dirname, "../types/**/*.graphql"));

// export const resolvers = require("../resolvers");
export const typeDefs = mergeTypeDefs(typesArray);
