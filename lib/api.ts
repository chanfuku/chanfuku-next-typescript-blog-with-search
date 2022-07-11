import { client } from '../utils/client'
import { IBlogPostFields } from '../@types/generated/contentful'
import { Entry, Tag } from 'contentful'

export async function getAllPosts(params: {}): Promise<Entry<IBlogPostFields>[]> {
  const { items } = await client.getEntries<IBlogPostFields>(params)
  return items
}

export async function getAllTags(): Promise<Tag[]> {
  const { items } = await client.getTags()
  return items
}
