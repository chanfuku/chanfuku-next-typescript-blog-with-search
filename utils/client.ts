import { createClient } from 'contentful'

const config = {
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: 'master'
}

export const client = createClient(config)
