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
    const { id, likes } = data
    const newState = state.map(blog=>{
        if(blog.id === id) {
            blog.likes = likes
            return blog
        }
        return blog
    })
    newState.sort((a,b) => a.likes > b.likes ? -1 : 1);
    return newState
}

export const updateBlogAction = (blog) => {
    const { id, likes } = blog
    const incrementlikes =  likes++
    const newBlog = {...blog, likes: incrementlikes}
    return async (dispatch) => {
        await blogsService.updateBlog(id, newBlog)
        dispatch ({type:'UPDATE_BLOGS', data: newBlog})
    }
}

const deleteBlog = (state, id) => {
    const newState = state.filter(blog=>{
        if(blog.id !== id) {
            return blog
        }
    })
    newState.sort((a,b) => a.likes > b.likes ? -1 : 1);
    return newState
}

export const deleteBlogAction = (id) => {
    return async (dispatch) => {
        await blogsService.deleteBlog(id)
        dispatch ({type:'DELETE_BLOGS', data: id})
    }
}


export default reducer