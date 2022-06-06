import fs from 'fs';
import slugify from 'slugify'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'

export const get_table_of_contents = (sourceString) => {
    const regex = /\_components\.h1,\s*\{\s*children:\s*\"(.+)\"\s*\}/g;
    return Array.from(sourceString.matchAll(regex)).map((result) => {
        return {
            title: result[1],
            id: slugify(result[1])
        }
    });
}

export const get_all_projects = async () => {
    const directory = './writings/projects';
    const files = fs.readdirSync(directory);
    const posts = await Promise.all(files.map(async (fileName) => {
        const project_id = fileName.replace('.mdx', '');
        const fileContent = await fs.readFileSync(`${directory}/${fileName}`);
        const readingStats = readingTime(fileContent);
        const mdxSource = await serialize(fileContent, { parseFrontmatter: true })
        return {
            project_id,
            ...mdxSource.frontmatter,
            readingTime: readingStats.text
        };
    }));
    posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return posts;
}

export const get_project = async (project_id) => {
    const directory = './writings/projects';
    const fileContent = await fs.readFileSync(`${directory}/${project_id}.mdx`);
    const readingStats = readingTime(fileContent);
    const mdxSource = await serialize(fileContent, { parseFrontmatter: true })
    return {
        mdxData: mdxSource,
        readingTime: readingStats.text
    };
}

///////////////////////////////////////////////////////////////

// export const get_all_blog_posts = async () => {
//     const files = fs.readdirSync('./writings/blog');
//     const posts = await Promise.all(files.map(async (fileName) => {
//         const post_id = fileName.replace('.mdx', '');
//         const { meta } = await import(`../writings/blog/${fileName}`);
//         return {
//             post_id,
//             meta,
//         };
//     }));
//     posts.sort((a, b) => 
//         a.date.getTime() - b.date.getTime()
//     )
//     return posts;
// }