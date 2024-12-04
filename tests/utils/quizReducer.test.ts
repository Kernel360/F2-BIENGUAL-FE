import { quizReducer, State, DomainEvent } from '@/lib/quizReducer';
import { QuestionAnswer } from '@/types/Quiz';

const mockQuestionAnswer: QuestionAnswer[] = [
  {
    question:
      'What were the substances detected in the 2,000-year-old Bes mug?',
    questionId: '674e1ca1952faa4e392bdf73',
    examples: [
      'alcoholic base, flavoring agents, human bodily fluids, and medicinal and psychotropic ingredients',
      'sacred water, milk, wine or beer',
      'honey, royal jelly, sesame seeds, pine nuts',
      'licorice and grapes',
    ],
    type: 'MATCH',
  },
  {
    question: "What does 'sedative' mean in the context of the study?",
    questionId: '674e1ca2952faa4e392bdf78',
    examples: [
      'Causing drowsiness or calmness.',
      'Increasing energy.',
      'Enhancing visionary experiences.',
      'Inducing labor.',
    ],
    type: 'WORD',
  },
  {
    question:
      'Arrange the following sentences in the order they appear in the text:',
    questionId: '674e1ca3952faa4e392bdf7d',
    examples: [
      'The Bes vessels were not ordinary artefacts but rather ritual objects that were manufactured in limited number and acquired just by those individuals who worshipped Bes and participated to the rituals revolving around him.',
      'Experts did not know if these mugs were used in daily life, for religious purposes or in magic rituals.',
      'For a very long time now, Egyptologists have been speculating what mugs with the head of Bes could have been used for, and for what kind of beverage.',
      'Very likely, those individuals got to keep the Bes vessels after they were used to perform the rituals, as a reminder that the ritual was actually performed.',
    ],
    type: 'ORDER',
  },
  {
    question:
      'Arrange the following sentences in the order they appear in the text:',
    questionId: '674e1ca3952faa4e392bdf7e',
    examples: [
      'Inebriation played an important ritual role in some ancient Egyptian festivals, especially festivals associated with the flooding of the Nile.',
      'We have depictions of these festivals in tomb scenes that depict banqueters drinking heavily, saying that they want to become inebriated as fast as possible, and even vomiting when they overindulge.',
      'Bes, and other gods who resemble Bes, often act as attendants of Hathor in Egyptian art and religion.',
      'Alcoholic offerings would be offered to Hathor during the floods, including as part of any “Festival of Drunkenness” held to appease her.',
    ],
    type: 'ORDER',
  },
];

// TODO(@smosco): 퀴즈의 전체 흐름 테스트 추가

describe('quizReducer', () => {
  test('퀴즈 다운로드 후 ready 상태로 초기화해 저장합니다.', () => {
    const initialState: State = { questions: [] };
    const event: DomainEvent = {
      type: 'download_quiz',
      questions: mockQuestionAnswer,
    };

    const newState = quizReducer(initialState, event);

    expect(newState.questions.length).toBe(4);
    expect(
      newState.questions.every((question) => question.status === 'ready'),
    ).toBe(true);
  });

  test('정답 제출 후 해당 questionId의 상태가 submitting 으로 변경됩니다.', () => {
    const initialState: State = {
      questions: mockQuestionAnswer.map((question) => ({
        ...question,
        status: 'ready',
      })),
    };
    const event: DomainEvent = {
      type: 'submit_answer',
      questionId: '674e1ca1952faa4e392bdf73',
      answer: 0,
    };

    const newState = quizReducer(initialState, event);

    expect(newState.questions[0].status).toBe('submitting'); // 첫 번째 질문만 `submitting`
  });

  test('정답 확인 API 응답이 오면 상태는 correct 또는 wrong 로 변경됩니다.', () => {
    const initialState: State = {
      questions: mockQuestionAnswer.map((question, index) => ({
        ...question,
        status: index === 0 ? 'submitting' : 'ready',
      })),
    };
    const event: DomainEvent = {
      type: 'response_question_result',
      questionId: '674e1ca1952faa4e392bdf73', // 첫 번째 질문
      ok: true, // 정답 처리
    };

    const newState = quizReducer(initialState, event);

    expect(newState.questions[0].status).toBe('correct'); // 첫 번째 질문이 `correct`
    expect(
      newState.questions
        .filter((question, i) => i !== 0)
        .every((question) => question.status === 'ready'),
    ).toBe(true);
  });

  test('다시 풀기를 누르면 틀린 문제만 ready 상태로 초기화해서 리턴합니다.', () => {
    const initialState: State = {
      questions: mockQuestionAnswer.map((question, i) => ({
        ...question,
        status: i % 2 === 0 ? 'wrong' : 'correct', // 짝수는 틀림, 홀수는 맞음
      })),
    };
    const event: DomainEvent = { type: 'end_quiz' };

    const newState = quizReducer(initialState, event);

    expect(newState.questions.filter((q) => q.status === 'ready').length).toBe(
      2,
    ); // 틀린 문제만 초기화
  });
});
