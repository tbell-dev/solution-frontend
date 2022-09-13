<template>
  <div id="project-wrap">
    <div class="left-wrap"><MainMenu /><SubMenu /></div>
    <div class="right-wrap">
      <Header />
      <main id="main">
        <section>
          <article class="align1 button-filter">
            <router-link
              to="/allProject/project_cleaning/setting/cleaning"
              class="btn-set btn2-2"
              >프로젝트 정보</router-link
            >
            <router-link
              to="/allProject/project_cleaning/membersetting/cleaning"
              class="btn-set btn1-2"
              >프로젝트 멤버</router-link
            >
          </article>
        </section>
        <section>
          <article class="common1">
            <h3>프로젝트 명</h3>
            <ul class="align1">
              <li>
                <input type="text" v-model="projectName" />
              </li>
            </ul>
            <h3>프로젝트 설명</h3>
            <ul class="align1">
              <li>
                <input type="text" v-model="projectDesc" />
              </li>
            </ul>
            <h3>프로젝트 유형</h3>
            <ul class="align1">
              <li>
                <input type="text" v-model="projectType.project_type_name" readonly />
              </li>
            </ul>
          </article>
        </section>
        <section>
          <article class="common1">
            <h3>프로젝트 상세 정보</h3>
            <ul class="align1" v-show="projectType.project_type_name === '수집'">
              <li v-if="projectDetail.data_type === 1">
                <div>데이터 유형: 자체제공 데이터셋</div>
                선택된 데이터셋 번호: {{ projectDetail.dataset_ids }}
              </li>
              <li v-if="projectDetail.data_type === 2">
                <div>데이터 유형: 크롤링 수집 데이터</div>
                <div>수집채널: {{ projectDetail.crawling_channel_type }}</div>
                <div class="img-wrap">
                  <img
                    v-if="projectDetail.crawling_channel_type === 'naver'"
                    src="../../../../assets/images/project/img/naver.svg"
                    alt=""
                  />
                  <img
                    v-if="projectDetail.crawling_channel_type === 'daum'"
                    src="../../../../assets/images/project/img/daum.svg"
                    alt=""
                  />
                  <img
                    v-if="projectDetail.crawling_channel_type === 'google'"
                    src="../../../../assets/images/project/img/google.svg"
                    alt=""
                  />
                </div>
                <div>수집 키워드: {{ projectDetail.crawling_keywords[0] }}</div>
                <div>
                  수집 기간: {{ crawling_period_start }} ~
                  {{ crawling_period_end }}
                </div>
                <div>수집 건수: {{ projectDetail.crawling_limit }}</div>
              </li>
            </ul>
            <ul style="font-size: 15px" class="align1" v-show="projectType.project_type_name === '가공'">
              <li>
                <h4>클래스 정보</h4>
                <div v-for="item in projectDetail.project_categories">
                  <div
                    style="
                      width: 15px;
                      height: 15px;
                      background-color: #479d48;
                      display: inline-block;
                    "
                  ></div>
                  {{ item.annotation_category_name }}
                  <div
                    style="margin-left: 10px"
                    v-for="attr in item.annotation_category_attributes"
                  >
                    {{ attr.annotation_category_attr_name }}
                  </div>
                </div>
              </li>
            </ul>
          </article>
        </section>
        <div class="button-align1">
          <button class="btn-set btn2-1" @click="updateProject">수정</button>
          <button class="btn-set btn1-1" style="color: rgba(255,0,0,0.94)" @click="deleteProject">삭제</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// 메뉴
import MainMenu from '../../../../components/solution/common/MenuMain.vue';
import SubMenu from '../../../../components/solution/common/MenuSub1.vue';
// 헤더
import Header from '../../../../components/solution/common/Header.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  components: {
    MainMenu,
    SubMenu,
    Header,
  },
  data: function () {},
  methods: {},
  computed: {},
  setup() {
    const router = useRoute();
    const projectName = ref('');
    const projectDesc = ref('');
    let projectManager = {};
    const projectType = ref('');
    const projectDetail = ref('');
    const crawling_period_start = ref();
    const crawling_period_end = ref();
    const created = ref();
    const updated = ref();
    const get_crawling_period = () => {
      crawling_period_start.value = new Date(
        parseInt(projectDetail.value.crawling_period_start),
      ).toLocaleDateString();
      crawling_period_end.value = new Date(
        parseInt(projectDetail.value.crawling_period_end),
      ).toLocaleDateString();
    };
    const deleteProject = async () => {
      confirm(
        '선택한 프로젝트의 모든 데이터와 작업내역이 삭제됩니다. 정말 삭제하시겠습니까?',
      );
      await axios.delete(
        `http://210.113.122.196:8825/rest/api/1/project/delete?project_id=${router.params.id}`,
      );
    };
    const updateProject = async () => {
      confirm('프로젝트를 수정하시겠습니까?');
      await axios.post(
        'http://210.113.122.196:8825/rest/api/1/project/update',
        {
          project_id: router.params.id,
          project_name: projectName.value,
          project_desc: projectDesc.value,
          project_manager: projectManager,
          project_type: projectType.value,
          project_detail: projectDetail.value,
          created: created.value,
          updated: updated.value,
        },
      );
    };
    onMounted(async () => {
      const res = await axios.get(
        `http://210.113.122.196:8825/rest/api/1/project?project_id=${router.params.id}`,
      );
      projectName.value = res.data.project_name;
      projectDesc.value = res.data.project_desc;
      projectType.value = res.data.project_type;
      projectDetail.value = res.data.project_detail;
      projectManager = res.data.project_manager;
      created.value = res.data.created;
      updated.value = res.data.updated;
      console.log(res.data);
      get_crawling_period();
    });
    return {
      projectName,
      projectDesc,
      projectType,
      projectDetail,
      get_crawling_period,
      crawling_period_start,
      crawling_period_end,
      deleteProject,
      updateProject,
      projectManager,
      created,
      updated,
    };
  },
};
</script>

<style>
@import '../../../../css/reset.css';
@import '../../../../css/common.css';
</style>
