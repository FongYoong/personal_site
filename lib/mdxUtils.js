import fs from 'fs';


export const get_all_projects = async () => {
    const files = fs.readdirSync('./writings/projects');
    const posts = await Promise.all(files.map(async (fileName) => {
        const post_id = fileName.replace('.mdx', '');
        const { meta } = await import(`../writings/projects/${fileName}`);
        return {
            post_id,
            meta,
        };
    }));
    posts.sort((a, b) => 
        a.date.getTime() - b.date.getTime()
    )
    return posts;
}

export const get_all_blog_posts = async () => {
    const files = fs.readdirSync('./writings/blog');
    const posts = await Promise.all(files.map(async (fileName) => {
        const post_id = fileName.replace('.mdx', '');
        const { meta } = await import(`../writings/blog/${fileName}`);
        return {
            post_id,
            meta,
        };
    }));
    posts.sort((a, b) => 
        a.date.getTime() - b.date.getTime()
    )
    return posts;
}