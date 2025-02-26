 import { Client as WorkflowClient } from '@upstash/workflow';
 
 import { QSTASH_TOKEN, QSTASH_URL } from './env.js';
 
 export const workflowClient = new WorkflowClient({
   baseUrl: QSTASH_URL || 'https://qstash.upstash.io',
   token: QSTASH_TOKEN || 'eyJVc2VySUQiOiI5MjIwZWVhYy01YjJhLTQ1OTAtYjZiZS05ODIwMWQ3MDEwNzMiLCJQYXNzd29yZCI6IjlmNzM4MDM1ZDcwYjRiMzg5YzI4NTA4NzY4ZTU4MjM3In0=',
 });