const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory demo data (replace with DB in production)
const courses = [
  { id: 'math', title: 'رياضيات - التحصيلي', description: 'مناهج الرياضيات للخامس العلمي', isTahseely: true },
  { id: 'physics', title: 'فيزياء - التحصيلي', description: 'مناهج الفيزياء للخامس العلمي', isTahseely: true },
];

const lessons = {
  'math': [
    { id: 'm1', title: 'درس 1: متسلسلات', content: 'شرح موجز لمتسلسلات...', videoUrl: '' , quizzes: [{id:'q1', question:'1+1=?', options:['1','2','3','4'], answer:1} ] },
  ],
  'physics': [
    { id: 'p1', title: 'درس 1: الحركة', content: 'قوانين الحركة...', videoUrl: '' , quizzes: [{id:'q1', question:'قانون نيوتن الاول؟', options:['ثابت','سريع','بطيء','غير معلوم'], answer:0} ] },
  ]
};

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id/lessons', (req, res) => {
  const id = req.params.id;
  res.json(lessons[id] || []);
});

app.post('/api/quizzes/submit', (req, res) => {
  const { quizId, answers } = req.body;
  // simple evaluation for demo: compare to stored answers in lessons
  let total = 0, correct = 0;
  for (const courseId in lessons){
    for (const l of lessons[courseId]){
      if (l.quizzes){
        for (const q of l.quizzes){
          if (q.id === quizId){
            total = 1;
            if (answers && answers[0] === q.answer) correct = 1;
          }
        }
      }
    }
  }
  res.json({ total, correct, score: total? Math.round((correct/total)*100):0 });
});

// AI assistant stub (requires OPENAI key to enable real calls)
app.post('/api/ai/ask', async (req, res) => {
  const { question, context } = req.body;
  // Demo response - replace with OpenAI call in production
  res.json({ answer: `هذا رد تجريبي على سؤالك: "${question}". الرجاء توصيل مفتاح OpenAI في المتغيرات لتفعيل الاستجابات الحقيقية.` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend running on port', PORT));
