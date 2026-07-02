// app/robots.ts
// https://memorix.uz/robots.txt — avtomatik generatsiya qilinadi

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://memorix.uz/sitemap.xml',
    }
}