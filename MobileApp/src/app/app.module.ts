import { NgModule, Inject} from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { HomePage } from '../pages/home/home';
import { RatingComponent } from '../pages/leaveComment/rating';
import { updateRating } from '../pages/leaveComment/updateRating';
import { feedbackPage } from '../pages/feedback/feedback';
import { leaveCommentPage} from '../pages/leaveComment/leaveComment';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { SearchModulePage } from '../pages/search-module/search-module';
import { ModuleDetailPage } from '../pages/module-detail/module-detail';
import { ModuleNotesPage } from '../pages/module-notes/module-notes';
import { ModuleRecommedationPage } from '../pages/module-recommedation/module-recommedation';
import { RecCourseDetailPage } from '../pages/rec-course-detail/rec-course-detail';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MicroServices } from '../providers/microservices';
import {Store} from "../providers/store";
import {reducer, initState} from "../providers/model";
import {startFactory} from "../providers/storeProvider";

import {Focuser} from "../providers/focuser";

import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    SchedulePage,
    SignupPage,
    leaveCommentPage,
    RatingComponent,
    updateRating,
    TabsPage,
    TutorialPage,
    SupportPage,
    HomePage,
    feedbackPage,
    SearchModulePage,
    ModuleDetailPage,
    ModuleNotesPage,
    ModuleRecommedationPage,
    RecCourseDetailPage,
    Focuser
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
	IonicStorageModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    SchedulePage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    HomePage,
    leaveCommentPage,
    RatingComponent,
    updateRating,
    feedbackPage,
    SearchModulePage,
    ModuleDetailPage,
    ModuleNotesPage,
    ModuleRecommedationPage,
    RecCourseDetailPage
  ],
  providers: [
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    MicroServices,
    Keyboard,
    {provide: Store, useFactory: startFactory}
  ],
})
export class AppModule {}
