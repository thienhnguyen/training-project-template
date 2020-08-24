import { v4 as uuid } from 'uuid';
import Project from './project';
const data = [
    new Project(uuid(), 'CAS', 'folder', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'NAS', 'folder', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'CoasterAndBargeLoading', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2016', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2017', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2018', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2019', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2020', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2021', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
    new Project(uuid(), 'RevenueByServices2022', 'xlsx', new Date(), 'seed', new Date(), 'seed'),
];
export default data;
