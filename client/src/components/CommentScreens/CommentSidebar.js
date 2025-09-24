import React, { useState, useEffect, useRef } from 'react';
import StoryComments from './StoryComments';
import api from '../../utils/api';
import AddComment from './AddComment';

const CommentSidebar = ({ slug, sidebarShowStatus, setSidebarShowStatus, activeUser }) => {

  const [count, setCount] = useState(0)
  const [commentlist, setCommentList] = useState([])

  const sidebarRef = useRef(null);

  useEffect(() => {
    getStoryComments()
  }, [setCommentList])


  const getStoryComments = async () => {
    try {
      const { data } = await api.get(`/comment/${slug}/getAllComment`)
      setCommentList(data.data || [])
      setCount(data.count || 0)
    }
    catch (error) {
      console.error("Failed to fetch comments:", error);
      setCommentList([])
      setCount(0)
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {

      if (sidebarShowStatus && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarShowStatus(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [sidebarShowStatus])



  return (

    <div ref={sidebarRef} className={sidebarShowStatus ? "Inclusive-comment-sidebar visible" : "Inclusive-comment-sidebar hidden "}  >

      <div className='sidebar-wrapper'>

        <AddComment setSidebarShowStatus={setSidebarShowStatus} slug={slug} getStoryComments={getStoryComments} activeUser={activeUser} count={count} />

        <StoryComments commentlist={commentlist} activeUser={activeUser} count={count} />
      </div>

    </div>

  )
}

export default CommentSidebar;
