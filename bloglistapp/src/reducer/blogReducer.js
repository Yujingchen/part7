import blogsService from '../services/blogs';

const initialState = []

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return addBlog(state, action.data)
        case 'UPDATE_BLOGS':
            return updateBlog(state, action.data)
        case 'UPDATE_BLOG_COMMENT':
            return updateBlog(state, action.data)
        case 'DELETE_BLOGS':
            return deleteBlog(state, action.data)
        default:
            return state
    }
}

export const initBlogAction = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll()
        dispatch ({type:'INIT_BLOGS', data:blogs})
    }
}

const addBlog = (state, data) => {
    const newState = state.concat(data)
    newState.sort((a,b)=> a.votes > b.votes ? -1: 1)
    return newState
}

export const addBlogAction = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogsService.postNewBlog(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

const updateBlog = (state, data) => {
    const { id, likes, comments } = data
    const newState = state.map(blog=>{
        if(blog.id === id) {
            blog.likes = likes
            blog.comments = comments
            return blog
        }
        return blog
    })
    newState.sort((a,b) => a.likes > b.likes ? -1 : 1);
    return newState
}

export const updateBlogAction = (blog) => {
    const { id } = blog
    return async (dispatch) => {
        await blogsService.updateBlog(id, blog)
        dispatch ({type:'UPDATE_BLOGS', data: blog})
    }
}

export const updateBlogCommentAction = (blog) => {
    const { id } = blog
    return async (dispatch) => {
        await blogsService.updateBlogComment(id, blog)
        dispatch ({type:'UPDATE_BLOG_COMMENT', data: blog})
    }
}

const deleteBlog = (state, data) => {
    const newState = state.filter(blog=>{
        if(blog.id !== data.id) {
            return blog
        }
    })
    newState.sort((a,b) => a.likes > b.likes ? -1 : 1);
    return newState
}

export const deleteBlogAction = (blog) => {
    return async (dispatch) => {
        await blogsService.deleteBlog(blog)
        dispatch ({type:'DELETE_BLOGS', data: blog})
    }
}


export default reducer