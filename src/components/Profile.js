import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/posts.css';

function Profile({ posts, userData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const { username, _id: userId } = userData;
  const userPosts = posts.filter(post => post.author._id === userId);

  // Logic for displaying posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost); // Filtered user posts for pagination

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Fragment>
      <p>Go To Page</p>
      {currentPosts.map((post) => ( 
        <div key={post._id} className="post-wrapper">
          <div className="post-title">{post.title}</div>
          <div className="post-description">{post.description}</div>
          <div className="post-description-price">{post.price}</div>
          <div className='post-description-price'>{post._id}</div>
          <div className="post-info">
            {post.isAuthor ? (
              <>
                <span>Posted by: {post.author.username}</span>
                <button>Delete</button>
                <Link to={`/updatePost/${post._id}`}><button>Edit Post</button></Link>
              </>
            ) : (
              <>
                <span>Posted by: {post.author.username}</span>
                <span>Location: {post.location}</span>
                <button>Message Owner</button>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </Fragment>
  );
}

export default Profile;
