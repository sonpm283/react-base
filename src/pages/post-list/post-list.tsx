import { useCreatePostMutation, useGetPostsQuery } from '../../services/posts-api'
import { IPost } from '../../types/post.type'
import { increment, decrement, incrementByAmount } from '../../redux/counter/counter-slice'
import { useAppDispatch, useAppSelector } from '@hooks/useTypeSelector'

const PostList: React.FC = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsQuery({ page: 14, limit: 10, order: 'desc' })
  const [cratePostMutation, { isLoading: isCreatingPost }] = useCreatePostMutation()

  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  const handleCreatePost = () => {
    const newPost: Omit<IPost, 'id'> = {
      title: `New Post ${posts?.length}`,
      body: 'New Post Content',
    }
    cratePostMutation(newPost)
  }

  return (
    <div className="posts-page">
      <button onClick={() => dispatch(increment())} aria-label="Increment value">
        Increment : {count}
      </button>
      <button onClick={() => dispatch(decrement())} aria-label="Decrement  value">
        Decrement : {count}
      </button>
      <button onClick={() => dispatch(incrementByAmount(10))} aria-label="Increment by value">
        Increment by 10: {count}
      </button>
      <button onClick={handleCreatePost}>{isCreatingPost ? 'Creating...' : 'Create Post'}</button>
      <ul className="post-list">
        {posts?.map((post) => (
          <li key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
