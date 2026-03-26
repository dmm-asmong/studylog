import { Journal, Subject } from '@/types';

export const MOCK_SUBJECTS: Subject[] = [
  { id: 's1', name: '수학', color: 'blue' },
  { id: 's2', name: '영어', color: 'purple' },
  { id: 's3', name: '국어', color: 'orange' },
  { id: 's4', name: '과학', color: 'green' },
  { id: 's5', name: '사회', color: 'yellow' },
];

export const MOCK_JOURNALS: Journal[] = [
  {
    id: 'j1',
    subjectId: 's1',
    subjectName: '수학',
    title: '이차방정식의 근의 공식',
    content: '이차방정식 ax²+bx+c=0 이라는 식이 있을 때... 초등학생한테 설명하면, \"x라는 모르는 숫자를 찾는 공식\"이라고 할 수 있어요. 판별식 b²-4ac가 0보다 크면 답이 두 개, 0이면 딱 하나, 0보다 작으면 답이 없다는 게 신기했어요.',
    studyDate: '2026-03-24',
    createdAt: '2026-03-24T20:15:00.000Z',
    aiFeedback: {
      understanding: '잘 이해했어요',
      score: 4,
      summary: '근의 공식과 판별식의 의미를 자신의 언어로 잘 설명했어요. 특히 판별식에 따른 세 가지 경우를 명확히 구분한 점이 인상적입니다.',
      growth: null,
      keywordsFound: ['이차방정식', '판별식', '근'],
      keywordsMissed: ['근의 공식', '실근', '허근'],
      keywordScore: 43,
      childFriendlyFeedback: '모르는 숫자를 찾는 마법 공식이라는 비유가 정말 재미있어요! 친구들에게 설명해주면 다들 금방 이해할 수 있을 거예요.',
    },
  },
  {
    id: 'j2',
    subjectId: 's2',
    subjectName: '영어',
    title: '현재완료 시제 (have + p.p.)',
    content: '현재완료는 과거에 한 일이 지금도 영향을 주는 거예요. \"I have eaten\"은 먹었고 지금 배부르다는 뜻. \"I ate\"는 그냥 먹었다는 사실만. 이걸 초등학생한테 설명하면 \"과거 일이 지금까지 이어진다\"고 말하겠어요.',
    studyDate: '2026-03-23',
    createdAt: '2026-03-23T21:00:00.000Z',
    aiFeedback: {
      understanding: '이해 중이에요',
      score: 3,
      summary: '현재완료의 핵심 개념인 \"현재와의 연관성\"을 포착했어요. 과거시제와의 차이도 잘 설명했습니다. 경험·완료·계속의 세 용법도 함께 정리해보면 더 완벽해질 거예요.',
      growth: null,
      keywordsFound: ['현재완료', 'have'],
      keywordsMissed: ['경험', '완료', '계속', '결과', '과거분사'],
      keywordScore: 29,
      childFriendlyFeedback: '과거부터 지금까지 이어진다는 설명이 초등학생도 쏙쏙 이해할 수 있을 만큼 명확하고 쉬워요!',
    },
  },
  {
    id: 'j3',
    subjectId: 's4',
    subjectName: '과학',
    title: '세포분열 - 체세포분열과 감수분열',
    content: '체세포분열은 그냥 몸이 자라는 것. 감수분열은 생식세포 만들 때. 초등학생한테 \"레고 블록 복사기\"라고 설명했어요. 체세포분열은 똑같이 복사, 감수분열은 반씩 나눠서 나중에 합체.',
    studyDate: '2026-03-21',
    createdAt: '2026-03-21T19:45:00.000Z',
    aiFeedback: {
      understanding: '잘 이해했어요',
      score: 5,
      summary: '레고 블록 비유가 탁월합니다! 두 분열의 목적과 결과를 정확히 파악했어요. 염색체 수의 변화까지 연결해서 생각하면 완벽해요.',
      growth: null,
      keywordsFound: ['체세포분열', '감수분열'],
      keywordsMissed: ['염색체', '염색분체', 'DNA', '핵분열', '세포질분열'],
      keywordScore: 29,
      childFriendlyFeedback: '레고 블록 복사기라니! 정말 기발하고 찰떡같은 비유예요. 누구나 단번에 이해할 수 있겠어요.',
    },
  },
];

export const MOCK_STUDY_DATES: string[] = [
  '2026-03-03', '2026-03-05', '2026-03-06',
  '2026-03-10', '2026-03-11', '2026-03-12', '2026-03-13',
  '2026-03-17', '2026-03-18', '2026-03-19', '2026-03-20',
  '2026-03-21', '2026-03-23', '2026-03-24',
];
