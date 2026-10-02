import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE } from '../../lib/site';
import { articleUrl } from '../../lib/articles';

export async function GET(context: { site: URL }) {
  const articles = (await getCollection('articles', ({ data }) => data.published && data.lang === 'en')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: `${SITE.name} — Trending culture, explained`,
    description: 'Trending culture, explained in plain language.',
    site: context.site,
    trailingSlash: true,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: articleUrl(a.id.replace(/^\/?(es|en)\//, ''), 'en', context.site),
      categories: a.data.tags,
      author: a.data.author,
    })),
    customData: '<language>en-us</language>',
  });
}
