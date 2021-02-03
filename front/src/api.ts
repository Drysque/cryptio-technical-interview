import * as env from 'env-var';

const API_ENDPOINT = env.get('API_ENDPOINT').asUrlString() || 'localhost:8080';
