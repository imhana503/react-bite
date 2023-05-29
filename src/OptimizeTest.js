import React, { useState, useEffect } from 'react';


const CounterA = React.memo(({ count }) => {
  useEffect(()=>{
    console.log(`CounterA count :${count}`)
  })
  return <div>{count}</div>
});

const CounterB = ({ obj }) => {
  useEffect(()=>{
    console.log(`CounterB count :${obj.count}`)
  })
  return <div>{obj.count}</div>
};

const areEqual = (prevProps, nextProps) => {
  // return true // 이전프롭스 현제 프롭스가 같다.-> 리렌더링을 일으키지않는다
  // return false // 이전과 현재가 다른다 - > 리렌더링일 필요하다
  return prevProps.obj.count === nextProps.obj.count
}

const MemoizedCoutnerB = React.memo(CounterB, areEqual); //고차컴포넌트


const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count:1,
  })

  return(
    <div style={{ padding:50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count}/>
        <button onClick={()=>setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCoutnerB obj={obj}/>
        <button onClick={()=>setObj({
          count:obj.count
        })}>B button</button>
      </div>
    </div>
  )
}

export default OptimizeTest;