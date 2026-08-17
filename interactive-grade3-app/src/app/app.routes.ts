import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { LessonPage } from './pages/lesson/lesson';
import { ModuleOverviewPage } from './pages/module-overview/module-overview';
import { PortalHomePage } from './pages/portal-home/portal-home';
import { CurrentMathHomePage } from './pages/current-math-home/current-math-home';
import { ReadingHomePage } from './pages/reading-home/reading-home';
import { SearchPage } from './pages/search/search';

const grade3Routes: Routes = [
  { path: '', component: HomePage },
  { path: 'search', component: SearchPage },
  { path: 'modules/:moduleId/lessons/:lessonNumber/problem-set/:problemSetMode', component: LessonPage },
  { path: 'modules/:moduleId/lessons/:lessonNumber/:problemSection', component: LessonPage },
  { path: 'modules/:moduleId/lessons/:lessonNumber', component: LessonPage },
  { path: 'modules/:moduleId', component: ModuleOverviewPage }
];

export const routes: Routes = [
  { path: '', redirectTo: 'ruchika/grade3', pathMatch: 'full' },
  { path: 'ruchika/grade3', component: PortalHomePage },
  { path: 'ruchika/grade3/iready', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/iready/curriculum', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/iready/syllabus', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/iready/syllabus/:domainId', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/iready/assessment', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/iready/access', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/iready/sources', component: CurrentMathHomePage },
  { path: 'ruchika/grade3/classroom-math', redirectTo: 'ruchika/grade3/iready', pathMatch: 'full' },
  { path: 'ruchika/grade3/reading', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/sources', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/standards', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/assessments', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/levels', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/units/:unitId/practice/:questionNumber', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/units/:unitId/lessons/:lessonNumber', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/units/:unitId', component: ReadingHomePage },
  { path: 'ruchika/grade3/reading/learn', redirectTo: 'ruchika/grade3/reading', pathMatch: 'full' },
  { path: 'ruchika/grade3/reading/library', redirectTo: 'ruchika/grade3/reading', pathMatch: 'full' },
  { path: 'ruchika/grade3/math', children: grade3Routes },
  {
    path: 'ruchika-grade3/modules/:moduleId/lessons/:lessonNumber/problem-set/:problemSetMode',
    redirectTo: 'ruchika/grade3/math/modules/:moduleId/lessons/:lessonNumber/problem-set/:problemSetMode'
  },
  {
    path: 'ruchika-grade3/modules/:moduleId/lessons/:lessonNumber/:problemSection',
    redirectTo: 'ruchika/grade3/math/modules/:moduleId/lessons/:lessonNumber/:problemSection'
  },
  {
    path: 'ruchika-grade3/modules/:moduleId/lessons/:lessonNumber',
    redirectTo: 'ruchika/grade3/math/modules/:moduleId/lessons/:lessonNumber'
  },
  { path: 'ruchika-grade3/modules/:moduleId', redirectTo: 'ruchika/grade3/math/modules/:moduleId' },
  { path: 'ruchika-grade3/search', redirectTo: 'ruchika/grade3/math/search' },
  { path: 'ruchika-grade3', redirectTo: 'ruchika/grade3/math', pathMatch: 'full' },
  {
    path: 'modules/:moduleId/lessons/:lessonNumber/problem-set/:problemSetMode',
    redirectTo: 'ruchika/grade3/math/modules/:moduleId/lessons/:lessonNumber/problem-set/:problemSetMode'
  },
  {
    path: 'modules/:moduleId/lessons/:lessonNumber/:problemSection',
    redirectTo: 'ruchika/grade3/math/modules/:moduleId/lessons/:lessonNumber/:problemSection'
  },
  {
    path: 'modules/:moduleId/lessons/:lessonNumber',
    redirectTo: 'ruchika/grade3/math/modules/:moduleId/lessons/:lessonNumber'
  },
  { path: 'modules/:moduleId', redirectTo: 'ruchika/grade3/math/modules/:moduleId' },
  { path: '**', redirectTo: 'ruchika/grade3' }
];
