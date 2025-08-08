import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App(){
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [message, setMessage] = useState('مرحباً في مسرعين العراق - نسخة تجريبية');

  useEffect(()=>{
    axios.get(API + '/api/courses').then(r=> setCourses(r.data));
  },[]);

  const view = async (id)=>{
    const r = await axios.get(API + '/api/courses/' + id + '/lessons');
    setLessons(r.data);
    setSelected(id);
  }

  const askAI = async ()=>{
    const q = prompt('اكتب سؤالك للمساعد الذكي:');
    if(!q) return;
    const r = await axios.post(API + '/api/ai/ask', { question: q, context: '' });
    alert(r.data.answer);
  }

  return (
    <div style={{fontFamily: 'sans-serif', padding:20, background: '#0b0b0b', color:'#fff', minHeight:'100vh'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{color:'#b11246'}}>مسرعين العراق</h1>
        <div>
          <button onClick={askAI} style={{background:'#d4af37', border:'none', padding:'8px 12px', borderRadius:6}}>اسأل المساعد</button>
        </div>
      </header>

      <section style={{marginTop:20}}>
        <h2>الدورات</h2>
        <ul>
          {courses.map(c=> (
            <li key={c.id} style={{marginBottom:10}}>
              <strong>{c.title}</strong> - {c.description}
              <div><button onClick={()=>view(c.id)} style={{marginTop:6}}>عرض الدروس</button></div>
            </li>
          ))}
        </ul>
      </section>

      {selected && (
        <section style={{marginTop:20}}>
          <h3>دروس المادة</h3>
          <ul>
            {lessons.map(l=> (
              <li key={l.id} style={{marginBottom:8, background:'#111', padding:10, borderRadius:6}}>
                <div style={{fontWeight:'bold'}}>{l.title}</div>
                <div>{l.content}</div>
                <div style={{marginTop:6}}>
                  <button onClick={()=>{ const a = prompt('اختر رقم الاجابة'); axios.post(API + '/api/quizzes/submit', {quizId: l.quizzes[0].id, answers: [parseInt(a)]}).then(r=> alert('النقاط: ' + r.data.score))}}>
                    ابدِ امتحان سريع
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <footer style={{marginTop:40, color:'#aaa'}}>واجهة تجريبية — الألوان: برغندي، ذهبي، أسود</footer>
    </div>
  )
}
