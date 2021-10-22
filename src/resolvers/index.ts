import { Subscription } from './Subscription'
import { Movie } from './Movie'
import { Room } from './Room'
import { Show } from './Show'
import { Purchase } from './Purchase'
import { Ticket } from './Ticket'
import { User } from './User'
import { ProdNQuan } from './ProdNQuan'
import { Cinema } from './Cinema'
import { Payroll } from './Payroll'

const path = require("path");
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversQuery = loadFilesSync(path.join(__dirname, "./Query/**/*.ts"));
const Query = mergeResolvers(resolversQuery);

const resolversMutation = loadFilesSync(path.join(__dirname, "./Mutation/**/*.ts"));
const Mutation = mergeResolvers(resolversMutation);

export default {
  Query,
  Mutation,
  Subscription,
  Movie,
  Room,
  Show,
  Purchase,
  Ticket,
  User,
  ProdNQuan,
  Cinema,
  Payroll
};
