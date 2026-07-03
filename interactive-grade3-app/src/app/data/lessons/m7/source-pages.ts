const M7_TEACHER_PAGE_BASE = '/source-pages/m7-teacher';

export const M7_TEACHER_PROBLEM_SET_PAGES: Record<number, number[]> = {
  1: [22, 23],
  2: [34, 35],
  3: [46, 47],
  4: [62, 63],
  5: [76, 77],
  6: [89, 90],
  7: [104, 105],
  8: [121, 122],
  9: [132, 133],
  10: [146, 147],
  11: [154],
  12: [164, 165],
  13: [177, 178],
  14: [190, 191],
  15: [202, 203],
  16: [214, 215],
  17: [226, 227],
  18: [253, 254],
  19: [264, 265],
  20: [276, 277],
  21: [288, 289],
  22: [302, 303],
  23: [317, 318],
  24: [327, 328],
  25: [337],
  26: [348, 349],
  27: [360, 361, 362],
  28: [374, 375, 376],
  29: [387, 388],
  30: [398],
  31: [426],
  32: [437, 438],
  33: [448],
  34: [461, 462]
};

export const M7_TEACHER_ANSWER_KEY_PAGES: Record<number, number[]> = {
  1: [464],
  2: [465],
  3: [466],
  4: [467, 468],
  5: [469, 470],
  6: [471],
  7: [472, 473],
  8: [474, 475],
  9: [476, 477],
  10: [478, 479],
  11: [480],
  12: [481, 482],
  13: [483, 484],
  14: [485, 486],
  15: [487],
  16: [488, 489],
  17: [490],
  18: [491],
  19: [492],
  20: [493, 494],
  21: [495, 496],
  22: [497, 498],
  23: [499, 500],
  24: [501, 502],
  25: [503, 504],
  26: [505, 506],
  27: [507, 508],
  28: [509, 510],
  29: [511, 512],
  30: [513],
  31: [514, 515],
  32: [516, 517],
  33: [518, 519],
  34: [520]
};

export function m7TeacherPageImage(pageNumber: number): string {
  return `${M7_TEACHER_PAGE_BASE}/page-${String(pageNumber).padStart(3, '0')}.png`;
}

export function m7TeacherProblemSetImages(lessonNumber: number): string[] {
  return (M7_TEACHER_PROBLEM_SET_PAGES[lessonNumber] ?? []).map(m7TeacherPageImage);
}

export function m7TeacherAnswerKeyImages(lessonNumber: number): string[] {
  return (M7_TEACHER_ANSWER_KEY_PAGES[lessonNumber] ?? []).map(m7TeacherPageImage);
}
