
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModuleWithProviders } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MycourseComponent } from './mycourse/mycourse.component';
import { ListhwComponent } from './listhw/listhw.component';
import { SendhwComponent } from './sendhw/sendhw.component';
import { UploadHWComponent } from './upload-hw/upload-hw.component';
import { EnterStudentIdComponent } from './enter-student-id/enter-student-id.component';
import { ViewHWComponent } from './view-hw/view-hw.component';
import { RegistComponent } from './regist/regist.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const appRoutes: Routes = [
    {
        path: '', component: MainPageComponent,
    }, {
        path: 'login', component: LoginPageComponent,
    },
    {
        path: 'signup', component: RegistComponent,
    },
    {
        path: 'home', component: HomepageComponent,
    },
    {
        path: 'mycourse/:cid', component: MycourseComponent,
    },
    {
        path: 'send', component: SendhwComponent,
    }
    ,
    {
        path: 'send/:uid/:cid', component: ListhwComponent,
    }
    ,
    {
        path: 'send/:uid/:cid/:hname', component: EnterStudentIdComponent,
    },
    {
        path: 'send/:uid/:cid/:hname/:cardid', component: UploadHWComponent,
    },
    {
        path: 'lists/:hid/:cc', component: ViewHWComponent,
    },
    {
        path: 'manage/:cid', component: ManageUserComponent,
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
