import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize'

export const get_all_projects = async () => {
    const directory = './writings/projects';
    const files = fs.readdirSync(directory);
    const posts = await Promise.all(files.map(async (fileName) => {
        const project_id = fileName.replace('.mdx', '');
        const fileContent = await fs.readFileSync(`${directory}/${fileName}`);
        const mdxSource = await serialize(fileContent, { parseFrontmatter: true })
        return {
            project_id,
            ...mdxSource.frontmatter,
        };
    }));
    posts.sort((a, b) => 
        a.date.getTime() - b.date.getTime()
    )
    return posts;
}

export const get_project = async (project_id) => {
    const directory = './writings/projects';
    const fileContent = await fs.readFileSync(`${directory}/${project_id}.mdx`);
    const mdxSource = await serialize(fileContent, { parseFrontmatter: true })
    return mdxSource;
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