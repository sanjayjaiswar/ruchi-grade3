import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { LessonPage } from './pages/lesson/lesson';
import { ModuleOverviewPage } from './pages/module-overview/module-overview';

const grade3Routes: Routes = [
  { path: '', component: HomePage, title: 'Ruchika Grade 3 Math' },
  { path: 'modules/:moduleId/lessons/:lessonNumber', component: LessonPage },
  { path: 'modules/:moduleId', component: ModuleOverviewPage }
];

export const routes: Routes = [
  { path: '', redirectTo: 'ruchika-grade3', pathMatch: 'full' },
  { path: 'ruchika-grade3', children: grade3Routes },
  { path: 'modules/:moduleId/lessons/:lessonNumber', redirectTo: 'ruchika-grade3/modules/:moduleId/lessons/:lessonNumber' },
  { path: 'modules/:moduleId', redirectTo: 'ruchika-grade3/modules/:moduleId' },
  { path: '**', redirectTo: 'ruchika-grade3' }
];
