import React,{ useState, useRef, useEffect, useContext } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  useEffect(()=>{
    console.log(`${id}번째 아이템 렌더s`)
  })

  const [isEdit, setIsEdit] = useState(false); //수정 중인지 아닌지 체크
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentIntput = useRef();

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  }

  const handleRemove = () => {
    if(window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)){
      onRemove(id)
    }
  }

  const handleEdit = () => {
    if(localContent.length < 5){
      localContentIntput.current.focus();
      return;
    }

    if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
      onEdit(id,localContent);
      toggleIsEdit();
    }
  }

  return(
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정점수 : {emotion} </span>
        <br/>
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? 
          <>
            <textarea
              ref={localContentIntput}
              value={localContent}
              onChange={(e)=>setLocalContent(e.target.value)}
            />
          </> :
          <>{content}</>
        }
      </div>
      {isEdit ? 
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </> :
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      }
      
    </div>  
  )
}

export default React.memo(DiaryItem);