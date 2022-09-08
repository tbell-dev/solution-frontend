import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // 회원가입/로그인
  {
    path: '/login',
    name: '',
    component: () => import('../views/LoginPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/findid',
    name: '',
    component: () => import('../views/FindIdPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/findid/mail',
    name: '',
    component: () => import('../views/FindIdMailPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/findpw',
    name: '',
    component: () => import('../views/FindPwPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/findpw/mail',
    name: '',
    component: () => import('../views/FindPwMailPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/findpw/update',
    name: '',
    component: () => import('../views/FindPwUpdatePage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/fail',
    name: '',
    component: () => import('../views/LoginFailMailPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/login/fail/complete',
    name: '',
    component: () => import('../views/LoginFailMailCompletePage.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup',
    name: '',
    component: () => import('../views/SignupPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup/fail/ok',
    name: '',
    component: () => import('../views/SignupFailOKPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup/fail/timeout',
    name: '',
    component: () => import('../views/SignupFailTimeoutPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup/mail',
    name: '',
    component: () => import('../views/SignupMailPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup/wait',
    name: '',
    component: () => import('../views/SignupWaitPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup/complete',
    name: '',
    component: () => import('../views/SignupComplete.vue'),
    meta: { auth: false },
  },
  {
    path: '/sslo',
    name: 'sslo',
    component: () => import('../views/main_sslo/SsloPage.vue'),
    meta: { auth: false },
    children: [
      {
        path: 'main',
        component: () => import('../components/main_sslo/SsloMain.vue'),
        meta: { auth: false },
        alias: '/',
      },
      {
        path: 'setting/mypage',
        component: () =>
          import('../components/main_sslo/mypage/SettingMyPage.vue'),
        meta: { auth: false },
      },
      {
        path: 'setting/password',
        component: () =>
          import('../components/main_sslo/mypage/SettingPassword.vue'),
        meta: { auth: false },
      },
      {
        path: 'service',
        component: () => import('../components/main_sslo/service/Service.vue'),
        meta: { auth: false },
      },
      {
        path: 'solution',
        component: () =>
          import('../components/main_sslo/solution/Solution.vue'),
        meta: { auth: false },
      },
      {
        path: 'price',
        component: () => import('../components/main_sslo/price/Price.vue'),
        meta: { auth: false },
      },
      {
        path: 'company',
        component: () => import('../components/main_sslo/company/Company.vue'),
        meta: { auth: false },
      },
      {
        path: 'notice',
        component: () => import('../components/main_sslo/support/Notice.vue'),
        meta: { auth: false },
      },
      {
        path: 'qna',
        component: () =>
          import('../components/main_sslo/support/QnaCreate.vue'),
        meta: { auth: false },
      },
      {
        path: 'qnalist',
        component: () => import('../components/main_sslo/support/QnaList.vue'),
        meta: { auth: false },
      },
      {
        path: 'qnadetail',
        component: () =>
          import('../components/main_sslo/support/QnaDetail.vue'),
        meta: { auth: false },
      },
      {
        path: 'qnaupdate',
        component: () =>
          import('../components/main_sslo/support/QnaUpdate.vue'),
        meta: { auth: false },
      },
      {
        path: 'partnership',
        component: () =>
          import('../components/main_sslo/support/Partnership.vue'),
        meta: { auth: false },
      },
      {
        path: 'faq',
        component: () => import('../components/main_sslo/support/Faq.vue'),
        meta: { auth: false },
      },
      {
        path: 'faqdetail',
        component: () =>
          import('../components/main_sslo/support/FaqDetail.vue'),
        meta: { auth: false },
      },
    ],
  },

  //솔루션 - 마이페이지
  {
    path: '/mypage/member',
    name: '',
    component: () => import('../views/solution/mypage/MemberSettingPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/mypage/team',
    name: '',
    component: () => import('../views/solution/mypage/TeamSettingPage.vue'),
    meta: { auth: false },
  },

  //솔루션 - 대시보드
  {
    path: '/dashboard/list',
    name: '',
    component: () =>
      import('../views/solution/dashboard/DashboardListPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/dashboard/detail/collect',
    name: '',
    component: () =>
      import('../views/solution/dashboard/DashboardDetailCollectPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/dashboard/detail/collect/:id',
    name: '',
    component: () =>
      import('../views/solution/dashboard/DashboardDetailCollectPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/dashboard/detail/cleaning',
    name: '',
    component: () =>
      import('../views/solution/dashboard/DashboardDetailCleaningPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/dashboard/detail/labeling',
    name: '',
    component: () =>
      import('../views/solution/dashboard/DashboardDetailLabelingPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/solution/mywork/filelist',
    name: '',
    component: () => import('../views/solution/mywork/MyWorkFileListPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/solution/mywork/statistics',
    name: '',
    component: () =>
      import('../views/solution/mywork/MyWorkStatisticsPage.vue'),
    meta: { auth: false },
  },
  //솔루션 - 전체프로젝트
  {
    path: '/solution/all',
    name: '',
    component: () => import('../views/solution/project/AllProjectPage.vue'),
    meta: { auth: false },
    children: [
      {
        path: '/allProject/allprojectlist',
        name: 'allprojectlist',
        component: () =>
          import(
            '../components/solution/project/project_all/AllProjectList.vue'
          ),
        meta: { auth: false },
        props: true,
      },
      {
        path: '/allProject/allprojectcreate',
        name: 'allprojectcreate',
        component: () =>
          import(
            '../components/solution/project/project_all/AllProjectCreate.vue'
          ),
        meta: { auth: false },
        props: true,
      },
    ],
  },

  // 데이터셋(폴더)
  {
    path: '/allProject/project_cleaning/folderlist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningDatasetFolderListPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/folderlist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingDatasetFolderListPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_collect/folderlist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectDatasetFolderListPage.vue'
      ),
    meta: { auth: false },
  },
  // 데이터셋(파일)
  {
    path: '/allProject/project_cleaning/filelist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningDatasetFileListPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/filelist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingDatasetFileListPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_collect/filelist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectDatasetFileListPage.vue'
      ),
    meta: { auth: false },
  },
  // 데이터셋 관리(폴더)
  {
    path: '/allProject/project_collect/foldermanage',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectDatasetFolderManagePage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_cleaning/foldermanage',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningDatasetFolderManagePage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/foldermanage',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingDatasetFolderManagePage.vue'
      ),
    meta: { auth: false },
  }, // 데이터셋 관리(파일)
  {
    path: '/allProject/project_collect/filemanage',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectDatasetFileManagePage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_cleaning/filemanage',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningDatasetFileManagePage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/filemanage',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingDatasetFileManagePage.vue'
      ),
    meta: { auth: false },
  },
  // 멤버 작업현황
  {
    path: '/allProject/project_collect/memberwork',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectMemberStatusPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/memberwork',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingMemberStatusPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_cleaning/memberwork',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningMemberStatusPage.vue'
      ),
    meta: { auth: false },
  },
  // 가이드
  {
    path: '/allProject/project_cleaning/guidelist',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningGuideListPage.vue'
      ),
    meta: { auth: false },
  },

  {
    path: '/allProject/project_cleaning/guidecreate',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningGuideCreatePage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_cleaning/guideupdate',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningGuideUpdatePage.vue'
      ),
    meta: { auth: false },
  },
  // QnA
  {
    path: '/allProject/project_cleaning/qna',
    name: '',
    component: () =>
      import('../views/solution/project/project_cleaning/CleaningQnAPage.vue'),
    meta: { auth: false },
  },
  // 산출물 내보내기
  {
    path: '/allProject/project_cleaning/output',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningOutputPage.vue'
      ),
    meta: { auth: false },
  },
  // 설정
  {
    path: '/allProject/project_cleaning/setting/cleaning/:id',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningSettingProjectPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_cleaning/membersetting/cleaning',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningSettingMemberPage.vue'
      ),
    meta: { auth: false },
  },
  //통계
  {
    path: '/allProject/project_cleaning/statistics/project',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningStatisticsProjectPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_cleaning/statistics/member',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_cleaning/CleaningStatisticsMemberPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/statistics/project',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingStatisticsProjectPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_labeling/statistics/member',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_labeling/LabelingStatisticsMemberPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_collect/statistics/project',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectStatisticsProjectPage.vue'
      ),
    meta: { auth: false },
  },
  {
    path: '/allProject/project_collect/statistics/member',
    name: '',
    component: () =>
      import(
        '../views/solution/project/project_collect/CollectStatisticsMemberPage.vue'
      ),
    meta: { auth: false },
  },
  //솔루션 - 내작업
  {
    path: '/solution/mywork/folderlist',
    name: '',
    component: () =>
      import('../views/solution/mywork/MyWorkFolderListPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/solution/mywork/filelist',
    name: '',
    component: () => import('../views/solution/mywork/MyWorkFileListPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/solution/mywork/statistics',
    name: '',
    component: () =>
      import('../views/solution/mywork/MyWorkStatisticsPage.vue'),
    meta: { auth: false },
  },
  // 스튜디오
  {
    path: '/collectinspectionstudio',
    name: 'collectinspectionstudio',
    component: () =>
      import('../views/work_studio/StudioCollectInspectionPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/cleaningframestudio',
    name: 'cleaningframestudio',
    component: () => import('../views/work_studio/StudioCleaningFramePage.vue'),
    meta: { auth: false },
  },
  {
    path: '/cleaningremovestudio',
    name: 'cleaningremovestudio',
    component: () =>
      import('../views/work_studio/StudioCleaningRemovePage.vue'),
    meta: { auth: false },
  },
  {
    path: '/preprocessingstudio',
    name: 'preprocessingstudio',
    component: () => import('../views/work_studio/StudioPreprocessingPage.vue'),
    meta: { auth: false },
  },
  {
    path: '/labelingstudio',
    name: 'labelingstudio',
    component: () => import('../views/work_studio/StudioLabelingPage.vue'),
    meta: { auth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
